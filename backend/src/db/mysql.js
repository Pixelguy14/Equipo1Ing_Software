const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host.split(':')[0], // Dividir el host para quitar el puerto
    port: config.mysql.host.split(':')[1], // Agregar el puerto
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log('[db error]', err)
        } else {
            console.log('Conexión a la base de datos exitosa');
        }
    });

    conexion.on('error', err => {
        console.log('Error en la base de datos', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}

conMysql();

function todos_tabla(tabla) {//logica general!
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function un_tabla(tabla, id) {
    // Lógica para obtener un registro de la tabla por ID
}

function agregar_a_tabla(tabla, data) {
    // Lógica para agregar un nuevo registro a la tabla
}

function eliminar_de_tabla(tabla, id) {
    // Lógica para eliminar un registro de la tabla por ID
}

module.exports = {
    todos_tabla,
    un_tabla,
    agregar_a_tabla,
    eliminar_de_tabla,
}

