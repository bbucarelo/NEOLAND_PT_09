//!----------------Creación del servidor--------------------

const express = require("express");


// Creamos la variable con el puerto 

const PORT = 8081;

// Creamos la variable para poder usar el servidor

const app = express();

//!----------------Hacemos el routing---------------------

const router = express.Router();

const alumns = ["Federico", "Amparo", "Juliana", "Adrian"]; //Simulamos los datos 

//! Creamos los diferentes endpoints (RUTAS)-------PARAMS--

router.get("/buscar/:name", (req, res, next) => {
// Hacemos destructuring de los parametros de la solicitud
    const { name } = req.params;
    console.log(name);
// Creamos contador para sumarlo en uno cuando el nombre que nos llega por params coincida con la BBDD
    let acc = 0;

// Recorremos el array de alumnos 
    alumns.forEach((alumno) => {
    // Si el nombre recogido de los parámetros coincide con alguno del array se suma uno al contador
        alumno.toLowerCase() === name.toLowerCase() && acc++;
    });

    // Si el acc> 0 se ha encontrado al alumno y la respuesta es correcta
    // Enviamos la respuesta con el estado: estatus y el mensaje que es el json
    return acc > 0 ? res.status(200).json("Se ha encontrado al alumno 🆗") : res.status(404).json("Alumno no encontrado ❌");
});

//! Creamos los diferentes endpoints (RUTAS)------QUERYS--

router.get("queryBuscar", (req, res, next) => {
    //Hacemos destructuring del name que viene de las querys

    const { name, apellido } = req.query;

    console.log("apellido por query", apellido);
    console.log("name por query", name);

    if (name) {
        let acc = 0;

        alumns.forEach((alumn) => {
            alumn.toLowerCase() === name.toLowerCase() && acc++;
    });

    // Controlamos la respuesta
    return acc > 0
    ? res.status(200).json("Se ha encontrado el alumno ✅")
    : res.status(404).json("alumno no existe");
} else {
  // Sino hay nombre, es que no hemos metido ningun nombre en la query
  return res.status(404).json("no ha incluido el nombre en las querys");
}
});

//!-------------------Configuramos uso de routing---------

app.use("/api/v1", router);


//!----------------Escuchamos el servidor en el puerto----

app.listen(PORT, () => {
    console.log(`Server ejecutado en http://localhost:${PORT}`);
});