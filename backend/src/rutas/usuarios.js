const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/',todos_usuarios);
router.get('/:id', uno);
router.delete('/',eliminar);
router.post('/',agregar);
router.put('/',actualizar);

async function todos_usuarios (req,res,next){
    try {
        const items= await controlador.todos('usuarios'); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);

    }
}

async function uno (req,res,next){

    try {
        const items= await controlador.uno('usuarios',req.params.Usu_NUA); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);

    }
    
}

async function agregar (req,res,next){

    try {
        const items= await controlador.agregar('usuarios',req.body); 
        respuestas.success(req, res, 'Agregado satisfactoriamente', 200)
    } catch (err) {
       next(err);
    }
    
}
async function actualizar (req,res,next){

    try {
        const items= await controlador.actualizar('usuarios',req.body); 
        respuestas.success(req, res, 'Actualizado con exito', 200)
    } catch (err) {
       next(err);
    }
    
}

async function eliminar (req,res,next){

    try {
        const items= await controlador.eliminar('usuarios',req.body); 
        respuestas.success(req, res, 'eliminado satisfactoriamente', 200)
    } catch (err) {
        respuestas.success(req, res, err, 500)

    }
    
}

module.exports=router;
