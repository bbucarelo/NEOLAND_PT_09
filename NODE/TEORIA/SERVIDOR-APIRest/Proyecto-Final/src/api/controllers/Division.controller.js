//?------------------Traemos los modelos-------------------------------------
const User = require("../models/User.model");
const Projects = require("../models/Projects.model");
const Division = require("../models/Division.model");
const Comment = require("../models/Comment.model")

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- POST - CREATE -------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const createDivision = async (req, res, next) => {

    try {
        await Division.syncIndexes();
        // Creamos nueva instancia de la Division
        const newDivision = new Division(req.body);
        //Se guarda el registro en la DB
        const saveDivision = await newDivision.save();
        //Si existe se ha guardado de forma correcta
            if(saveDivision) {
                return res.status(200).json(saveDivision);
            } else {
                //Si no existe es que no se ha guardado
                return res.status(409).json("No se ha podido crear la division");
            }
    } catch (error) {
        return res.status(409).json({
            error: "Error en la creación de la nueva división",
            message: error.message,
          });    
    }

};

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- GET - GET ALL -------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getAll = async (req, res, next) => {
    try {
    // Traemos todos los elementos de la coleccion
    const allDivision = await Division.find();
        if (allDivision.length > 0) {
        // Si hay registros lanzamos una respuesta correcta
            return res.status(200).json(allDivision);
        } else {
        // si no hay registros lanzamos una respuesta 404
            return res.status(404).json("No se han encontrado las divisiones");
        }
    } catch (error) {
      // Captura del error
      return res
        .status(409).json({ error: "Error al buscar las divisiones", message: error.message });
    }
  };
  
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- GET - GET by ID -----------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getById = async (req, res, next) => {
    try {
    // Hacemos destructuring del id traido por params
    const { id } = req.params;
  
    // Encontramos la division que tenga ese ID
    const divisionById = await Division.findById(id).populate("projects"); //Populate
  
    // Comprobamos si se ha encontrado el proyecto
        if (divisionById) {
            return res.status(200).json(divisionById);
        } else {
            return res.status(404).json("No se ha encontrado la división");
      }
    } catch (error) {
        return res
        .status(409)
        .json({ error: "Error al buscar por Id", message: error.message });
    }
  };

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- GET - GET by NAME -----------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getByName = async (req, res, next) => {
    try {
    // Hacemos destructuring del name traido por params
    const { name } = req.params;
  
    // Buscamos la división que coincida en el name
    const divisionByName = await Division.find({ name });
        
    if (divisionByName.length > 0) {
        return res.status(200).json(divisionByName);
    } else {
        return res.status(404).json("No se han encontrado divisiones con ese nombre");
    }
    } catch (error) {
        return res
        .status(409)
        .json({ error: "Error al ejecutar la búsqueda", message: error.message });
    }
  };

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- GET - GET by WORK VERTICAL ------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getByWorkVertical = async (req, res, next) => {
    try {
    // Hacemos destructuring del name traido por params
    const { workVertical } = req.params;
  
    // Buscamos el proyecto que coincida con la vertical
    const divisionByWorkVertical = await Division.find({ workVertical });
        
    if (divisionByWorkVertical.length> 0) {
        return res.status(200).json(divisionByWorkVertical);
    } else {
        return res.status(404).json("No se han encontrado divisiones con esa vertical de trabajo");
    }
    } catch (error) {
        return res
        .status(409)
        .json({ error: "Error al ejecutar la búsqueda", message: error.message });
    }
  };

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- UPDATE - AUTH -------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const updateDivision = async (req, res, next) => { 

    try {
        await Division.syncIndexes();

        const { id } = req.params;
        //Buscamos la division
        const divisionById = await Division.findById(id);
        if (divisionById) {

            const bodyCustom = {
                _id: divisionById._id, 
                workVertical: divisionById.workVertical,
                name: req.body?.name ? req.body?.name : divisionById.name,
                location: req.body?.location ? req.body?.location : divisionById.location,
                headOfDivision: req.body?.headOfDivision ? req.body?.headOfDivision : divisionById.headOfDivision,    
            };

        try {
            await Division.findByIdAndUpdate(id, bodyCustom);
        //!------------------TEST---------------------------------------------------------------------
        const divisionByIdUpdate = await Division.findById(id);
        const elementUpdate = Object.keys(req.body);
            let test = {};
            
            elementUpdate.forEach((item) => {
                
                if (req.body[item] == divisionByIdUpdate[item]) {
                    test[item] = true;
                } else {
                    test[item] = false;
                }
            });
        
            let acc = 0;

            for (const key in test) {
                test[key] == false && acc++;
            }

                if (acc > 0) {
                    return res.status(409).json({ dataTest: test, update: false, 
                            error:"No se puede actualizar el campo de: workVertical."});
                } else {
                    return res
                    .status(200)
                    .json({ update: divisionByIdUpdate });
            }
        } catch (error) {
            return res.status(409).json({
              error: "No se ha podido actualizar",
              message: error.message,
            });
        }
        } else {
        // si la división con ese id no existe
        return res.status(409).json("La división no ha sido encontrada");
        }
    } catch (error) {
        return res
        .status(409)
        .json({ error: "No se ha podido actualizar", message: error.message });   
    }
};

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- DELETE - AUTH -------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const deleteDivision = async (req, res, next) => {

    try {
        const { id } = req.params;
        // Buscamos la division
        const division = await Division.findByIdAndDelete(id);
            if (division) {
                const divisionDelete = await Division.findById(id);
                try { //Actualizamos los proyectos y usuarios que tengan la división borrada
                    await Projects.updateMany(
                        { division: id },
                        { $pull: { division: id } } 
                    )
                    await User.updateMany(
                        { user: id },
                        { $pull: { division: id }}
                    );
                    return res.status(divisionDelete ? 409 : 200).json({
                        deleteTest: divisionDelete ? false : true });
                } catch (error) {
                    return res.status(409).json({
                    error: "Error al borrar la división",
                    message: error.message,
                });
                }
            } else {
                return res.status(409).json({
                error: "Error al encontrar la división",
                message: error.message,
                });    
            }
    } catch (error) {
        return res.status(409).json({
            error: "Error al borrar la división, revise la información suministrada",
            message: error.message,
          });    
    }
};


        
 

//?-------------------Exportamos funciones--------------------------
module.exports = { createDivision, getAll, getById, getByName, getByWorkVertical, updateDivision, deleteDivision };
