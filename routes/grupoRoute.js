var express = require('express');
var grupo = require('../model/grupo');
var router = express.Router();

router.get('/api/grupo/', function(req, res) {
  grupo.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay grupos"});
    }
  });
});

router.get('/api/grupo/:idGrupo',
  function(req, res) {
    var idGrupo = req.params.idGrupo;
    grupo.select(idGrupo,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay grupos"});
      }
  });
});

router.post('/api/grupo', function(req, res) {
  var data = {
    idGrupo : null,
    nombre: req.body.nombre,
    idSeccion: req.body.idSeccion
  }
  grupo.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/grupo');
    } else {
      res.json({"Mensaje": "No se ingreso el grupo"});
    }
  });
});

router.put('/api/grupo/:idGrupo', function(req, res) {
  var idGrupo = req.params.idGrupo;
  console.log(idGrupo);
  var data = {
    idGrupo : req.body.idGrupo,
    nombre: req.body.nombre,
    idSeccion: req.body.idSeccion
  }
  console.log(data.idGrupo);

  //if(data.idCategoria === idCategoria) {
    grupo.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico el grupo"});
      }
    });
  /*} else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }*/
});

router.delete('/api/grupo/:idGrupo',
  function(req, res) {
    var idGrupo = req.params.idGrupo;

    grupo.delete(idGrupo, function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect('');
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
