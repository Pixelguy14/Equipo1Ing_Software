const express =  require('express');
const config = require('./config')

const usuarios = require('./modulos/usuarios/rutas')
const vehiculos = require('./modulos/vehiculos/vehi_rutas')

const app = express()
const cors = require('cors')
///app.use(cors())
//configurartion
app.set('port', config.app.port);

// rutas
app.use('/api/usuarios', usuarios);
app.use('/api/vehiculos', vehiculos);

module.exports = app;