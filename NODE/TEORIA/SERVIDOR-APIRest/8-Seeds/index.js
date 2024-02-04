//?-------------Importaciones y configuraciones---------------------------

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//! Traemos la función de sembrado de semilla-----------------------------

const createSeed = require("./src/utils/seeds/movie.seeds");
createSeed();

//?------------Creación del servidor web----------------------------------

const app = express();

//?------------Limitaciones-----------------------------------------------

app.use(express.json({ limit: "5mb"})); //Si el character está limitado y pesa más, hay que subir el peso del limit
app.use(express.urlencoded({ limit: "5mb", extended: false})); //Esto es para los characteres

//?---Creación de error en caso de no tener una ruta correcta--------------
app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    return next(error);
});

//?--Crear error en caso que el servidor crashee---------------------------
app.use((error, req, res) => {
    return res.status(error.status ||500).json(error.message || "Error inesperado");
});

//?--Revelamos la tecnología con la que estamos realizando el back----------
app.disabled("x-powered-by");

//?------Escuchamos el servidor pero primero llamamos al puerto-------------

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});