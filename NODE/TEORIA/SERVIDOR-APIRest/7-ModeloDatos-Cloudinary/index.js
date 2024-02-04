//? --------IMPORTACIONES--------------------------------------------

const dotenv = require("dotenv");

dotenv.config();

const express = require("express");

//?------Traemos cloudinary para poder usarla------------------------

const {configCloudinary} = require("./src/middleware/files.middleware")
//Para que se pueda usar se debe ejecutar 
configCloudinary();

//?-------Conectamos con Base de datos-------------------------------
const { connect } = require("./src/utils/db");

connect();

//?------------Variables de entorno----------------------------------

const PORT = process.env.PORT;

//?------------Creamos el servidor web--------------------------------
const app = express();

//?------------Limitaciones-------------------------------------------

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//!------------Rutas--------------------------------------------------

const CharacterRouter = require("./src/api/routes/Character.routes");
app.use("/api/v1/character", CharacterRouter);

//?--------Cuando no encuentre la ruta que genere un error-----------

app.use("*", (req, res, next) => { //Cuando se pone * es para que contemple todo y cuando la ruta no está definida
    const error = new Error("Route not found");
    error.status = 404;
    return next(error);
})

//?--------Cuando hay un error en el servidor (crash)----------------

app.use((error, req, res) => {
    return res.status(error.status || 500).json(error.message || "Error inesperado");
});

//Revela la tecnología con la que está realizada el back:
app.disabled("x-powered-by");

//Escuchador del puerto:
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});

