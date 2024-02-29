//?------------------------Requerimientos--------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// Definición del modelo de datos: 
const DivisionSchema = new Schema (
    {
        name: {type: String, required: true, unique: true},
        location: {type: String, required: false}, 
        workVertical: {type: String, required: true,
        enum: ["Healthcare", "Production", "Pharma", "Building"]},
        revenue: {type: Number},
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projects" }],
    },
//Añadimos timestamps para que salga la fecha de creación
    {
    timestamps: true,
    }
);

// Creación del modelo 
const Division = mongoose.model("Division", DivisionSchema);

//?-------------------Exportamos función modelo--------------------------
module.exports = Division;