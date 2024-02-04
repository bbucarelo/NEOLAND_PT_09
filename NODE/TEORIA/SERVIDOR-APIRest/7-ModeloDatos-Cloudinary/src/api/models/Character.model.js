//?------------Se trae mongoose--------------------------------

const mongoose = require("mongoose");

//?------------Traemos de mongoose los schemas de datos---------

const Schema = mongoose.Schema;

//?------------Se crea el modelo de datos-----------------------
//Se pone a cada clave su tipo de dato
//Se define propiedades que limitan la info que se puede incluir en las clases
// * Define si es obligatoria, logitud maxima, minima, otros

const CharacterSchema = new Schema( 
    {
        name: {type: String, required: false, unique: false}, //Unique si es único o no
        gender: {
            type: String, enum: ["hombre", "mujer", "otro"], required: false
        },
        image: { type: String, required: false},
        //Array de object id que hace referencia al modelo movie (hacer una relación de la movie y el id)
        movies: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}],
    },

//Para que salga la fecha de creación
{
    timestamps: true,
}
);


//?--- Con la definición de datos y esquema hecha, procedemos a definir el Modelo Character

const Character = mongoose.model("Character", CharacterSchema);

//?----------------------- Se exporta el modulo-------------------------------------------------
module.exports = Character; //Al ser único lo podemos definir sin llaves, sino se usa con llaves