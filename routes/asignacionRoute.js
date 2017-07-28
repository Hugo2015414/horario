var express = require('express');
var asignacion = require('../model/asignacion');
var router = express.Router();

router.get('/api/asignacion/', function(req, res) {
  asignacion.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay asignaciones"});
    }
  });
});

router.get('/api/asignacion/:idAsignacion',
  function(req, res) {
    var idAsignacion = req.params.idAsignacion;
    asignacion.select(idAsignacion,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay asignaciones"});
      }
  });
});

router.post('/api/asignacion', function(req, res) {
  var data = {
    idDetalleCurso : null,
    idGrupo: req.body.idGrupo,
    idCurso: req.body.idCurso
  }
  asignacion.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/asignacion');
    } else {
      res.json({"Mensaje": "No se ingreso la asignacion"});
    }
  });
});

router.put('/api/asignacion/:idAsignacion', function(req, res) {
  var idAsignacion = req.params.idAsignacion;
  console.log(idAsignacion);
  var data = {
    idDetalleCurso : req.body.idAsignacion,
    idGrupo: req.body.idGrupo,
    idCurso: req.body.idCurso
  }
    asignacion.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la asignacion"});
      }
    });
});

router.delete('/api/asignacion/:idAsignacion',
  function(req, res) {
    var idAsignacion = req.params.idAsignacion;
    console.log(idAsignacion);
    asignacion.delete(idAsignacion,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect('');
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});

module.exports = router;
