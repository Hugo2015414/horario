var ViewModel = function () {
	var main = this;
	var asignacionUri = 'http://localhost:4000/api/asignacion/';
  var grupoUri = 'http://localhost:4000/api/grupo/';
  var cursoUri = 'http://localhost:4000/api/curso/';
	main.asignaciones = ko.observableArray();
  main.grupos = ko.observableArray();
  main.cursos = ko.observableArray();
	main.error = ko.observable();
	main.asignacionCargada = ko.observable();
	main.asignacionNueva = {
    grupo: ko.observable(),
    curso: ko.observable()
	}

	main.cargar = function (item) {
		console.log(JSON.stringify(item));
		main.asignacionCargada(item);
	}

	main.editar = function (formElement) {
		var asignacionEditada = {
			idAsignacion: main.asignacionCargada().idDetalleCurso,
			idGrupo: main.asignacionCargada().grupo.idGrupo,
      idCurso: main.asignacionCargada().curso.idCurso
		}
		console.log(asignacionEditada);
		var uri = asignacionUri + asignacionEditada.idAsignacion;
		ajaxHelper(uri, 'PUT', asignacionEditada)
			.done(function (data) {
				getAllAsignaciones();
				$("#modalEditar").modal('hide');
			})
	}

	main.eliminar = function (item) {
		var id = item.idDetalleCurso;
		var uri = asignacionUri + id;
		ajaxHelper(uri, 'DELETE').done(function () {
			getAllAsignaciones();
		});
	}

	main.agregar = function (formElement) {
		var asignacion = {
      idGrupo: main.asignacionNueva.grupo().idGrupo,
      idCurso: main.asignacionNueva.curso().idCurso
		}
		console.log(asignacion)
		ajaxHelper(asignacionUri, 'POST', asignacion)
			.done(function (data) {
				getAllAsignaciones();
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

  function getAllAsignaciones() {
		ajaxHelper(asignacionUri, 'GET').done(function (data) {
			main.asignaciones(data);
		});
	}

	function getAllGrupos() {
		ajaxHelper(grupoUri, 'GET').done(function (data) {
				main.grupos(data);
			});
	}

  function getAllCursos() {
		ajaxHelper(cursoUri, 'GET').done(function (data) {
				main.cursos(data);
			});
	}

  getAllGrupos();
	getAllCursos();
  getAllAsignaciones();
}

$(document).ready(function () {
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	$(".btn-guardar").click(function () {
		console.log("hola");
		var form = $("#form-asignacion");
		viewModel.agregar(form);
	});
});
