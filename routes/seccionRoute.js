var express = require('express');
var seccion = require('../model/seccion');
var router = express.Router();

router.get('/api/seccion/', function(req, res) {
  seccion.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay secciones"});
    }
  });
});


module.exports = router;
