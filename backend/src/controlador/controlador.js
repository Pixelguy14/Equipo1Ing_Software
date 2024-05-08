const db= require('../db/mysql')

function todos(tabla){
    console.log('@@@ tabla =>', tabla)
    return db.todos(tabla)
}

function uno(tabla, Usu_NUA){
    return db.uno(tabla, Usu_NUA)
}

function agregar(tabla,body){
    return db.agregar(tabla, body);
}

function actualizar(tabla,body){
    return db.actualizar(tabla, body);
}

function eliminar(tabla,body){
    return db.eliminar(tabla, body);
}

function un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA){
    console.log('@@@ datos =>', tabla, Cal_Califica_Usu_NUA)
    return db.un_Usuario_Calificacion(tabla, Cal_Califica_Usu_NUA)
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregar,
    actualizar,
    un_Usuario_Calificacion
}