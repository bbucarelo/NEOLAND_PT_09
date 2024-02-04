//-- Requerimos express

const express = require("express")

// Creamos la variable con el puerto 

const PORT = 8081; 

// Creamos el servidor

const app = express();

//! ------------------------ROUTING---------------------------------

const router = express.Router()

// Creamos los diferentes endpoints 

router.get("/saludo", (req, res, next) => {
    // envio de respuesta
    res.send("<h1>Buenos días</h1>");
});

router.get("/movies", (req, res, next) => {
    //Mockeamos datos
    const movies = ["Star Wars", "Titanic", "Shreck"];
    //Enviamos la respuesta
    res.send(movies);
});

//? Configuramos el uso del servidor

app.use("/api/v1", router); //Esto es lo que permite usar el servidor 

//Escuchamos el servidor en el puerto correspondiente
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});