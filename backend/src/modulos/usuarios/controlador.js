const db= require('../../db/mysql')

const TABLA= 'usuarios'

function todos_usuarios(){
    return db.todos_tabla(TABLA)
}

module.exports = {
 todos_usuarios
}