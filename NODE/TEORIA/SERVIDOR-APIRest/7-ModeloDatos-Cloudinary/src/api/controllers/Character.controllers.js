//? Se trae la función de borrado de imagenes por si el usuario al subir un nuevo character tiene un error
//? que ocasione que esa imagen se borre

const { deleteImgCloudinary } = require("../../middleware/files.middleware");

//? Nos traemos el modelo de Character

const Character = require("../models/Character.model");

//?------------------- Post - Create-----------------------------------------

const create = async (req, res, next) => {
    // Se guarda la url de la imagen que se sube a cloudinary
    //req.file para los archivos (imagen)

    let catchImg = req.file?.path;

        try {
            //!------Se actualizan los index----------------------------------
            await Character.syncIndexes();
        // Se crea una nueva instancia de Character con los datos del body----
            const newCharacter = new Character(req.body);

        // Se comprueba si hay imagen para añadirla al Character creado 
            if (catchImg) {
                newCharacter.image = catchImg;
            } else {
        // Si no trae imagen la solicitud, le ponemos al character una imagen por defecto
            newCharacter.image = 
            "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";
            }

           //!------Se guarda el character creado-------------------------------
           const saveCharacter = await newCharacter.save(); 

        // Se comprueba si el character se ha guardado para lanzar una respuesta
            if (saveCharacter) {
                //Si se ha guardado lanzamos una respuesta correcta con los datos del Character generado 
            return res.status(200).json(saveCharacter);
            } else {
                // Si no se ha guardado hay un error y lo lanzamos como respuesta
            return res
                .status(404)
                .json("No se ha podido guardar en la base de datos");
            }
     } catch (error) {
        //!------- Solo se entra al catch cuando ha habido un error--------------
            // Dos acciones a realizar si ha habido un error: 
            //---1. Hay que borrar la imagen en cloudinary porque se sube antes de entrar al controlador (al ser un middleware)
            //---2. Comprobar si hay imagen en req.file porque de ser así se ha subido al cloud y hay que borrarla

                req.file?.path && deleteImgCloudinary(catchImg);
                next(error);
                return res.status(409).json("Error en la creación del Character");
     }
};

// Finalmente exportamos el Create
    module.exports = { create };