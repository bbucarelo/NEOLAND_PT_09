//?----------- Hacer importaciones externas----------------------------

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

//?--Traemos la función de conexión a la DB-- Ejecutamos (archivo interno)--

const { connect } = require("./src/utils/db");

//ejecutamos la función
connect(); 

//? -----------Traemos las variables de entorno-------------------------

const PORT  = process.env.PORT;

//? -----------Creamos servidor web------------------------------------

    const app = express();

//? -----------Escuchamos en el puerto al servidor---------------------

    app.listen(PORT, () =>{
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
    });