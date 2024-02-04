const { createMovie } = require("../controllers/Movie.controller");


const MovieRouter = require("express").Router();


MovieRouter.post("/create", createMovie);
module.exports = MovieRouter;