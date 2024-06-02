const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/todos', todos_los_viajes);
router.get('/:via_con_usu_NUA', viajes_conductor);
router.delete('/:via_Id', eliminar_viaje);

async function todos_los_viajes (req,res,next){
  try {
      const items= await controlador.todos_los_viajes('Viajes');
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

async function viajes_conductor (req,res,next){
  try {
      const items= await controlador.viajes_conductor(req.params.via_con_usu_NUA);
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

async function eliminar_viaje (req,res,next){
  try {
      const items= await controlador.eliminar_viaje(req.params.via_Id);
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

module.exports=router;
