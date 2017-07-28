var express = require('express');
var curso = require('../model/curso');
var router = express.Router();

router.get('/api/curso/', function(req, res) {
  curso.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay cursos"});
    }
  });
});

router.get('/api/curso/:idCurso',
  function(req, res) {
    var idCurso = req.params.idCurso;
    curso.select(idCurso,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay cursos"});
      }
  });
});

router.post('/api/curso', function(req, res) {
  var data = {
    idCurso : null,
    nombreCurso: req.body.nombre
  }
  curso.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/curso');
    } else {
      res.json({"Mensaje": "No se ingreso el curso"});
    }
  });
});

router.put('/api/curso/:idCurso', function(req, res) {
  var idCurso = req.params.idCurso;
  console.log(idCurso);
  var data = {
    idCurso : req.body.idCurso,
    nombreCurso: req.body.nombre
  }
  console.log(data.idCurso);
    curso.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico el curso"});
      }
    });
});

router.delete('/api/curso/:idCurso',
  function(req, res) {
    var idCurso = req.params.idCurso;
    console.log(idCurso);
    curso.delete(idCurso,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect('');
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
