const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/:Cal_Califica_Usu_NUA', historial);

async function historial (req, res, next) {
  try {
    const items = await controlador.historial(req.params.Cal_Califica_Usu_NUA); 
    respuestas.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

module.exports=router;