//-----Requerimos DB y mongoose para poder hacer la conexion--------------------

const dotenv = require("dotenv");

const mongoose = require("mongoose");

//Usamos dotenv
dotenv.config();

//?---------- Nos traemos MONGO_URI de ENV-------------------------------------

const MONGO_URI = process.env.MONGO_URI;

//?---------- Creamos función que conecta con la base de datos-----------------
//? ESTA FUNCION SIEMPRE SERÁ ASÍ PARA LA CONEXION A LA BBDD-------------------

const connect = async () => {

    //try: intenta hacer algo... y sino lo capturas catch

    try {
        // Conexion con la BBDD
        const db = await mongoose.connect(MONGO_URI, {
            //parsea la url de MONGO
            useNewUrlParser: true,
            //convertir los caracteres especiales
            useUnifiedTopology: true,
        });

        // Hacemos destructuring de nombre y host de la bbdd

        const { name, host } = db.connection;

        console.log(
            `Conectados a la DB con el nombre ${name} en el host: ${host}`);
    } catch (error) {
        console.log("Hay un error en la conexión❌, ", error);
    }
};

module.exports = { connect };