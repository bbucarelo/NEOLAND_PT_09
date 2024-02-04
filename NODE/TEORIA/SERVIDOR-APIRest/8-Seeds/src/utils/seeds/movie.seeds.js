//?---------------Datos a insertar de forma masiva---------------------------------------------------------

const moviesDataSet = [
    {
      title: "The Batman",
      poster:
        "https://xl.movieposterdb.com/22_02/2022/1877830/xl_1877830_764432ad.jpg?v=2023-02-19%2023:41:01",
      year: 2022,
      released: true,
    },
    {
      title: "Dune",
      poster:
        "https://xl.movieposterdb.com/21_08/2021/1160419/xl_1160419_565d3d10.jpg?v=2023-01-06%2017:55:10",
      year: 2022,
      released: true,
    },
    {
      title: "Jaws",
      poster:
        "https://xl.movieposterdb.com/08_01/1975/73195/xl_73195_04c15a8a.jpg?v=2023-02-25%2009:28:24",
      year: 1975,
      released: false,
    },
  ];

//?------------------Hacer las importaciones respectivas-----------------------------------------------------

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("../../api/models/MOVIE.model");
dotenv.config();


//?------------------Creamos la función de la semilla--------------------------------------------------------
// Primero debemos traer la mongouri que será usada posteriormente
const MONGO_URI = process.env.MONGO_URI;
const createSeed = () => {
    //Conectamos a la mongouri mediante mongoose.connect
    mongoose.connect(MONGO_URI, {
        //Debemos traer las opciones 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(async () => {
        //Se buscará si hay algún registro de movie en la DB y si lo hay, se borrará
        //FIND: Encuentra todas las coincidencias y no es igual al de ES6, es propio de mongoose

        const allMovie = await Movie.find()

        //Miramos si hay registros para borrarlos mediante drop() (propiedad de mongoose)
        if(allMovie.length > 0){
            //si hay registros, los eliminamos
            await Movie.collection.drop();
            console.log("Registros borrados de la colección de Movie");
        }
    })
    .catch((error) => console.log("error en la siembra", error.message))
    .then(async() => {
        //Se va a recorrer el array y por cada elemento se creará un nuevo registro de Movie 

        const allMovieModel = moviesDataSet.map((movie) => new Movie(movie))

        //Ahora los insertamos en la DB
        //Método de mongoose para insertas muchos registros = insertMany

        await Movie.insertMany(allMovieModel)

        console.log("Base de datos sembrada 🌱");
    })
    .catch((error) => console.log("Error en el sembrado", error.message))
    .finally(() => { //Esto es para desconectarse de la DB 
        mongoose.disconnect();
    })
};

//? Se debe exportar la función para poder usarla

module.exports = createSeed; //Sin llaves porque es única