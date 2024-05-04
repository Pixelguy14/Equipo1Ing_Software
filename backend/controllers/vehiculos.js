import { 
    getVehiculos, 
    getVehiculosID, 
    insertVehiculo, 
    updateVehiculo_conId,
    deleteVehiculoID
} from "../models/mod_vehiculos.js";

//mostrar todos los vehiculos
export const mostrarVehiculos = (req, res) => {
    getVehiculos((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  //mostrar un vehiculo con esa id
  export const mostrarVehiculoporID = (req, res) => {
    getVehiculosID(req.params.id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  //crear nuevo vehiculo
  export const crearVehiculo = (req, res) => {
    const data = req.body;
    insertVehiculo(data, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  //actualizar un vehiculo
  export const actualizarVehiculo = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateVehiculo_conId(data, id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  
  //borrar un vehiculo
  export const borrarVehiculo = (req, res) => {
    const id = req.params.id;
    deleteVehiculoID(id, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };