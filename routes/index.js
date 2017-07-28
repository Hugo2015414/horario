var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/grupo', function(req, res, next){
  res.render('vistaGrupo');
});

router.get('/curso', function(req, res, next){
  res.render('vistaCurso');
});

router.get('/asignacion', function(req, res, next){
  res.render('vistaAsignacion');
});

router.get('/cerrar', function(req, res) {
  res.redirect('/');
});

module.exports = router;
