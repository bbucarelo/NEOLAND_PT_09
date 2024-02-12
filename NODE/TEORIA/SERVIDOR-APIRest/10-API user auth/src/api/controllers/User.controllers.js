const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const validator = require("validator");

const User = require("../models/User.model");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { generateToken } = require("../../utils/token");

const randomCode = require("../../utils/randomCode");
const randomPassword = require("../../utils/randomPassword");
const enumOk = require("../../utils/enumOk");
//Sugerencia: Mantener estructura y orden en las importaciones

//!--------------------------------------------------------------------------
//?------------------- REGISTER LARGO----------------------------------------
//!--------------------------------------------------------------------------

const registerLargo = async(req, res, next) => {
    //Comprobamos si hay imagen en la solicitud 
    const catchImg = req.file?.path

    try {
       //Sincronizamos indexes
        await User.syncIndexes();
        //Guardamos el código random en una variable
        const confirmationCode = randomCode();
        //Hacemos destructuring del name y mail del req.body
        const {email, name} = req.body;
        //Buscamos si hay algún usuario existente con ese nombre y email en la DB 
        const userExist = await User.findOne({
            email: req.body.email,
        }, {
            name: req.body.name,
        }
        );
        // Si no existe procedemos a crearlo
            if(!userExist) {
                const newUser = new User({...req.body, confirmationCode});
        //Verificamos si hay imagen en la solicitud y si no hay ponemos la img default
            if(req.file) {
                newUser.image = req.file.path;
            } else {
                newUser.image = 
                "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";
            }
        // Se ha creado el user con los datos, ahora debemos guardarlo
            try {
                const userSave = await newUser.save();
                //Comprobamos que el usuario se ha guardado y se envía el código
                    if(userSave) {
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
                        to: email, //Envío al usuario que se ha registrado
                        subject: "Confirmation Code",
                        text: `Su código de confirmación es ${confirmationCode}, gracias por confiar en nosotros`,
                    };
                    //Enviamos el email
                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error) {
                            return res.status(409).json({error: "Correo no enviado", message: error});
                        } else {
                            res.status(200).json({user: userSave, confirmationCode});
                        }
                        });
                    } else {
                    //Comprobamos si hay imagen
                    req.file && deleteImgCloudinary(catchImg);
                    //lanzamos un error diciendo que no se guardó el usaurio
                    return res.status(409).json("Error al guardar el usuario");
                    }
            } catch (error) {
                req.file && deleteImgCloudinary(catchImg);   
                return res.status(409).json({error: "Problema al guardar el user", message: error.message,
            });
            }
            } else {
                //Lanzamos error porque el usuario ya existe
                req.file && deleteImgCloudinary(catchImg);
                return res.status(409).json("El usuario ya existe en la base de datos");
            }
    } catch (error) {
        req.file && deleteImgCloudinary(catchImg);
        return res.status(409).json({error: "Error en el registro", message: error.message});
    }
};

//!--------------------------------------------------------------------------
//?------------------- REGISTER CON REDIRECT---------------------------------
//!--------------------------------------------------------------------------
const registerWithRedirect = async(req, res, next) => {
    let catchImg = req.file?.path
    try { //Misma lógica 
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
                newUser.image = 
                "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";
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
                        error: "el user no se ha guardado correctamente",
                        message: "el user no se ha guardado correctamente"});
                    }
            } catch (error){
             //error al guardar el user  
             req.file && deleteImgCloudinary(catchImg);   
             return res.status(409).json({
                error: "el user no se ha guardado correctamente", 
                message: error.message});
            }
        } else {
            //error porque ya existe este usuario
            req.file && deleteImgCloudinary(catchImg);  
            return res.status(409).json({
                error: "el usuario ya existe", 
                message: "el usuario ya existe"});
        }
    } catch (error) {
        req.file && deleteImgCloudinary(catchImg); 
        return res.status(409).json({
            error: "Error en el registro", 
            message: error.message});
    };
}; 

//!--------------------------------------------------------------------------
//?------------------- SEND CODE CONFIRMATION--------------------------------
//!--------------------------------------------------------------------------

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
            text: `Su código de confirmación es ${userDB.confirmationCode}, gracias por confiar en nosotros.`,
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

//!--------------------------------------------------------------------------
//?------------------- RESEND CODE ------------------------------------------
//!--------------------------------------------------------------------------

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

//!--------------------------------------------------------------------------
//?------------------- CHECK NEW USER----------------------------------------
//!--------------------------------------------------------------------------

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
                if(userExist.image !=="https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png") {
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

//!--------------------------------------------------------------------------
//?------------------- LOGIN-------------------------------------------------
//!--------------------------------------------------------------------------

const login = async (req, res, next) => {
    try {
        // Hacemos destructuring del mail y la password que trae la req.body
        const { email, password } = req.body;
        //Buscamos al usuario, si no hay lanzamos error 
        const userDB = await User.findOne({ email });
        // Comprobamos si el user existe
            if(userDB) {
                //Comparamos las contraseñas con bcrypt
                if(bcrypt.compareSync(password, userDB.password)) {
                    //Si coinciden generamos token
                    const token = generateToken(userDB._id, email);
                    //Enviamos respuesta con el usuario y el token 
                    return res.status(200).json({
                        user: userDB,
                        token,
                    });
                } else { // Si las contraseñas no coinciden 
                    return res.status(409).json({error: "Contraseña incorrecta", message: "Intentalo de nuevo"});
                }
            } else {
                // Error user no encontrado
                return res.status(404).json({error:"Usario no encontrado", message: "Usuario no registrado"});
            }
    } catch (error) {
        return res.status(409).json({error: "Error en el login", message: error.message});
    }
};

//!--------------------------------------------------------------------------
//?------------------- AUTON LOGIN-------------------------------------------
//!--------------------------------------------------------------------------

const autoLogin = async (req, res, next) => {
    try {
        //Destructuring del mail y password del body
        const { email, password } = req.body;
        //Buscamos al usuario en la DB
        const userDB = await User.findOne({email});
        //Comprobamos i tenemos el usuario 
        if (userDB) {
            //Comprobamos si las 2 contraseñas encriptadas coinciden 
            if(password === userDB.password) {
                //Si coinciden generamos token
                const token = generateToken(userDB._id, email);
                //Enviamos respuesta con el token
                res.status(200).json({
                    user: userDB,
                    token,
                });
            } else {
                // Si no coinciden lanzamos error porque las contraseñas no coinciden 
                res.status(409).json({error: "La contraseña es incorrecta", message:"Intentalo otra vez"});
            }
        } else {
        // Lanzamos un error por user no encontrado
        return res.status(404).json({error:"Usario no encontrado", message: "Usuario no registrado"});      
        }

    } catch (error) {
        return res.status(409).json({error: "Error en el login", message: error.message});
    }
}

//!--------------------------------------------------------------------------
//?------------------- CAMBIO CONTRASEÑA SIN LOGIN---------------------------
//!--------------------------------------------------------------------------

const forgotPassword = async (req, res, next) => {
    try {
        //Nos traemos el email del body con destructuring
        const { email } = req.body; 
        //Comprobamos si el usuario existe 
        const userDB = await User.findOne({email});
        //Comprobamos i tenemos el usuario 
            if (userDB) {
            //Si el usuario existe hacemos el redirect que envía el correo con la contraseña
            //! Redirect con 307
            return res.redirect(307, `http://localhost:8081/api/v1/user/forgotPassword/sendPassword/${userDB._id}`);
            } else {
                // User no encontrado 
                return res.status(404).json({error:"Usario no encontrado", message: "Compruebe sus datos ingresados"});     
            }
    } catch (error) {
        return res.status(409).json({error: "Error al cambiar la contraseña", message: error.message});
    }
};

//!--------------------------------------------------------------------------
//?------------------- SEND PASSWORD (FORGOT)--------------------------------
//!--------------------------------------------------------------------------

const sendPassword = async(req, res, next) => {
    try {
        //Nos traemos el id del params con destructuring
        const { id } = req.params; 
        // Buscamos al user en la DB 
        const userDB = await User.findById(id);
        //Comprobamos i tenemos el usuario 
        if (userDB) {
            //Generamos password segura random y la enviamos
            const passwordSecure = randomPassword();
            //!Enviamos el mail----------------------------------------------- 
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
                text: `User: ${userDB.name}, su nuevo código para iniciar sesión es: ${passwordSecure} Nos ponemos en contacto con usted tras haber recibido una solicitud de cambio de contraseña`,
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
//?--------------------------------------------------------------------------
//!--------------------------------------------------------------------------
//!--------------------------------------------------------------------------
//?-------------------RUTA AUTENTICADAS--------------------------------------
//!--------------------------------------------------------------------------
//!--------------------------------------------------------------------------
//?--------------------------------------------------------------------------


//!--------------------------------------------------------------------------
//?-------------------EJEMPLO RUTA AUTENTICADA-------------------------------
//!--------------------------------------------------------------------------
// Esto es simplemente para ejemplificar y mostrar lo que es una ruta autenticada, no es necesario replicar 

const exampleAuth = async(req, res, next) => {
    try {
      console.log("req.user", req.user);  
      const userDB = await User.findById(req.user._id); // También se puede hacer con findOne - Clase 06/02 (min:45)
      return res.status(200).json(userDB);
    } catch (error) {
      console.log(error);  
      return res.status(409).json(error.message);
    }
};

//!--------------------------------------------------------------------------
//?-------------------CAMBIO DE CONTRASEÑA UNA VEZ AUTENTICADOS--------------
//!--------------------------------------------------------------------------
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

//!--------------------------------------------------------------------------
//?-------------------UPDATE-------------------------------------------------
//!--------------------------------------------------------------------------
const updateUser = async(req, res, next) => {
    try {
        //Capturamos la imagen nueva subida a cloudinary (si viene en req.file)
        let catchImg = req.file.path
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
            if(req.file && req.user.image !== "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png") {
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
            testUpdate.push({[item]: true,
            });
            } else {
                testUpdate.push({[item]: "Misma info que la antigua",
            });
            }
            } else {
                testUpdate.push({[item]: false,
            });
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
            "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png"
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

//!--------------------------------------------------------------------------
//?-------------------DELETE-------------------------------------------------
//!--------------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
    try {
    // Buscar al user por el id y borrarlo
     await User.findByIdAndDelete(req.user._id);
    // Buscamos al user borrado para verificar que se ha borrado
    const existUser = await User.findById(req.user._id);
    // Si el user no existe se ha borrado correctamente y habria que borrar la imagen si no es la que hay por defecto
        if (!existUser) {
        // Borrado de imagen si no es la que hay por defecto
        req.user.image !==
        "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png" &&
        deleteImgCloudinary(req.user.image);
        
            return res.status(200).json("User borrado");
        } else {
            // Error user no borrado
            return res.status(409).json({ error: "Error en el borrado" });
        }
    } catch (error) {
        return res.status(409).json({
            error: "Error general borrando el user", message: error.message});
    }
  };
  

//?---------------------------Exportamos-------------------------------------------------------------------------------- 
module.exports = { registerLargo,registerWithRedirect, sendCode, resendCode, checkNewUser, 
                login, autoLogin, forgotPassword, sendPassword, exampleAuth, changePassword, 
                updateUser, deleteUser };