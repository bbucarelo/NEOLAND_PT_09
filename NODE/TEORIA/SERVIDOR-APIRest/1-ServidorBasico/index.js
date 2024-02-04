//! Pasos para crear un servidor básico: 

// Requerir el protocolo HTTP con node

    const http = require("http");

// Crear el servidor web en el protocolo

    const app = http.createServer((req, res) => {

// Configurar la respuesta del servidor

    res.statusCode = 200; // Status: OK

    res.setHeader("Content-type", "text/html");

    res.end("<h1>Buenos dias</h1>");
});

// Asignar el puerto en el cual se escuchará el servidor

    app.listen(8080, () => {
        console.log("Conectado al puerto 8080 en http://localhost:8080");
    });