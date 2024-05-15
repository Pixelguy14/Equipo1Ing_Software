const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/', todas_Calificaciones);
router.get('/:Cal_Califica_Usu_NUA', un_Usuario_Calificacion);
router.post('/',agregar);

async function todas_Calificaciones (req,res,next){
  try {
      const items= await controlador.todos_usuario('calificaciones'); 
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

async function un_Usuario_Calificacion (req,res,next){
  try {
      const items= await controlador.un_Usuario_Calificacion('calificaciones',req.params.Cal_Califica_Usu_NUA); 
      respuestas.success(req, res, items, 200)
  } catch (err) {
      next(err);
  }
}

async function agregar (req,res,next){
  try {
      const items= await controlador.agregar('calificaciones',req.body); 
      respuestas.success(req, res, 'Agregado satisfactoriamente', 200)
  } catch (err) {
      next(err);
  }
}

module.exports=router;