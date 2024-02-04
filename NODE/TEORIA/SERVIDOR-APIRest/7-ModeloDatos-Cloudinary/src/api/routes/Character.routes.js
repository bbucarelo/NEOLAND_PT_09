//?---------Se debe traer UPLOAD (función de multer para subida de ficheros)-------

    const { upload } = require("../../middleware/files.middleware");

//?---------Importamos los controladores-------------------------------------------

    const { create } = require("../controllers/Character.controllers");

//?----- Se crea un router especifico para Character-------------------------------
// Al llamarlo disponemos de todas las rutas y luego será llamado en el index------

    const express = require("express");

    const CharacterRouter = express.Router();

//!-------------- Añadimos las rutas------------------------------------------------
// Se llama a la ruta y usamos el post, definimos con el create pues es una función en medio de la ruta y del controlador

CharacterRouter.post("/create", upload.single("image"), create);

//?--------------Exportamos la función creada---------------------------------------
// Se exporta de forma general para no exportar de una en una todas las diversas rutas que se puedan crear 
module.exports = CharacterRouter;