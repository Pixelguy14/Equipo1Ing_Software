const express = require('express');

const respuestas= require('../../red/respuestas')
const controlador = require('./vehi_controlador')
const router= express.Router()

router.get('/',function(req,res){
    const todos_vehiculos= controlador.todos_vehiculos()
    .then((items) => {
        respuestas.success(req, res, items, 200)
    })
})

module.exports=router;