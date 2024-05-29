const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get("/", todos_reservas);
router.post("/", agregar_reserva);

async function todos_reservas (req,res,next){
  try {
      const items= await controlador.todos_reservas('reservas'); 
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}
async function agregar_reserva (req,res,next){
  try {
      const items= await controlador.agregar_reserva('reservas',req.body); 
      respuestas.success(req, res, 'Agregado satisfactoriamente', 200)
  } catch (err) {
     next(err);
  }
}

module.exports=router;