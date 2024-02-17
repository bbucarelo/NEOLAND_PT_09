//?-------------------Importaciones----------------------------------------------------------------------------------

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//Función que usaremos en el login 

const generateToken = (id, email) => {
// Es necesario tener el id o el mail, sino generamos error
    if (!id || !email) {
        throw new Error("Comprueba el correo o el ID");
    }
    // Usando el método sign de JWT que nos permite generar el token y añadimos la contraseña que tenenmos en el .ENV
    //Adicional, añadimos la fecha de expiración del token 
    return jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: "1D"});
};

// Verificación del token recibido y validación
const verifyToken = (token) => {
    if(!token) {
        throw new Error("No se ha generado el token");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}

//?-------------------Exportaciones----------------------------------------------------------------------------------

module.exports = { generateToken, verifyToken};