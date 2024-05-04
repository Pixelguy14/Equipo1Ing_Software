import mysql from "mysql"
//const mysql = require('mysql');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"raites"
});

export default db;

/*si no funciona tu phpmyadmin, usar en la consola de phpmyadmin:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
cambiando 'password' por su contraseña y luego ajustar en 
const db = mysql....
despues usar en la consola de phpmyadmin:
flush privileges;
*/

/*para iniciar el sistema colocarse en la carpeta backend en la terminal, despues npm install
para los node_modules, y luego npm run dev.
*/