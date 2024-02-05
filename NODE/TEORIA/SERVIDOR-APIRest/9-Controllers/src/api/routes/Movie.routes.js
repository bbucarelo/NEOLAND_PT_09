const { createMovie, toggleCharacters } = require("../controllers/Movie.controller");


const MovieRouter = require("express").Router();

//!------------RUTAS------------------------------------------------
MovieRouter.post("/create", createMovie);
MovieRouter.patch("/toggle/:id", toggleCharacters);

// Función general que exporta todo lo contenido arriba 
module.exports = MovieRouter;