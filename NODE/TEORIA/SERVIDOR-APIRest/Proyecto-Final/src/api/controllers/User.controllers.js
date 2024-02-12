//?-----------Importaciones y requerimientos------------------------------------
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const User = require("../models/User.model");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?---------------------------------------------------------------------------REGISTER REDIRECT-------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const registerWithRedirect = async(req, res, next) => {
    let catchImg = req.file?.path
    try {
        await User.syncIndexes();
        let confirmationCode = randomCode();
        //Buscamos si hay algún usuario existente con ese nombre y email en la DB
        const userExist = await User.findOne(
            {email: req.body.email},
            {name: req.body.name}
        );
        // Si no existe procedemos a crearlo
        if(!userExist) {
            const newUser = new User({...req.body, confirmationCode});
        if(req.file) {
            newUser.image = req.file.path;
        } else {
            newUser.image = "https://res.cloudinary.com/ddte4t4qb/image/upload/v1707769249/user_456212_amdsyd.png";
        }
        try {
            // Se ha creado el user con los datos, ahora debemos guardarlo
            const userSave = await newUser.save();
            //Comprobamos que el usuario se ha guardado y se envía el código
                if(userSave) {
                    return res.redirect(307, `http://localhost:8081/api/v1/user/register/sendMail/${userSave._id}`);
                } else {
                // Error no se ha guardado correctamente 
                req.file && deleteImgCloudinary(catchImg);  
                return res.status(404).json({
                    error: "El usuario no se ha guardado correctamente",
                    message: "El usuario no se ha guardado correctamente"});
                }
        } catch (error) {
            //error al guardar el user  
            req.file && deleteImgCloudinary(catchImg);   
            return res.status(409).json({
                error: "El usuario no se ha guardado correctamente", 
                message: error.message});
            }
        } else {
            //error porque ya existe este usuario
            req.file && deleteImgCloudinary(catchImg);  
            return res.status(409).json({
                error: "El usuario ya existe", 
                message: "el usuario ya existe en la base de datos"});
        }
    } catch (error) {
    req.file && deleteImgCloudinary(catchImg); 
    return res.status(409).json({
        error: "Error en el registro", 
        message: error.message});
    };
}; 

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------------------------------SEND CONFIRMATION CODE---------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const sendCode = async (req, res, next) => {
    try {
    //Buscamos al user por su id  de los params  
        const { id } = req.params;
    //Buscamos al user por el id
        const userDB = await User.findById(id);
    // Llamamos a las variables de entorno
        const emailENV = process.env.EMAIL;
        const passwordENV = process.env.PASSWORD;
    //Creamos el transporte
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailENV,
                pass: passwordENV,
            },
        });
    //Creamos las opciones del mensaje
    const mailOptions = {
        from: emailENV,
        to: userDB.email, //Envío al usuario que se ha registrado
        subject: "Confirmation Code",
        text: `¡Ya casi estamos! Usa el siguiente código de confirmación para completar el registro: ${userDB.confirmationCode}`,
    };
    //Enviamos el email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return res.status(409).json({error: "Correo no enviado", message: error});
        } else {
            res.status(200).json({user: userDB, confirmationCode: userDB.confirmationCode});
        }
        });
    } catch (error) {
        return res.status(409).json({error:"Error al enviar el correo", message: error.message});
    };
};

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------------------------------RE-SEND CONFIRMATION CODE------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const resendCode = async (req, res, next) => {
    try {
    // Llamamos a las variables de entorno
    const emailENV = process.env.EMAIL;
    const passwordENV = process.env.PASSWORD;    
    //Creamos el transporte
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: emailENV,
        pass: passwordENV,
        },
    });
    //Buscamos al usuario por el email que trae la solicitud
    const userSave = await User.findOne({email: req.body.email});
    if(userSave) {
    //Creamos las opciones del mensaje
    const mailOptions = {
        from: emailENV,
        to: req.body.email, //Envío al usuario que se ha registrado
        subject: "Confirmation Code part. 2",
        text: `¡No pasa nada, ya casi terminamos! Te enviamos nuevamente tu código de registro, pues hemos recibido una solicitud de reenvío de tu código de acceso y es: ${userSave.confirmationCode}`,
    };
    //Enviamos el email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return res.status(409).json({error: "Correo no enviado", message: error});
        } else {
            res.status(200).json({user: userSave, resend: true});
        }
        });
    } else {
        //Error no se encuentra al user por el mail
        return res.status(404).json({error:"User not found", message: "Ingrese otro correo"});
    }
    } catch (error) {
        return res.status(409).json({error:"Error al enviar el código", message: error.message});
    }
    };

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------------------------------CHECH CONFIRMATION CODE: USER--------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const checkNewUser = async(req, res, next) => {
    try {
        //Recibimos el email y el confirmation code de la solicitud 
        //Hacemos destructuring
        const { email, confirmationCode} = req.body;
        //Buscamos al usuario
        const userExist = await User.findOne({email});
        //Si el usuario no existe lanzamos un errror 
        if(!userExist) {
            return res.status(404).json({error: "User no encontrado", message: "Ingresa tu correo nuevamente"});
        } else {
        // Si existe, se comprueba el código
        if(userExist.confirmationCode === confirmationCode) {
            //Si es igual se actualiza el usuario 
            try {
            // Actualizamos el user
            await userExist.updateOne({check: true}); 
            // Se busca al usuario actualizado para enviar la respuesta 
            const updateUser = await User.findOne({email});
            return res.status(200).json({
                user: updateUser,
                testCheckUser: updateUser.check == true ? true : false,
            });
            } catch (error) {
                return res.status(409).json({error: "Error al actualizar", message:error.message});    
            }
        } else {
            // Si los códigos no coinciden borramos al usuario
            await User.findByIdAndDelete(userExist._id)
            //Borramos la imagen si no es la imagen por defecto
                if(userExist.image !=="https://res.cloudinary.com/ddte4t4qb/image/upload/v1707769249/user_456212_amdsyd.png") {
                deleteImgCloudinary(userExist.image);
                }
            // Lanzamos la respuesta avisando del borrado del user
            return res.status(409).json({
                user: userExist,
                check: false,
                delete: (await User.findById(userExist._id)) ? "El usuario no se ha borrado" : "user borrado",
            });
        }   
        }
    } catch (error) {
        return res.status(409).json({error: "Error al checkear", message: error.message});
    }
};



//?---------------------------------------------------------------------Funciones a exportar------------------------------------------------------------------------------------

module.exports = { registerWithRedirect, sendCode, resendCode, checkNewUser };

