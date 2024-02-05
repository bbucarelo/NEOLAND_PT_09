//?---------Se debe traer UPLOAD (función de multer para subida de ficheros)-------

const { upload } = require("../../middleware/files.middleware");

//?---------Importamos los controladores-------------------------------------------

    const { create, getAll, getById, getByName, update, deleteCharacter } = require("../controllers/Character.controller");

//?----- Se crea un router especifico para Character-------------------------------
// Al llamarlo disponemos de todas las rutas y luego será llamado en el index------

    const express = require("express");

    const CharacterRouter = express.Router();

//!-------------- Añadimos las rutas------------------------------------------------
// Se llama a la ruta y usamos el post, definimos con el create pues es una función en medio de la ruta y del controlador

CharacterRouter.post("/create", upload.single("image"), create);
CharacterRouter.get("/getAll", getAll);
CharacterRouter.get("/getById/:id", getById);
CharacterRouter.get("/getByName/:name", getByName);
CharacterRouter.patch("/update/:id", update);
CharacterRouter.delete("/delete/:id", deleteCharacter);


//?--------------Exportamos la función creada---------------------------------------
// Se exporta de forma general para no exportar de una en una todas las diversas rutas que se puedan crear 
module.exports = CharacterRouter;