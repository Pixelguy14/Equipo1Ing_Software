const express =  require('express');
const morgan = require('morgan')
const config= require('./config')

const usuarios = require('./rutas/usuarios')
const calificaciones = require ('./rutas/calificaciones')

const app = express() 

//configurartion
app.set('port', config.app.port);

//midleware 
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded ({extended: true}))

// rutas
app.use('/api/usuarios', usuarios)
app.use('/api/calificaciones', calificaciones)

module.exports= app;