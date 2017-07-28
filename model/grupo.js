var database = require('./database');
var grupo = {};

grupo.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM seccion_grupo",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

grupo.select = function(idGrupo, callback) {
  if(database) {
    var sql = "SELECT * FROM Grupo WHERE idGrupo = ?";
    database.query(sql, idGrupo,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

grupo.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Grupo SET ? ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

grupo.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Grupo SET "
    +"nombre = ?, idSeccion = ? WHERE idGrupo = ?";
    database.query(sql,
    [data.nombre, data.idSeccion, data.idGrupo],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

grupo.delete = function(idGrupo, callback) {
  if(database) {
    var sql = "CALL sp_deleteGrupo(?)";
    database.query(sql, idGrupo,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = grupo;
