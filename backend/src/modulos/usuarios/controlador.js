const db= require('../../db/mysql')

const TABLA= 'usuarios'

function todos_usuarios(){
    return db.todos_usuarios(TABLA)
}

module.exports = {
 todos_usuarios
}