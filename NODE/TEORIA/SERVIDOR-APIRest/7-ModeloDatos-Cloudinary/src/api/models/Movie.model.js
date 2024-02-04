const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        year: {type: Number, require: true},
        characters: [{type: mongoose.Types.ObjectId, ref:"Character"}]
    },

    {
        timestamps: true,
    }
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie; 