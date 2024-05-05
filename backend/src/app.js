const express =  require('express');
const morgan = require('morgan')
const config= require('./config')

const usuarios = require('./rutas/usuarios')

const app = express() 

//configurartion
app.set('port', config.app.port);

//midleware 
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded ({extended: true}))


// rutas
app.use('/api/usuarios', usuarios)

module.exports= app;