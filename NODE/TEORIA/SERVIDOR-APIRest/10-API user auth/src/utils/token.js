//?---------------Importaciones----------------------------------------

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//?--------------Generamos token---------------------------------------

//Esta función se utilizará en el login y recibe el id, mail del usuario

const generateToken =(id, email) => {
    // Si no está el id o mail generamos un error
    if(!id || !email) {
        throw new Error("Falta el email o el id");
    }
    // Si lo que se recibe es correcto, se registra la petición
    //sign es un método de jwt
    return jwt.sign({ id, email}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

//?---------------Verificamos el token-----------------------------------
// Para saber si es válido el token y obtener la info con la que se ha creado

const verifyToken = (token) => {
    if(!token) {
        throw new Error("Sin token");
    }
    return jwt.verify(token, procces.env.JWT_SECRET);
};

//?---------Exportamos---------------------------------------------------
module.exports = { generateToken, verifyToken};