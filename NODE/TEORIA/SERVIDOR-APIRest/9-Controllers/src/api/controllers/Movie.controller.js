const Movie = require("../models/Movie.model")

//!--------------------------------------------------------------------------
//?------------------- POST - CREATE-----------------------------------------
//!--------------------------------------------------------------------------

const createMovie = async(req, res, next) => {
    try {
        await Movie.syncIndexes();
        //Creamos la nueva instancia de Movie
        const newMovie = new Movie(req.body);

        //Guardamos ese registro en la DB
        const saveMovie = await newMovie.save();
        // Si existe se guardará de forma correcta con 200
        if(saveMovie){
            return res.status(200).json(saveMovie);
        } else {
            //Sino existe es que no se ha guardado y hay un error
            return res.status(409).json("No se ha podido crear la Movie");
        }
    } catch (error) {
        return res.status(409).json({error: "Error en la creación de la nueva Movie", message: error.message,});
    }
};

//? Guardamos y exportamos 

module.exports = { createMovie };