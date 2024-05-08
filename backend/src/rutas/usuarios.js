const express = require('express');

const respuestas= require('../red/respuestas')
const controlador = require('../controlador/controlador');

const router= express.Router()

router.get('/',todos_usuario);
router.get('/:id', un_usuario);
router.post('/',agregar_usuario);
router.put('/:id',actualizar_usuario);
router.delete('/:id',eliminar_usuario);
router.post('/iniciar/',iniciar_sesion);

async function todos_usuario (req,res,next){
    try {
        const items= await controlador.todos_usuario('usuarios'); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);
    }
}
async function un_usuario (req,res,next){
    try {
        const items= await controlador.un_usuario('usuarios',req.params.Usu_NUA); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);
    }   
}
async function agregar_usuario (req,res,next){
    try {
        const items= await controlador.agregar_usuario('usuarios',req.body); 
        respuestas.success(req, res, items+' Agregado satisfactoriamente', 200)
    } catch (err) {
       next(err);
    }
}
async function actualizar_usuario (req,res,next){
    try {
        const items= await controlador.actualizar_usuario('usuarios',req.body,req.params.id); 
        respuestas.success(req, res, items+' Actualizado con exito', 200)
    } catch (err) {
       next(err);
    }
}
async function eliminar_usuario (req,res,next){
    try {
        const items= await controlador.eliminar_usuario('usuarios',req.params.id); 
        respuestas.success(req, res, items+' Eliminado satisfactoriamente', 200)
    } catch (err) {
        next(err);
    }
}
//iniciar_sesion
async function iniciar_sesion(req,res,next){
    try {
        const items= await controlador.iniciar_sesion('usuarios',req.body); 
        respuestas.success(req, res, items, 200)
    } catch (err) {
        next(err);
    }
}
module.exports=router;
