//?---------------------Importación de controladores-------------------------------

const { isAuthAdmin, isAuthGerente } = require("../../middleware/auth.middleware");


//?---------------------Router especifico de Project--------------------------------

const express = require("express");
const { createProject, getAll, getById, getByName, updateProject, deleteProject, 
        toggleUsuarios, getByWorkVertical, toggleDivision } = require("../controllers/Projects.controller");
        
const ProjectsRoutes = express.Router();

//?---------------------------------Rutas simples-----------------------------------

ProjectsRoutes.get("/getAll/", getAll);
ProjectsRoutes.get("/getById/:id", getById);
ProjectsRoutes.get("/getByName/:name", getByName);
ProjectsRoutes.get("/getByVertical/:workVertical", getByWorkVertical );


//?---------------------------------Rutas Autenticadas------------------------------

ProjectsRoutes.post("/create", [isAuthGerente] ,createProject);
ProjectsRoutes.patch("/update/:id", [isAuthAdmin], updateProject); 
ProjectsRoutes.delete("/delete/:id", [isAuthGerente], deleteProject); 
ProjectsRoutes.patch("/toggle/:id", [isAuthAdmin], toggleUsuarios);
ProjectsRoutes.patch("/toggleDiv/:id", [isAuthAdmin], toggleDivision);


//?-------------------------------------Exportamos-----------------------------------

module.exports = ProjectsRoutes;