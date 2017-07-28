var ViewModel = function () {
	var main = this;
	var cursoUri = 'http://localhost:4000/api/curso/';
	main.cursos = ko.observableArray();
	main.error = ko.observable();
	main.cursoCargado = ko.observable();
	main.cursoNuevo = {
    nombre: ko.observable()
	}

	main.cargar = function (item) {
		console.log(JSON.stringify(item));
		main.cursoCargado(item);
	}

	main.editar = function (formElement) {
		var cursoEditado = {
			idCurso: main.cursoCargado().idCurso,
			nombre: main.cursoCargado().nombreCurso,
		}
		console.log(cursoEditado);
		var uri = cursoUri + cursoEditado.idCurso;
		ajaxHelper(uri, 'PUT', cursoEditado)
			.done(function (data) {
				getAllCursos();
				$("#modalEditar").modal('hide');
			})
	}

	main.eliminar = function (item) {
		var id = item.idCurso;
		var uri = cursoUri + id;
		ajaxHelper(uri, 'DELETE').done(function () {
			getAllCursos();
		});
	}

	main.agregar = function (formElement) {
		var curso = {
      nombre: main.cursoNuevo.nombre(),
		}
		console.log(curso)
		ajaxHelper(cursoUri, 'POST', curso)
			.done(function (data) {
				getAllCursos();
				$("#modalAgregar").modal('hide');
			});
	}

	function ajaxHelper(uri, method, data) {
		main.error('');
		return $.ajax({
			url: uri,
			type: method,
			dataType: 'json',
			contentType: 'application/json',
			data: data ? JSON.stringify(data) : null
		}).fail(function (jqXHR, textStatus, errorThrown) {
			main.error(errorThrown);
		});
	}

  function getAllCursos() {
		ajaxHelper(cursoUri, 'GET').done(function (data) {
			main.cursos(data);
		});
	}

	function getAllCursos() {
		ajaxHelper(cursoUri, 'GET').done(function (data) {
				main.cursos(data);
			});
	}

  getAllCursos();
}

$(document).ready(function () {
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	$(".btn-guardar").click(function () {
		console.log("hola");
		var form = $("#form-curso");
		viewModel.agregar(form);
	});
});
