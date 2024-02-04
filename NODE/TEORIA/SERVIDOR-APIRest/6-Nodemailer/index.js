//?----------Importaciones---------------------------------

const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

//? ---------Traemos variables de entorno------------------

const PORT = process.env.PORT;

//? ---------Configuramos servidor web---------------------

const app = express();

//? ---------Configuramos router---------------------------

const router = express.Router();

// Se define la función que gestiona el endpoint

router.get("/sendNewMail", (req, res, next) => {
    // traemos variables de entorno para enviar email
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;
    // Funcion transporter que nos da nodemailer y debemos poner una serie de parámetros, que siempre serán las definidas debajo
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },
    });

// Creamos las opciones del mensaje

    const mailOptions = {
        from: EMAIL,
        to: "b.bucarelo@gmail.com",
        subject: "Mensaje de confirmación",
        text: "Todo ok 👁️👄👁️",
    };

    // Enviamos el mail

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return next(error); // Next notifica si hay un error pero continua la ejecución
        } else {
            res.status(200).json(`Email send, ${info.response}`);
        }
    });
});

app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto: https://localhost:${PORT}`);
});
