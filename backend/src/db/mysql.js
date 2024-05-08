const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host.split(':')[0], // Dividir el host para quitar el puerto
    port: config.mysql.host.split(':')[1], // Agregar el puerto
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
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

function todos(tabla) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function uno(tabla, Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Usu_NUA=${Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })}

function actualizar(tabla, data) {
        return new Promise((resolve, reject) =>{
            conexion.query(`UPDATE ${tabla} SET ? WHERE Usu_NUA = ?`,[data ,data.Usu_NUA] , (error,result)=>{
                return error ? reject(error) : resolve(result);
            })
        })
    }

function agregar(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
    }

function eliminar(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE Usu_NUA = ?`, data.Usu_NUA , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })}

function un_Usuario_Calificacion (tabla, Cal_Califica_Usu_NUA) {
        return new Promise((resolve, reject) =>{
            conexion.query(`SELECT * FROM ${tabla} WHERE Cal_Califica_Usu_NUA=${Cal_Califica_Usu_NUA}`, (error,result)=>{
                return error ? reject(error) : resolve(result);
            })
        })}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    actualizar,
    un_Usuario_Calificacion
}

