//? Requerir protocolo http

const http = require("http")

//? Crear el servidor web

const app = http.createServer((req, res) => {
    // req -> req.url -- es el endpoint de la solicitud
    console.log(req);
    const url = req.url;

    // Configurar el método

    const method = req.method;

    // Dependiendo de la url recibida se va a ejecutar una u otra cosa

    switch (url) {
        case "/saludo":
            res.end("<h1>Saludos, buenos días </h1>");
            break;
        case "/despedida":
            res.end("<h1>Ciao, bambino</h1>");
            break;
        default:
            break;
    }

    if(method === "GET" && url === "/alumnos") getAlumns(res);
});

    const getAlumns = (res) => {

        const alumnos = [
            {
            name: "Jorge",
            age: 20,
            },

            {
            name: "Barbara",
            age: 20,
            },

            {
            name: "Nelson",
            age: 20,
            },
        ];

    const dataString = JSON.stringify(alumnos)

    res.setHeader("Content-type", "application/json");
    res.end(dataString);
    };

    app.listen(8080, () => {
        console.log("Conectado al puerto 8080 en el localhost:8080");
    });