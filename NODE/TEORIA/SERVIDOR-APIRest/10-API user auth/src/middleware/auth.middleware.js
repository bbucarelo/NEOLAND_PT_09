// Middleware que comprueba que la persona (id) entra a las rutas autenticadas 
// y está autorizado para hacerlo usando un token mediante librería JSONwebtoken

//?-------------------------IMPORTACIONES------------------------------------------------

const User = require("../api/models/User.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

//?------------------Función para detectar autenticación---------------------------------
//?---------------Con token válido e independiente del rol-------------------------------

const isAuth = async(req, res, next) => {
// Nos quedamos con el token que viene del encabezado de la solicitud
// Se debe quitar la palabra BEARER que viene dado en el token por un espacio vacío------

    const token = req.headers.authorization?.replace("Bearer ", "");
// Comprobamos si hay token y si no lanzamos un error------------------------------------
    if(!token) {
        return next(new Error("No autorizado"));
    }
    // Si hay token hacemos try-catch para obtener la información con la que se creó
        try {
            const decoded = verifyToken(token, process.env.JWT_SECRET);
            console.log("decoded", decoded); // Para obtener id y mail de creación
            req.User = await User.findById(decoded.id); //Lo creamos con los datos del user
            next(); //Le decimos que continue pues no hemos puesto return
        } catch (error) {
            return res.status(409).json({error: "Problemas al obtener el token", message: error.message});
        }
};

//?---------------------Autorización solo para los admin--------------------------------------------------
// Mismos pasos de la función anterior
const isAuthAdmin = async(req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
// Comprobamos si hay token y si no lanzamos un error
    if(!token) {
        return next(new Error("No autorizado"));
    }
// A partir de aquí cambia respecto a la verificación anterior
        try {
            const decoded = verifyToken(token, process.env.JWT_SECRET);
            console.log("decoded", decoded); // Para obtener id y mail de creación
            req.User = await User.findById(decoded.id); //Lo creamos con los datos del user
                if(req.user.rol !=="admin") {
                    return next(new Error("No estás autorizado, no eres administrador"));
                }
                next(); //También se puede usar conteniendo el next dentro de un else 
            // Si eres admin, continuamos 
        } catch (error) {
            return res.status(409).json({error: "Problemas al obtener el token", message: error.message});
        }
};




//? Exportamos 
module.exports = { isAuth, isAuthAdmin};


