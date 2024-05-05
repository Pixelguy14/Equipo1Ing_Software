const db= require('../db/mysql')


function todos(tabla){
    return db.todos(tabla)
}
function uno(id){
    return db.uno(tabla, id)
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

module.exports = {
    todos,
    uno,
    eliminar,
    agregar,
    actualizar
}