//? Middleware que permite verificar que el usuario está autenticado y tiene autorazación para dichas rutas
//?-------------------Importaciones----------------------------------------------------------------------------------

const User = require("../api/models/User.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

//?-------------------Función para comprobar la autenticación del usuario---------------------------------------------
// Es independiente del rol que tenga el usuario 

const isAuth = async(req, res, next) => {
    //La autenticación se encuentra en la solicitud de los headers y nos quedamos solo con el token (removemos bearer)
    const token = req.headers.authorization?.replace("Bearer ", ""); //Obtención del token con metodo de JS 
    //Comprobamos si trae correctamente el token 
    if (!token) {
        return next(new Error("No autorizado ❌ No se ha validado el token necesario."));
    } 
    
    try {
    // Si tenemos el token pedimos la info con la que se creó (id, email)   
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log("decoded", decoded); //Para obtener la info del usuario 
    req.user = await User.findById(decoded.id);
    next(); // Para que continue sin parar porque no hay return
    } catch (error) {
        return res.status(409).json({error: "Ha ocurrido un problema al generar el token", message: error.message});
    }
};

//?-------------------Función para comprobar la autenticación del usuario ADMIN/JEFE > control-----------------------

const isAuthAdmin = async(req, res, next) => {
//Siguiendo los mismos pasos que en la función anterior
const token = req.headers.authorization?.replace("Bearer ", ""); //Obtención del token con metodo de JS 
    //Comprobamos si trae correctamente el token 
    if (!token) {
        return next(new Error("No autorizado ❌ No posee token"));
    } 
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        console.log("decoded", decoded); //Para obtener la info del usuario  
        req.user = await User.findById(decoded.id); 
    //Ahora se comprueba que el rol sea de admin 
    if (req.user.rol !== "jefe") {
        return next(new Error("No autorizado, no eres admin/jefe"));
      } else {
        next();
      }
    } catch (error) {// Si eres admin continuamos 
        return res.status(409).json({error: "Ha ocurrido un problema al generar el token", message: error.message});
    }    
};

//?-------------------Función para comprobar la autenticación del usuario ADMIN/JEFE > control-----------------------
//! CONSULTAR 
/* const isAuthGerente = async(req, res, next) => {
    //Siguiendo los mismos pasos que en la función anterior
    const token = req.headers.authorization?.replace("Bearer ", ""); //Obtención del token con metodo de JS 
        //Comprobamos si trae correctamente el token 
        if (!token) {
            return next(new Error("No autorizado ❌ No posee token"));
        } 
        try {
            const decoded = verifyToken(token, process.env.JWT_SECRET);
            console.log("decoded", decoded); //Para obtener la info del usuario  
            req.user = await User.findById(decoded.id); 
        //Ahora se comprueba que el rol sea de admin 
        if (req.user.rol !== "gerente") {
            return next(new Error("No autorizado, no eres admin/gerente"));
          } else {
            next();
          }
        } catch (error) {// Si eres admin/gerente continuamos 
            return res.status(409).json({error: "Ha ocurrido un problema al generar el token", message: error.message});
        }    
    };
*/

//?---------------Exportaciones-----------------------------------------------------------------------------------------

module.exports = { isAuth, isAuthAdmin};

