//?------------------------Requerimientos--------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// Definición del modelo de datos: 
const CommentSchema = new Schema(
  {
    // User que crea el comentario
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Array de ids de user que les gusta el comentario
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // Id del character al que va dirigido el comentario
    recipientCharacter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
    // Id del movie al que va dirigido el comentario
    recipientMovie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    // Id del user al que va dirigido el comentario
    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
},
    //Añadimos timestamps para que salga la fecha de creación
    {
        timestamps: true,
    }
);

// Creación del modelo 
const Comment = mongoose.model("Comment", CommentSchema);

//?-------------------Exportamos función modelo--------------------------
module.exports = Comment;