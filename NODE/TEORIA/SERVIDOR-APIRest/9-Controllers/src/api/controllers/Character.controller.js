//? Se trae la función de borrado de imagenes por si el usuario al subir un nuevo character tiene un error
//? que ocasione que esa imagen se borre

const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const enumOk = require("../../utils/enumOk");

//? Nos traemos el modelo de Character

const Character = require("../models/Character.model");
//!--------------------------------------------------------------------------
//?------------------- POST - CREATE-----------------------------------------
//!--------------------------------------------------------------------------

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
//!--------------------------------------------------------------------------
//?------------------- GET - GET ALL-----------------------------------------
//!--------------------------------------------------------------------------

const getAll = async(req, res, next) => {
    try {
        //Se deben encontrar todos los elementos de la colección
        const allCharacter = await Character.find();
        if(allCharacter.length > 0) {
            //Si hay registros lanzamos una respuesta correcta
            return res.status(200).json(allCharacter);
        } else {
            // Si no hay registros lanzamos una respuesta 404
            return res.status(404).json("No se han encontrado personajes");
        }
    } catch (error) {
        //Capturamos el error
        return res
        .status(409)
        .json({error: "Error al buscar personajes", message: error.message});
    }
};

//!--------------------------------------------------------------------------
//?------------------- GET - GET by ID---------------------------------------
//!--------------------------------------------------------------------------

const getById = async(req, res, next) => {
    try {
        //Haremos un destructuring del ID traído por params
            const {id} = req.params;
        //Encontramos al character que tenga ese ID con método findByID
            const characterById = await Character.findById(id);
        //Comprabamos si se ha encontrado el character
            if(characterById) {
                return res.status(200).json(characterById)
            } else {
                return res.status(404).json("No se ha encontrado el character");
    }
    } catch (error) {
        return res.status(409).json({error: "Error al buscar por ID", message: error.message});
    }   
};


//!--------------------------------------------------------------------------
//?------------------- GET - GET by NAME-------------------------------------
//!--------------------------------------------------------------------------

const getByName = async(req, res, next) => {
    try {
        //Haremos un destructuring del name traído por params
        const {name} = req.params;
        //Encontramos al character que tenga ese name con método findByName
        const charactersByName = await Character.find({ name });
        //Comprobamos si se ha encontrado el name si la longitud del array >0 hay character con ese name y la respuesta es 200
            if(charactersByName.length > 0) {
                return res.status(200).json(charactersByName);
            } else {
                return res.status(404).json("No se ha encontrado el nombre");
            }
    } catch (error) {
        return res.status(409).json({error: "Error al buscar por Name", message: error.message});
    }
};

//!--------------------------------------------------------------------------
//?------------------- PATCH - UPDATE----------------------------------------
//!--------------------------------------------------------------------------

const update = async(req, res, next) => {
    try {
        // Comprobamos si en la solicitud hay una imagen (si hay, nos van a cambiar la imagen del character)
        let catchImage = req.file?.path;
        await Character.syncIndexes();

        //Se trae el ID de los params de este character a actualizar
        const {id} = req.params;
        //Buscamos el character
        const characterById = await Character.findById(id);

        if(characterById) {
            //Se guarda la imagen que tiene el character en BBDD
            const oldImage = characterById.image;
            
            //Creamos un body custom con los datos, si los hay, del body
            const bodyCustom = {
                _id: characterById._id,
                image: req.file?.path ? catchImage : oldImage,
                name: req.body?.name ? req.body?.name : characterById.name,    
            };

            //Comprobamos si recibimos por el body el genero 
            if(req.body?.gender) {
                //Si lo recibimos llamamos a la función de utils que valida el genero
                const resultEnumOk = enumOk(req.body?.gender)
                bodyCustom.gender = resultEnumOk.check ? req.body?.gender : characterById.gender
            }

            try {
            // Busque por id el Character y lo actualize con el bodyCustom
            await Character.findByIdAndUpdate(id, bodyCustom);

            // Miramos si han actualizado la imagen por si esto es asi, borrar la antigua  
                if (req.file?.path) {
                // Si la imagen antigua es diferente a la que ponemos por defecto la borramos
                oldImage !==
                "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png" &&
                deleteImgCloudinary(oldImage);
                }

            //? -------------------------------------------------------------------
            //! TESTEAMOS EN TIEMPO REAL QUE ESTO SE HAYA REALIZADO CORRECTAMENTE--
            //? -------------------------------------------------------------------

                //Buscamos el elemento character actualizado mediante el id
            
                    const characterByIdUpdate = await Character.findById(id);

                // Cogemos el req.body y le sacamos las CLAVES para saber que elementos han actualizado
                   
                    const elementUpdate = Object.keys(req.body);

                // Creamos un objeto vacío donde vamos a meter este test
                    
                    let test = {};

                // Recorremos las claves del body y rellenamos el objeto test
                    
                    elementUpdate.forEach((item) => {
                
                // Compruebo el valor de las claves del body con los valores del character actualizado
                    if (req.body[item] === characterByIdUpdate[item]) {
                    test[item] = true;
                    } else {
                    test[item] = false;
            }
          });

        // Comprobamos que la imagen del character actualizado coincide con la imagen nueva si la hay
        // Si coinciden creamos una copia de test con una nueva clave que será file en true y sino estará en false    

            if (catchImage) {
                characterByIdUpdate.image === catchImage
                ? (test = { ...test, file: true })
                : (test = { ...test, file: false });
            }
        
        // Comprobamos que ninguna clave del test este en false, si hay alguna lanzamos un 409 porque alguna
        // clave no se ha actualizado de forma correcta , si estan todas en true lanzamos un 200 que esta todo correcto

        let acc = 0;

        for (const key in test) {
          // si esto es false añadimos uno al contador
          test[key] === false && acc++;
        }

        // si acc es mayor que 0 lanzamos error porque hay alguna clave en false y eso es que no se ha actualizado

        if (acc > 0) {
            return res.status(409).json({ dataTest: test, update: false });
          } else {
            return res
              .status(200)
              .json({ dataTest: test, update: characterByIdUpdate });
          }
        } catch (error) {
          return res.status(409).json({
            error: "No se ha podidio actualizar",
            message: error.message,
          });
        }
      } else {
        // si el character con ese id no existe
        return res.status(404).json("El character no ha sido encontrado");
      }
    } catch (error) {
      return res
        .status(409)
        .json({ error: "No se ha podidio actualizar", message: error.message });
    }
  };

//!--------------------------------------------------------------------------
//?------------------- DELETE------------------------------------------------
//!--------------------------------------------------------------------------

//Debemos borrar el character cuyo ID se trae por params, este ID aparece en el array de characters en movie

//Creamos la función asincrona, como siempre, además de la lógica de try y catch 

const deleteCharacter = async (req, res, next) => {
    try {
      // Buscamos el id en los params
      const { id } = req.params;
  
      // Buscamos y borramos el character
      const character = await Character.findByIdAndDelete(id);
  
      if (character) {
        // Si existe el character --> borramos los registros donde aparece
        // Se debe comprobar si el character ha sido borrado
        const characterDelete = await Character.findById(id);

      //? Borramos los registros de character en los arrays de movie donde aparece:

      try {
        // 1º parametro es el filtro
        // 2º acción --> sacar de characters el id de ese Character borrado
        await Movie.updateMany(
          { characters: id },
          { $pull: { characters: id } }
        );

        // Verificamos que el character borrado no tengo la imagen por defecto para borrarla
        character.image !==
          "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png" &&
          deleteImgCloudinary(character.image);

        // Lanzamos una respuesta dependiendo de si se ha encontrado el character borrado
        return res.status(characterDelete ? 409 : 200).json({deleteTest: characterDelete ? false : true,
        });
        } catch (error) {
        return res.status(409).json({error: "Error al borrar el character", message: error.message,
        });
      }
    } else {
      // lanzamos una respuesta 404 que el character no ha sido encontrado
        return res.status(404).json("El character no ha sido encontrado");
    }
    } catch (error) {
        return res.status(409).json({error: "Error al borrar el character", message: error.message,
    });
  }
};


// Finalmente exportamos todas las funciones usadas como controlador 
    module.exports = { create, getAll, getById, getByName, update, deleteCharacter };