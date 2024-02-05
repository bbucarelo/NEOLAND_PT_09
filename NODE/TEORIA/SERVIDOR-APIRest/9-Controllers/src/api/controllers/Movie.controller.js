const Movie = require("../models/Movie.model")
const Character = require("../models/Character.model")

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

//!--------------------------------------------------------------------------
//?------------------- PATCH - TOGGLE----------------------------------------
//!--------------------------------------------------------------------------

//Es un controlador y sigue la misma lógica de los métodos, donde se declara la función, se usa try y catch y demás

const toggleCharacters = async(req, res, next) => {

    try {
    //Buscamos el ID de los params  
    const { id } = req.params; 
    
    //Hacemos el destructuring y recogemos los characters del body
    const { characters } = req.body; //? Esto devolverá un array de los ID 

    // Buscamos la película a actualizar por el id con find

    const movieById = await Movie.findById(id);

    // Primero comprobamos si existe la movie en la DB, sino lanzamos 404
        if(movieById) {
        // Lo traido por req.body lo convertimos con JS mediante split y lo separamos con ","
        
        const arrayCharacters = characters.split(",");
        console.log("array characters", arrayCharacters);

        // Lo metemos en una promesa para que haga todo el mapeo y no lo termino, pues, esto es asincrono 
        Promise.all(
            arrayCharacters.map(async(character) => {
                if(movieById.characters.includes(character)){
                // Si lo incluye, hay que quitarlo
                    try {
                        //Buscamos la movie que queremos actualizar
                        await Movie.findByIdAndUpdate(id, {
                        // Quitamos el character del array de characters de movie   
                        $pull: {characters: character}     
                        });

                            try {
                             // Buscamos el character y le quitamos la pelicula 
                            await Character.findByIdAndUpdate(character, {
                            $pull: { movies: id },
                             });   
                            } catch (error) {
                                return res.status(409).json({
                                    error: "Error al actualizar el character, quitarle la movie",
                                    message: error.message, 
                            });
                            }
                        } catch (error) {
                            return res.status(409).json({
                                error: "Error al actualizar la movie, quitarle el character",
                                message: error.message,
                            });
                        }
                } else {
                // Si no lo incluye lo añadimos (character al array de charactes de movie)
                try {
                    // Actualizamos la movie añadiendole el character
                            await Movie.findByIdAndUpdate(id, {
                            $push: { characters: character },
                            });
                try {
                    // Actualizamos nuestro character metiendo en el campo de movies la movie
                            await Character.findByIdAndUpdate(character, {
                            $push: { movies: id },
                            });
                } catch (error) {
                            return res.status(409).json({
                            error: "Error al actualizar el character, añadirle la movie",
                            message: error.message,
                            });
                }
                } catch (error) {
                            return res.status(409).json({
                            error: "Error al actualizar la movie, al añadirle el character",
                            message: error.message,
                            });
                }
                        }})
                      ).then(async () => {
                            return res
                            .status(200)
                            .json(await Movie.findById(id).populate("characters"));
                        });
                } else {
                            // Lanzamos un 404 porque no existe la pelicula a actualizar
                            return res.status(404).json("Movie no encontrada, prueba con otro id");
                        }
                } catch (error) {
                    return res
                    .status(409)
                    .json({ error: "Error al actualizar la movie", message: error.message });
                }
                };

//? Guardamos y exportamos las funciones creadas

module.exports = { createMovie, toggleCharacters };