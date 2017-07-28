var ViewModel = function () {
	var main = this;
	var grupoUri = 'http://localhost:4000/api/grupo/';
  var seccionUri = 'http://localhost:4000/api/seccion/';
	main.grupos = ko.observableArray();
  main.secciones = ko.observableArray();
	main.error = ko.observable();
	main.grupoCargado = ko.observable();
	main.grupoNuevo = {
    nombre: ko.observable()
	}
	main.seccionDeGrupo = {
		seccion: ko.observable()
	}

	main.cargar = function (item) {
		console.log(JSON.stringify(item));
		main.grupoCargado(item);
	}

	main.editar = function (formElement) {
		var grupoEditado = {
			idGrupo: main.grupoCargado().idGrupo,
			nombre: main.grupoCargado().nombre,
      idSeccion: main.grupoCargado().seccion.idSeccion
		}
		console.log(grupoEditado);
		var uri = grupoUri + grupoEditado.idGrupo;
		ajaxHelper(uri, 'PUT', grupoEditado)
			.done(function (data) {
				getAllGrupos();
				$("#modalEditar").modal('hide');
			})
	}

	main.eliminar = function (item) {
		var id = item.idGrupo;
		var uri = grupoUri + id;
		ajaxHelper(uri, 'DELETE').done(function () {
			getAllGrupos();
		});
	}

	main.agregar = function (formElement) {
		var grupo = {
      nombre: main.grupoNuevo.nombre(),
      idSeccion: main.seccionDeGrupo.seccion().idSeccion
		}
		console.log(grupo)
		ajaxHelper(grupoUri, 'POST', grupo)
			.done(function (data) {
				getAllGrupos();
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

  function getAllGrupos() {
		ajaxHelper(grupoUri, 'GET').done(function (data) {
			main.grupos(data);
		});
	}

	function getAllSecciones() {
		ajaxHelper(seccionUri, 'GET').done(function (data) {
				main.secciones(data);
			});
	}

  getAllGrupos();
	getAllSecciones();
}

$(document).ready(function () {
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	$(".btn-guardar").click(function () {
		console.log("hola");
		var form = $("#form-grupo");
		viewModel.agregar(form);
	});
});
