//-- Requerimos express

const express = require("express");

//-- Creamos una constante con el puerto a utilizar

const PORT = 8081;

//-- Creamos el servidor

const app = express();

//-- Escuchamos el puerto 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});