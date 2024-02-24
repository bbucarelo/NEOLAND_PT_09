//?---------------------Importación de controladores-------------------------------

const { isAuthAdmin, isAuthGerente } = require("../../middleware/auth.middleware");


//?---------------------Router especifico de Project--------------------------------

const express = require("express");
const { createProject, getAll, getById, getByName, getByLocation, updateProject, deleteProject } = require("../controllers/Projects.controller");
const ProjectsRoutes = express.Router();

//?---------------------------------Rutas simples-----------------------------------

ProjectsRoutes.get("/getAll/", getAll);
ProjectsRoutes.get("/getById/:id", getById);
ProjectsRoutes.get("/getByName/:name", getByName);
ProjectsRoutes.get("/getByLocation/:location", getByLocation);


//?---------------------------------Rutas Autenticadas------------------------------

ProjectsRoutes.post("/create", [isAuthAdmin] ,createProject);
ProjectsRoutes.patch("/update/:id", [isAuthAdmin], updateProject); 
ProjectsRoutes.delete("/delete/:id", [isAuthAdmin], deleteProject); 


//?-------------------------------------Exportamos-----------------------------------

module.exports = ProjectsRoutes;