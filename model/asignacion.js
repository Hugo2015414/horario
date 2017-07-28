var database = require('./database');
var asignacion = {};

asignacion.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM curso_grupo",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

asignacion.select = function(idDetalleCurso, callback) {
  if(database) {
    var sql = "SELECT * FROM DetalleCurso WHERE idDetalleCurso = ?";
    database.query(sql, idDetalleCurso,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

asignacion.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO DetalleCurso SET ? ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

asignacion.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE DetalleCurso SET "
    +"idGrupo = ?, idCurso = ? WHERE idDetalleCurso = ?";
    database.query(sql,
    [data.idGrupo, data.idCurso, data.idDetalleCurso],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

asignacion.delete = function(idDetalleCurso, callback) {
  if(database) {
    var sql = "DELETE FROM DetalleCurso WHERE idDetalleCurso = ?";
    database.query(sql, idDetalleCurso,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = asignacion;
