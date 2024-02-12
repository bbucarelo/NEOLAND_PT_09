//?------------Importaciones y configuraciones------------------------------

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//?------------Se trae la conexión y se ejecuta a la base de datos----------

const { connect } = require("./src/utils/db");
connect();

//?-----------Configuramos cloudinary---------------------------------------
const {configCloudinary} = require("./src/middleware/files.middleware");
configCloudinary();


//?-----------Creamos el servidor-------------------------------------------
const app = express();

//?-----------Damos las cors al servidor------------------------------------
const cors = require("cors");
app.use(cors());

//?-----------Limitaciones--------------------------------------------------
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({limit: "5mb", extended: false}));

//!-----------Rutas---------------------------------------------------------
const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/user", UserRoutes);


//?-----------Generamos error cuando no se encuentra la ruta----------------

app.use("*", (req, res, next) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    return next(error);
});

//?----------Capturamos el error cuando crashee el servidor------------------

app.use((error, req, res) => {
    return restart.status(error.status|| 500).json(error.message || "error inesperado");
});

//Revelamos la tecnología utilizada
app.disable("x-powered-by");

//?----------Traemos variable de entorno--------------------------------------
//?----------Escuchamos en el puerto al servidor------------------------------

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});



