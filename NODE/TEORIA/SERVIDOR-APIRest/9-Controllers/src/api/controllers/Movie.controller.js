
const Character = require("../models/Character.model");
const Movie = require("../models/Movie.model");

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
        return res.status(409).json({
            error: "Error en la creación de la nueva Movie", 
            message: error.message,
        });
    }
};

//!--------------------------------------------------------------------------
//?------------------- GET - GET ALL-----------------------------------------
//!--------------------------------------------------------------------------

const getAll = async(req, res, next) => { //Función como siempre asíncrona
    //Insertamos lógica del try - catch
    try { // Buscamos todos los elemnentos de la colección
        const allMovies = await Movie.find();
        if(allMovies.length > 0) {
            //Si hay registros se lanza respuesta correcta
            return res.status(200).json(allMovies)
        } else {
            // Si no hay registros lanzamos un 404
            return res.status(404).json("No se han encontrado las películas");
        }
    //Capturamos el error, si lo hay     
    } catch (error) { 
        return res.status(409).json({
            error: "Error al buscar las películas",
            message: error.message
        });
    }
};

//!--------------------------------------------------------------------------
//?------------------- GET - GET by ID---------------------------------------
//!--------------------------------------------------------------------------

const getById = async(req, res, next) => {
    try { //Seguimos misma lógica anterior pero para un ID
    // Hacemos destructuring del id traído por params
        const {id} = req.params;
    //Encontramos la movie que tenga ese ID con método findbyid
        const movieById = await Movie.findById(id);
    //Comprabamos si se ha encontrado la movie
        if (movieById) {
            return res.status(200).json(movieById);
        } else {
            return res.status(404).json("No se ha encontrado la película");
        }     
    } catch (error) {
        return res.status(409).json({
            error: "Error al buscar por ID",
            message: error.message
        });
    }
};

//!--------------------------------------------------------------------------
//?------------------- GET - GET by NAME-------------------------------------
//!--------------------------------------------------------------------------

const getByName = async(req, res, next) => {
    try {
        //Misma lógica del ID pero ahora con NAME
        const {name} = req.params;
        const movieByName = await Movie.find({ name });
            if (movieByName.length >  0) {
                return res.status(200).json(movieByName);
            } else {
                return res.status(404).json("No se ha encontrado el nombre de la película");
            }
    } catch (error) {
        return res.status(409).json({
            error: "Error al encontrar la película",
            message: error.message
        });
    }
};

//!--------------------------------------------------------------------------
//?------------------- PATCH - UPDATE----------------------------------------
//!--------------------------------------------------------------------------

const update = async(req, res, next) => {

    try {
        await Movie.syncIndexes();
        //Traemos el id del la movie a actualizar
        const {name} = req.params;
        //Buscamos la pelicula
        const movieById = await Movie.findById(id);
        //Hacemos un condicional de modo que si la movie existe en la DB se pueda actualizar
            if(movieById) {
                //Creamos un body custom con los datos, si los hay, del body
                const bodyCustom = {
                    _id: movieById._id,
                    name: req.body?.name ? req.body?.name : movieById.name,
                    year: req.body?.year ? req.body?.year : movieById.year
            };

    try {
                await Movie.findByIdAndUpdate(id, bodyCustom);
            
    
    //? -------------------------------------------------------------------
    //! TESTEAMOS EN TIEMPO REAL QUE ESTO SE HAYA REALIZADO CORRECTAMENTE--
    //? -------------------------------------------------------------------       

        //Buscamos el elemento movie actualizado mediante el id
            const movieByIdUpdate = await Movie.findById(id);
        // Cogemos el req.body y le sacamos las CLAVES para saber que elementos han actualizado
            const elementUpdate = Object.keys(req.body);
        // Creamos un objeto vacío donde vamos a meter este test
            let test = {};
        // Recorremos las claves del body y rellenamos el objeto test
            elementUpdate.forEach((item) => {
        // Compruebo el valor de las claves del body con los valores del character actualizado
                if (req.body[item] === movieByIdUpdate[item]) {
                test[item] = true;
                } else {
                test[item] = false;
                }
            });

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
                .json({ dataTest: test, update: movieByIdUpdate
                });
            }

            } catch (error) {
                return res.status(409).json({
                error: "No se ha podidio actualizar",
                message: error.message,
            });
            }

            } else {
            // si la movie con ese id no existe
            return res.status(404).json("La película no ha sido encontrada");
      }
    } catch (error) {
      return res
        .status(409).json({ 
        error: "No se ha podidio actualizar", 
        message: error.message 
    });
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

//!--------------------------------------------------------------------------
//?------------------- DELETE------------------------------------------------
//!--------------------------------------------------------------------------

//Debemos borrar la movie cuyo ID se trae por params 
//para no tener inconsistencias de datos, hay que borrar el registro del id en los campos donde aparece
//Creamos la función asincrona, como siempre, además de la lógica de try y catch 

const deleteMovie = async (req, res, next) => {
    try {
    // Buscamos el id en los params
        const { id } = req.params;
    // Buscamos y borramos la movie
        const movie = await Movie.findByIdAndDelete(id);

        if(movie) {
        // Si existe la movie --> borramos los registros donde aparece
        // Se debe comprobar si la movie ha sido borrada
        const movieDelete = await Movie.findById(id);
    //? Borramos los registros de movie en los arrays de movie donde aparece:
        try {
            await Movie.updateMany(
            { movie: id },
            { $pull: { movies: id } }
            );

// Lanzamos una respuesta dependiendo de si se ha encontrado la movie borrada
        return res.status(movieDelete ? 409 : 200).json({deleteTest: movieDelete ? false : true,
        });
        
    } catch (error) {
        return res.status(409).json({error: "Error al borrar la movie", message: error.message,});
    }
    } else {
      // lanzamos una respuesta 404 que la movie no ha sido encontrada
        return res.status(404).json("La película no ha sido encontrada");
    }
    } catch (error) {
        return res.status(409).json({
        error: "Error al borrar la película", 
        message: error.message,
    });
  }
};


//? Guardamos y exportamos las funciones creadas

module.exports = { createMovie, toggleCharacters, getAll, getById, getByName, update, deleteMovie };