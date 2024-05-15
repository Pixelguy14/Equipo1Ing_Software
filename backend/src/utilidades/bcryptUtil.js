const bcrypt = require('bcrypt');

const encriptarContrasena = async (contrasena) => {
    console.log('@@@ password ', contrasena)
    const saltRounds = 10;
    const hash = await bcrypt.hash(contrasena, saltRounds);
    return hash;
};

const compararContrasena = async (contrasena, contrasenaEncriptada) => {
    return await bcrypt.compare(contrasena, contrasenaEncriptada)
};

module.exports = {
    encriptarContrasena,
    compararContrasena
};