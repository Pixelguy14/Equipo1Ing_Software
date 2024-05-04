import express from "express";

//importamos todas las funciones de los controladores
import {
    //funciones de vehiculo
    mostrarVehiculos,
    mostrarVehiculoporID,
    crearVehiculo,
    actualizarVehiculo,
    borrarVehiculo,
} from "../controllers/vehiculos.js";

//init express router
const router = express.Router();

//rutas de vehiculos
router.get("/vehiculos", mostrarVehiculos);

router.get("/vehiculos/:id", mostrarVehiculoporID);

router.post("/vehiculos", crearVehiculo);

router.put("/vehiculos/:id", actualizarVehiculo);

router.delete("/vehiculos/:id", borrarVehiculo);

//export default router
export default router;