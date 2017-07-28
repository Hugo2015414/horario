var database = require('./database');
var curso = {};

curso.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Curso",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

curso.select = function(idCurso, callback) {
  if(database) {
    var sql = "SELECT * FROM Curso WHERE idCurso = ?";
    database.query(sql, idCurso,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

curso.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Curso SET ? ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

curso.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Curso SET "
    +"nombreCurso = ? WHERE idCurso = ?";
    database.query(sql,
    [data.nombreCurso, data.idCurso],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

curso.delete = function(idCurso, callback) {
  if(database) {
    var sql = "CALL sp_deleteCurso(?)";
    database.query(sql, idCurso,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = curso;
