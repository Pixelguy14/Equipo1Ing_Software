const db= require('../db/mysql')

//Usuarios
function todos_usuario(tabla){
    return db.todos_usuario(tabla)
}
function un_usuario(tabla,id){
    return db.un_usuario(tabla, id)
}

function agregar_usuario(tabla,body){
    return db.agregar_usuario(tabla, body);
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
function iniciar_sesion(tabla,body){
    return db.iniciar_sesion(tabla,body)
}

function un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA){
    console.log('@@@ datos =>', tabla, Cal_Califica_Usu_NUA)
    return db.un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA)
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
    iniciar_sesion,
    un_Usuario_Calificacion
}
