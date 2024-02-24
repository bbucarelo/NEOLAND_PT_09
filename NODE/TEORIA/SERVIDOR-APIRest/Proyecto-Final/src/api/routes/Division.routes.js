//?---------------------Importación de controladores-------------------------------

const { isAuthAdmin, isAuthGerente } = require("../../middleware/auth.middleware");

//?---------------------Router especifico de Division--------------------------------

const express = require("express");
const { createDivision, getAll, getById, getByName, getByWorkVertical, updateDivision, deleteDivision } = require("../controllers/Division.controller");
const DivisionRoutes = express.Router();

//?---------------------------------Rutas simples-----------------------------------

DivisionRoutes.get("/getAll/", getAll);
DivisionRoutes.get("/getById/:id", getById);
DivisionRoutes.get("/getByName/:name", getByName);
DivisionRoutes.get("/getByVertical/:workVertical", getByWorkVertical);




//?---------------------------------Rutas Autenticadas------------------------------

DivisionRoutes.post("/create", [isAuthAdmin] , createDivision);
DivisionRoutes.patch("/update/:id", [isAuthGerente], updateDivision);
DivisionRoutes.delete("/delete/:id", [isAuthGerente], deleteDivision);




//?-------------------------------------Exportamos-----------------------------------

module.exports = DivisionRoutes;