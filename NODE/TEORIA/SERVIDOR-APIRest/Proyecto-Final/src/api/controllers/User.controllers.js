//?-----------Importaciones y requerimientos------------------------------------
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const validator = require("validator");

const User = require("../models/User.model");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");
const enumOk = require("../../utils/enumOk");
const Projects = require("../models/Projects.model");
const Division = require("../models/Division.model");

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?---------------------------------------------------------------------------REGISTER REDIRECT-------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const registerWithRedirect = async(req, res, next) => {
    let catchImg = req.file?.path
    try {
        await User.syncIndexes(); // Los índices se actualizan automática por mongoDB para reflejar los cambios.
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
//?--------------------------------------------------------------------CHECK CONFIRMATION CODE: USER--------------------------------------------------------------------
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

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?-----------------------------------------------------------LOGIN-----------------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const login = async (req, res, next) => {
    try {
        //Destructuring del email y la pass del req.body
        const { email, password } = req.body;
        //Se busca al usuario por el email, sino está lanzamos error 
        const userDB = await User.findOne({ email });
        // Comprobamos que el user exister en la DB
        if (userDB) {
            //Comparamos contraseña encriptada de la BBDD 
            if (bcrypt.compareSync(password, userDB.password)) {
                //Si es coincidente: true y se puede generar el token
                const token = generateToken(userDB._id, email);
                return res.status(200).json({user: userDB, token,}); //Respuesta con el user y el token 
            } else {
                //Si la contraseña no coincide generamos error 
                return res.status(409).json({error: "Contraseña incorrecta", message: "Inténtalo de nuevo"});
            }
        } else {
            // Si el user no es encontrado
            return res.status(404).json({ error: "Usuario no encontrado", message: "El usuario no está registrado en la BBDD" });
        }
    } catch (error) {
            return res.status(409).json({ error: "Error en el login", message: error.message });
    };
}; 

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?-----------------------------------------------------------AUTOLOGIN-----------------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const autoLogin = async (req, res, next) => {
    try {
        //Repetimos pasos de la función login - Destructuring del email y la pass del req.body
        const { email, password } = req.body;
        //Se busca al usuario por el email, sino está lanzamos error 
        const userDB = await User.findOne({ email });
        // Comprobamos que el user exister en la DB
        if (userDB) {
            //Comparamos contraseña encriptada de la BBDD
            if(password === userDB.password) {
                //Si coinciden generamos el token
                const token = generateToken(userDB._id, email);
                return res.status(200).json({user: userDB, token,}); //Respuesta con el user y el token 
            } else {
                //Error contraseña
                  return res.status(409).json({error: "Contraseña incorrecta", message: "Inténtalo de nuevo"});
            }
        } else {
            //Error usuario no encontrado
            return res.status(404).json({ error: "Usuario no encontrado", message: "El usuario no está registrado en la BBDD" })
        }
    } catch (error) {
        return res.status(409).json({ error: "Error en el login", message: error.message });
    }
}

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?-----------------------------------------------------------CHANGE PASSWORD - NO LOGUEADO-----------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const forgotPassword = async (req, res, next) => {
    try {
       //Destructuring del email y la pass del req.body
       const { email, password } = req.body;
       //Se busca al usuario por el email, sino está lanzamos error 
       const userDB = await User.findOne({ email });
        //Comprobamos si tenemos el usuario 
            if (userDB) {
            //Si el usuario existe hacemos el redirect que envía el correo con la contraseña
            //! Redirect con 307
                return res.redirect(307, `http://localhost:8081/api/v1/user/forgot/sendPassword/${userDB._id}`);
            } else {
            // User no encontrado 
            return res.status(404).json({error:"Usuario no encontrado", message: "Compruebe sus datos ingresados"});     
            }
    } catch (error) {
        return res.status(409).json({error: "Error al ejecutar cambio de la contraseña", message: error.message});
    }
};

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?-----------------------------------------------------------SEND PASSWORD - NO LOGUEADO-------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const sendPassword = async (req, res, next) => {
    try {
       // Traemos el id por req.params
       const { id } = req.params;
       // Buscamos el user 
       const userDB = await User.findById(id);
       // Comprobamos si el user existe 
       if (userDB) {
            // generamos password segura random 
            const passwordSecure = randomPassword();
            //! Enviamos el correo 
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
                subject: "Cambio de código solicitado",
                text: `Estimado: ${userDB.name}. Nos ponemos en contacto con usted tras haber recibido una solicitud de cambio de contraseña, su nuevo código para iniciar sesión es: ${passwordSecure} `,
            };

            //Enviamos el email
            transporter.sendMail(mailOptions, async(error, info) => {
                if(error) {
                    return res.status(409).json({error: "Correo no enviado", message: error});
                } else {
                // Encriptamos la contraseña para actualizar los datos del usuario 
                    const newPasswordEncript = bcrypt.hashSync(passwordSecure, 10); //10 vueltas para la encriptación

                    try {
                    //Intentamos actualizar al usuario
                    await User.findByIdAndUpdate(id, {password: newPasswordEncript});
                    //!-----Hacemos un test para comprobar que el usuario se ha actualizado correctamente------------
                    const userUpdate =  await User.findById(id);
                    //Compruebo y comparo la nueva contraseña segura con la contraseña encriptada que tiene guardada el usuario act
                        if (bcrypt.compareSync(passwordSecure, userUpdate.password)) {
                        // Si es true, se ha actualizado de forma correcta
                            return res.status(200).json({
                                updateUser: true,
                                sendPassword: true,
                            });   
                        } else {
                            //si las contraseñas no coinciden el usuario no se ha actualizado correctamente
                            return res.status(409).json({error: "El usuario no se ha actualizado", message: "Se ha enviado la nueva contraseña"});
                        }
                    } catch (error) {
                    // Error al actualizar al usuario 
                    return res.status(409).json({error: "Error al actualizar el usuario", message: error.message});   
                    }
            }
            });
        } else {
            // Usuario no existe lanzamos error 
            return res.status(404).json({error: "Usuario no encontrado", message: "Correo inválido"});
        }
    } catch (error) {
        return res.status(409).json({error: "Error al enviar el correo", message: error.message});
    }

};

//?--------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------------RUTA AUTENTICADAS-------------------------------------------------------------
//!--------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------CHANGE PASSWORD - AUTENTICADO-------------------------------------------------------

const changePassword = async(req, res, next) => {
    try {
    //Buscamos del body la contraseña antigua y la nueva 
    const { password, newPassword} = req.body;
    //Tenemos que comprobar que la contraseña sea fuerte mediante validator -> strongPassword
    const validate = validator.isStrongPassword(newPassword);
    //Comprobamos que sea así, sino error 
        if (validate) {
           //Obtenemos el id del usuario autenticado mediante req.user
            const { _id } = req.user; 
            //Comprobar y comparar que las contraseñas coincidan usando bcrypt pues está encriptada
            if (bcrypt.compareSync(password, req.user.password)) { 
                //Si coinciden hacemos el cambio de contraseña y actualizamos (encriptando y usando el hash)
                const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
                //Ahora debemos guardarla en el campo de contraseña
                    try {
                        //Actualizamos el user - no se debe hacer el .save()
                        await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
                        //!Hacemos el test en tiempo real para ver si el user se ha actualizado
                        const userSave = await User.findById(_id);
                        //Comprobamos que la contraseña del user esté actualizada
                        if (bcrypt.compareSync(newPassword, userSave.password)) {
                            //Si es correcto enviarmos res ok
                            return res.status(200).json({user: userSave, testUpdate: true});
                        } else {
                           //No se ha actualizado el usuario 
                           return res.status(409).json({testUpdate: false});
                        }
                    } catch (error) {
                        //Error al actualizar el user
                        return res.status(409).json({error: "Error al actualizar el usuario", message: error.message});
                    }    
            } else {
            // Error si las contraseñas no coinciden  
            return res.status(409).json({error: "Contraseña antigua incorrecta", message: "Pruebe otra contraseña"});
            } 
        } else {
            //Error la password no es segura
            return res.status(409).json({
                error: "La contraseña nueva no es segura", 
                message: "La nueva contraseña debe contener 8 carácteres, 1 símbolo, 1 mayúscula, 1 minúscula y al menos un número"});
        }    
    } catch (error) {
        return res.status(409).json({error: "Error al cambiar la contraseña", message: error.message});
    }
}

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?-----------------------------------------------------------UPDATE - AUTENTICADO--------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const updateUser = async(req, res, next) => {
    try {
        //Capturamos la imagen nueva subida a cloudinary (si viene en req.file)
        let catchImg = req.file?.path;
        //Actualizar indexes (modelos únicos)
        await User.syncIndexes();
        //Hacemos una nueva instancia de User con los datos traídos del body
        const patchUser = new User(req.body);

        // Comprobamos que el req.file traiga la imagen para añadirla al user actualizado 
        req.file && (patchUser.image= catchImg); //Se puede hacer con un if

        //Salvaguardo la info que el user no quiero que cambie
        patchUser._id = req.user._id;
        patchUser.password = req.user.password;
        patchUser.rol = req.user.rol;
        patchUser.confirmationCode = req.user.confirmationCode;
        patchUser.check = req.user.check;
        patchUser.email = req.user.email;

        //Comprobamos mediante la función enumOk si el user quiere cambiar el género
        if (req.body?.gender) {
            const resultEnum = enumOk(req.body?.gender);
            patchUser.gender = resultEnum.check ? req.body.gender : req.user.gender;
        } 

        //Actualizamos al usuario  
        try {
            //!No se hace con el .save()
            await User.findByIdAndUpdate(req.user._id, patchUser);
            // Si el user quiere cambiar su imagen y la imagen guardada es distinta a la imagen por defecto, la borramos 
                if(req.file && req.user.image !== "https://res.cloudinary.com/ddte4t4qb/image/upload/v1707769249/user_456212_amdsyd.png") {
                    deleteImgCloudinary(req.user.image);
                }
            //!---------------Test en tiempo real-----------------------------------------------------------------------
            // Comparamos los usuarios 
            // Buscamos al user guardado ya actualizado para testear la info
                const updateUser = await User.findById(req.user._id);
            // Obtenemos las claves del req.body para saber que info quiere actualizar el usuario
                const updateKeys = Object.keys(req.body);
                console.log("claves del body", updateKeys);
            // Creo un array vacio donde vamos a guardar el test
                const testUpdate = [];
            // Recorremos las claves que el user quiere actualizar
                updateKeys.forEach((item) => {
                // Comprobamos que la info actualizada sea igual a lo que mando el user por la req.body
                    if (updateUser[item] === req.body[item]) {
                // Doble verificacion comprobando que sea diferente a lo que tenia el user guardado
                        if (updateUser[item] !== req.user[item]) {
                // Si estas dos verificaciones coinciden se ha actualizado el user de forma correcta
                            testUpdate.push({[item]: true,});
                        } else {
                    testUpdate.push({[item]: "Misma info que la antigua",});
                        }
                    } else {
                    testUpdate.push({[item]: false,});
                    }
                });
            // Tenemos que checkear el req.file por si hay hacer el test
                if (req.file) {
                // Si la imagen del user actualizado es igual a la imagen nueva el test es correcto
                // Si no es igual, no se actualizo y ponemos el test en false
                    updateUser.image === catchImg ? testUpdate.push({ image: true }) : testUpdate.push({ image: false });
                }
            // Si el test de imagen es correcto y el user tiene una imagen diferente a la que viene por defecto se la borramos
                    if (
                        testUpdate.image && req.user.image !==
                        "https://res.cloudinary.com/ddte4t4qb/image/upload/v1707769249/user_456212_amdsyd.png"
                        ) {
                            deleteImgCloudinary(req.user.image);
                        }
                    console.log("Test Update", testUpdate);
                // una vez finalizado el test lanzamos una respuesta correcta con el user actualizado y el test
                    return res.status(200).json({
                        user: updateUser,
                        test: testUpdate,
                    });
        } catch (error) {
            // Error al actualizar el user
            // Si hay un error y el user subió una imagen, esa imagen la borramos
                if (req.file) {deleteImgCloudinary(catchImg);
                }
                    return res.status(409).json({error: "Error al actualizar el user", message: error.message});
                }
    } catch (error) {
        // Si hay un error y el user subio una imagen, esa imagen la borramos
            if (req.file) {deleteImgCloudinary(catchImg);
                }
                return res.status(409).json({error: "Error general actualizando el user",message: error.message});
            }
};

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?-----------------------------------------------------------DELETE - AUTENTICADO--------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.body._id;

        // Borrar usuario
        await User.findByIdAndDelete(userId);

        // Buscamos al usuario borrado para verificar que se ha borrado
        const existUser = await User.findById(userId);

        // Si el usuario no existe, se ha borrado correctamente
        if (!existUser) {
            // Actualización de modelos que contengan el usuario borrado
            try {
                
                await Projects.updateMany(
                    { user: userId },
                    { $pull: { user: userId } }
                );

                await Division.updateMany(
                    { user: userId },
                    { $pull: { user: userId } }
                );

                // Respuesta correcta - usuario borrado
                return res.status(200).json("Usuario borrado");
            } catch (error) {
                // Error en la actualización de los modelos projects y divisions           
                return res.status(409).json({
                    error: "Error al eliminar usuario de los modelos projects y divisions",
                    message: error.message,
                });
            }
        } else {
            // Error usuario no borrado
            return res.status(409).json({ error: "Error en el borrado" });
        }
    } catch (error) {
        //error general del inicio (try)
        return res.status(409).json({
            error: "Error general borrando el usuario",
            message: error.message,
        });
    }
};

    
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- GET - GET ALL -------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getAll = async (req, res, next) => {
    try {
    // Traemos todos los elementos de la coleccion
    const allUsers = await User.find();
        if (allUsers.length > 0) {
        // Si hay registros lanzamos una respuesta correcta
            return res.status(200).json(allUsers);
        } else {
        // si no hay registros lanzamos una respuesta 404
            return res.status(404).json("No se han encontrado a los usuarios");
        }
    } catch (error) {
      // Captura del error
      return res
        .status(409).json({ error: "Error al buscar los usuarios", message: error.message });
    }
  };



//?---------------------------------------------------------------------Funciones a exportar------------------------------------------------------------------------------------

module.exports = { registerWithRedirect, sendCode, resendCode, checkNewUser, login, autoLogin, forgotPassword, sendPassword, changePassword, updateUser, deleteUser, getAll };

