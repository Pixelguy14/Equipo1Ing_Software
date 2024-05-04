//const db = require('../config/database.js');
import db from "../config/database.js"

export const getVehiculos= (result) => {
    db.query('SELECT * FROM vehiculos',(err,results)=>{
        if(err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//Obtener un vehiculo por ID
export const getVehiculosID = (id, result) => {
    db.query(//LAS MAYUSCULAS IMPORTAN; CHEQUEN BIEN COMO DEBE DE IR LA SENTENCIA EN MYSQL PARA EVITAR ERRORES
      "SELECT * FROM vehiculos WHERE Car_id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results[0]);
        }
      }
    );
  };
  
  //insertar un producto a BD
  export const insertVehiculo = (data, result) => {
    db.query("INSERT INTO vehiculos SET ?", [data], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
  
  //actualizar producto a BD
  export const updateVehiculo_conId = (data, id, result) => {
    db.query(
      "UPDATE vehiculos SET Car_Usu_NUA = ?, Car_Modelo = ?, Car_anio = ?, Car_Placas = ?, Car_Capacidad = ?, Car_Color = ? WHERE Car_id = ?",
      [data.Car_Usu_NUA, data.Car_Modelo, data.Car_anio, data.Car_Placas, data.Car_Capacidad,data.Car_Color, id],
      (err, results) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  };
  
  //borrar un producto de BD
  export const deleteVehiculoID = (id, result) => {
    db.query("DELETE FROM vehiculos WHERE Car_id = ?", [id], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
