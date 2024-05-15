const db= require('../db/mysql')
const bcryptUtil = require('../utilidades/bcryptUtil');
const jwtUtil = require('../utilidades/jwtUtil');

//Usuarios
function todos_usuario(tabla){
    return db.todos_usuario(tabla)
}
function un_usuario(tabla, id){
    return db.un_usuario(tabla, id)
}

async function agregar_usuario(tabla,body){
    //console.log('@@@ body controlador ', body)
    try {
        // Encriptar la contraseña
        const contrasenaEncriptada = await bcryptUtil.encriptarContrasena(body.Usu_Password);
        
        // Reemplazar la contraseña en texto plano por la contraseña encriptada
        const data = {
            ...body,
            Usu_Password: contrasenaEncriptada
        };

        // Agregar el usuario con la contraseña encriptada
        const resultado = await db.agregar_usuario(tabla, data);
        
        return resultado;
    } catch (error) {
        throw error;
    }
}

function actualizar_usuario(tabla,body,id){
    return db.actualizar_usuario(tabla, body, id);
}

function eliminar_usuario(tabla,id){
    return db.eliminar_usuario(tabla, id);
}

//Vehiculos
function todos_vehiculo(tabla){
    return db.todos_vehiculo(tabla)
}
function un_vehiculo(tabla,id){
    return db.un_vehiculo(tabla, id)
}

function agregar_vehiculo(tabla,body){
    return db.agregar_vehiculo(tabla, body);
}

function actualizar_vehiculo(tabla,body,id){
    return db.actualizar_vehiculo(tabla, body, id);
}

function eliminar_vehiculo(tabla,id){
    return db.eliminar_vehiculo(tabla, id);
}
//Inicio de sesion
// Iniciar sesión

//Calificacion
function un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA){
    console.log('@@@ datos =>', tabla, Cal_Califica_Usu_NUA)
    return db.un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA)
}

//Historial
function historial (Cal_Califica_Usu_NUA) {
    console.log('@@@ datos =>', Cal_Califica_Usu_NUA)
    return db.historial (Cal_Califica_Usu_NUA);
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
    un_Usuario_Calificacion,
    iniciar_sesion,
    un_Usuario_Calificacion,
    historial,
}
