//?------------Se trae mongoose--------------------------------
const mongoose = require("mongoose");

//?------------Importamos diversas librerías--------------------
const bcrypt = require("bcrypt");
const validator = require("validator");

//?------------Hacemos el schema-------------------------------

const UserSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true, 
            trim: true,
            unique: true, //Para que no haya dos usuarios iguales
        },

        email: {
            type: String,
            required: true,
            trim: true, //No haya espacios
            unique: true,
            validate: [validator.isEmail, "Email no válido"]},

        password: {
            type: String,
            required: true,
            trim: true,
            validate: [validator.isStrongPassword], // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
        },
        gender: {
            type: String,
            enum: ["hombre", "mujer", "otro"],
            required: false},

        rol: {type: String,
            enum: ["empleado", "jefe", "gerente"],
            default: "empleado"},

        confirmationCode: {type: Number},
        check: {type: Boolean, default: false},
        image: {type: String},
        position: {type: String},
        seniority: {type: Date},
        location: {type: String},
        division: {type: mongoose.Schema.Types.ObjectId, ref: "Division"},
        project: [{type: mongoose.Schema.Types.ObjectId, ref: "Projects"}],

    },
    {
        timestamps: true,
    }

);

//!Presave va a encriptar la contraseña 
UserSchema.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10); //No más de 10 para que no demore tanto en generarse el user
        next();
    } catch (error) {
        next("Error en el encriptado de la contraseña", error);
    } 
});


//? Creamos el modelo de nuestro esquema

const User = mongoose.model("User", UserSchema);

//? Exportamos 

module.exports = User;
