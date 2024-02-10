const { createMovie, toggleCharacters, getAll, getById, getByName, update, deleteMovie } = require("../controllers/Movie.controller");


//!------------------------RUTAS------------------------------------------------
const express = require("express");

//? A partir de acá introduzco todas las rutas creadas para movie
//?Como he traido a express puedo disponer de las rutas que luego llamaré en el index

const MovieRouter = require("express").Router();


MovieRouter.post("/create", createMovie);
MovieRouter.patch("/toggle/:id", toggleCharacters);
MovieRouter.get("/getAll", getAll);
MovieRouter.get("/getById/:id", getById);
MovieRouter.get("/getByName/:name", getByName);
MovieRouter.patch("/update/:id", update);
MovieRouter.delete("/delete/:id", deleteMovie);


// Función general que exporta todo lo contenido arriba 
module.exports = MovieRouter;