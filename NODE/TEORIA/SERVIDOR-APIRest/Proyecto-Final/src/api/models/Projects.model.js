//?------------------------Requerimientos--------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// Definición del modelo de datos: 
const ProjectsSchema = new Schema (
    {
        name: {type: String, required: true, unique: true},
        projectDescription: {type: String, required: false},
        startDate: {type: Date, require: false},
        finishDate: {type: Date, require: false},
        estatus: {type: String, enum: ["Planificación", "Desarrollo", "Evaluación", "Control", "Cierre"]},
        clients: {type: String, required: false},
        documentation: {type: String, required: false},
        workVertical: {type: String,
        enum: ["Healthcare", "Production", "Pharma", "Building"]}, 
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        division: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }]
    },

    //Añadimos timestamps para que salga la fecha de creación
    {
        timestamps: true,
    }
);

// Creación del modelo 
const Projects = mongoose.model("Projects", ProjectsSchema);

//?-------------------Exportamos función modelo--------------------------
module.exports = Projects;