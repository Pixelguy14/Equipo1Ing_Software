const db= require('../../db/mysql')

const TABLA= 'vehiculos'

function todos_vehiculos () {
    return db.todos_tabla(TABLA);
}

function agregar_vehiculo () {
    const{
        carID,
        carUsuNUA,
        carModelo,
        carAnio,
        carPlacas,
        carCapacidad,
        carColor,
    } = Datosvehiculo;
    const query = `
        INSERT INTO [Vehiculos] (Car_id, Car_Usu_NUA,Car_Modelo,Car_anio,Car_Placas,Car_Capacidad,Car_Color)
        VALUES (@Car_id,@Car_Usu_NUA,@Car_Modelo,@Car_anio,@Car_Placas,@Car_Capacidad,@Car_Color)
    `;
    /*const parameters =[
        {name: 'Car_id', type: TYPES.UniqueIdentifier, value: todoID},
        {name: 'author', type: TYPES.VarChar, value: author},
        {name: 'todoDate', type: TYPES.DateTime, value: todoDate},
        {name: 'description', type: TYPES.VarChar, value: description},
        {name: 'state', type: TYPES.SmallInt, value: state},
    ];*/
    db.agregar_vehiculo(TABLA, nuevoVehiculo);
}

module.exports = {
    todos_vehiculos,
    agregar_vehiculo
}