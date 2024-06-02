const mysql = require('mysql');
const config = require('../config');

const [host, port] = config.mysql.host.split(':');

const dbconfig = {
    host: host,
    port: port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.error('[db error]', err);
            setTimeout(conMysql, 2000); // Reintentar la conexión después de 2 segundos
        } else {
            console.log('Conexión a la base de datos exitosa');
        }
    });

    conexion.on('error', (err) => {
        console.error('Error en la base de datos', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}
conMysql();

//Usuarios
function todos_usuario(tabla) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}
function un_usuario(tabla, Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Usu_NUA = ${Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function agregar_usuario(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
    
}
function actualizar_usuario(tabla, data, Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE Usu_NUA = ?`,[data, Usu_NUA] , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function eliminar_usuario(tabla, Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE Usu_NUA = ${Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })}

//Vehiculos
function todos_vehiculo(tabla) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}
function un_vehiculo(tabla, Car_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Car_Usu_NUA = ${Car_Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function agregar_vehiculo(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
    
}
function actualizar_vehiculo(tabla, data, Car_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET Car_Modelo = ?, Car_anio = ?, Car_Placas = ?, Car_Capacidad = ?, Car_Color = ? WHERE Car_Usu_NUA = ?`,
        [data.Car_Modelo, data.Car_anio, data.Car_Placas, data.Car_Capacidad,data.Car_Color, Car_Usu_NUA] , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}
function eliminar_vehiculo(tabla, Car_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE Car_Usu_NUA = ${Car_Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })}

//inicio de sesion
/*function iniciar_sesion(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE Usu_Correo = ? AND Usu_Password = ?`, [data.Usu_Correo, data.Usu_Password], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}*/

// Calificacion
function un_Usuario_Calificacion (tabla, Cal_Califica_Usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Cal_Califica_Usu_NUA=${Cal_Califica_Usu_NUA}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })}


// ====================== Viajes ======================
function todos_los_viajes(tabla) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}
function registrar_viaje(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    })
}

function viajes_conductor(via_con_usu_NUA) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM viajes WHERE via_con_usu_NUA = ${via_con_usu_NUA}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function eliminar_viaje(via_Id) {
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM viajes WHERE via_Id = ${via_Id}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

// Historial
function historialConductor (Cal_Califica_Usu_NUA) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT viajes.via_fecha_hora, calificaciones.Cal_Califica_Usu_NUA, viajes.via_origen, viajes.via_destino, viajes.via_costo, calificaciones.Cal_Calificacion, viajes.via_activo
        FROM viajes
        INNER JOIN calificaciones ON viajes.via_Id = calificaciones.Cal_Via_Id
        WHERE viajes.via_con_usu_NUA = ${Cal_Califica_Usu_NUA}`;

        conexion.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function historialPasajero (Cal_Califica_Usu_NUA) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT viajes.via_fecha_hora, calificaciones.Cal_Calificado_Usu_NUA, viajes.via_origen, viajes.via_destino, viajes.via_costo, calificaciones.Cal_Calificacion
        FROM viajes
        INNER JOIN calificaciones ON viajes.via_Id = calificaciones.Cal_Via_Id
        WHERE calificaciones.Cal_Califica_Usu_NUA = ${Cal_Califica_Usu_NUA}`;

        conexion.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function actualizarViajeStatus (via_Id) {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE viajes
        SET via_activo = 0
        WHERE via_Id = ${via_Id}`;
        conexion.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    todos_usuario,
    un_usuario,
    agregar_usuario,
    actualizar_usuario,
    eliminar_usuario,
    todos_vehiculo,
    un_vehiculo,
    agregar_vehiculo,
    actualizar_vehiculo,
    eliminar_vehiculo,
    /*iniciar_sesion,*/
    un_Usuario_Calificacion,
    todos_los_viajes,
    registrar_viaje,
    viajes_conductor,
    eliminar_viaje,
    //Historial
    historialConductor,
    historialPasajero,
    actualizarViajeStatus
}