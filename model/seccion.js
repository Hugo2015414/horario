var database = require('./database');
var seccion = {};

seccion.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Seccion",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

module.exports = seccion;
