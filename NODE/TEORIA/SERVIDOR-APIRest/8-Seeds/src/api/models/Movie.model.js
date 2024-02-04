//?-------------Requerimos mongoose-----------------------------------------

    const mongoose = require("mongoose");

    const MovieSchema = new mongoose.Schema(
        {
            title: { type: String},
            poster:{ type: String},
            year: { type: Number},
            released: { type: Boolean}
        },
        {
    timestamps: true,
        }
    );

//Creamos el modelo a partir del esquema anteriormente creado

const Movie = mongoose.model("Movie", MovieSchema);

//Lo exportamos para poder usar este modelo

module.exports = Movie;