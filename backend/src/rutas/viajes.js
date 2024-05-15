const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/todos', todos_los_viajes);

async function todos_los_viajes (req,res,next){
  try {
      const items= await controlador.todos_los_viajes('Viajes');
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

module.exports=router;
