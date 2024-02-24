
//?------------------Traemos los modelos-------------------------------------
const User = require("../models/User.model");
const Projects = require("../models/Projects.model");
const Division = require("../models/Division.model");
const Comment = require("../models/Comment.model");
const enumOk = require("../../utils/enumOk");

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- POST - CREATE -------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const createProject = async (req, res, next) => {

    try {
        await Projects.syncIndexes();
        // Creamos nueva instancia de Project
        const newProject = new Projects(req.body);
        //Se guarda el registro en la DB
        const saveProject = await newProject.save();
        //Si existe se ha guardado de forma correcta
            if(saveProject) {
                return res.status(200).json(saveProject);
            } else {
                //Si no existe es que no se ha guardado
                return res.status(409).json("No se ha podido crear el proyecto");
            }
    } catch (error) {
        return res.status(409).json({
            error: "Error en la creación del nuevo proyecto",
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
    const allProjects = await Projects.find();
        if (allProjects.length > 0) {
        // Si hay registros lanzamos una respuesta correcta
            return res.status(200).json(allProjects);
        } else {
        // si no hay registros lanzamos una respuesta 404
            return res.status(404).json("No se han encontrado los proyectos");
        }
    } catch (error) {
      // Captura del error
      return res
        .status(409).json({ error: "Error al buscar proyectos", message: error.message });
    }
  };

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- GET - GET by ID -----------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getById = async (req, res, next) => {
    try {
    // Hacemos destructuring del id traido por params
    const { id } = req.params;
  
    // Encontramos el proyecto que tenga ese ID
    const projectsById = await Projects.findById(id).populate("division"); //Populate
  
    // Comprobamos si se ha encontrado el proyecto
        if (projectsById) {
            return res.status(200).json(projectsById);
        } else {
            return res.status(404).json("No se ha encontrado el proyecto");
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
  
    // Buscamos el proyecto que coincida en el name
    const projectsByName = await Projects.find({ name });
      //console.log(projectsByName);
  
    if (projectsByName.length > 0) {
        return res.status(200).json(projectsByName);
    } else {
        return res.status(404).json("No se han encontrado proyectos con ese nombre");
    }
    } catch (error) {
        return res
        .status(409)
        .json({ error: "Error al ejecutar la búsqueda", message: error.message });
    }
  };

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- GET - GET by LOCATION -----------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getByLocation = async (req, res, next) => {
    try {
    // Hacemos destructuring del name traido por params
    const { location } = req.params;
  
    // Buscamos el proyecto que coincida en el name
    const projectsByLocation = await Projects.find({ location });
      //console.log(projectsByLocation);
  
    if (projectsByLocation.length > 0) {
        return res.status(200).json(projectsByLocation);
    } else {
        return res.status(404).json("No se han encontrado proyectos con esa ubicación");
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

const updateProject = async (req, res, next) => {

    try {
        await Projects.syncIndexes();

        const { id } = req.params;
        //Buscamos el proyecto
        const projectsById = await Projects.findById(id);
        if (projectsById) {
            
            const bodyCustom = {
                _id: projectsById._id,
                location: projectsById.location,
                clients: projectsById.clients,
                workVertical: projectsById.workVertical, //Solo se pueden actualizar las claves de debajo 
                name: req.body?.name ? req.body?.name : projectsById.name,
                projectDescription: req.body?.projectDescription ? req.body?.projectDescription : projectsById.projectDescription,
                projectOwner: req.body?.projectOwner ? req.body?.projectOwner : projectsById.projectOwner,
                status: req.body?.status ? req.body?.status : projectsById.status
            };

            if (req.body?.gender) {
                // Si lo recibimos llamamos a la función de utils que valida el genero
                const resultEnumOk = enumOk(req.body?.gender);
                bodyCustom.gender = resultEnumOk.check
                  ? req.body?.gender
                  : characterById.gender;
            }

        try {
            await Projects.findByIdAndUpdate(id, bodyCustom);
        //!------------------TEST---------------------------------------------------------------------
            const projectsByIdUpdate = await Projects.findById(id);
            const elementUpdate = Object.keys(req.body);
            let test = {};
            
            elementUpdate.forEach((item) => {
                
                if (req.body[item] == projectsByIdUpdate[item]) {
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
                            error:"Solo se pueden actualizar los campos de: name, projectDescription, projectOwner, status. Para cualquier otra actualización contacte con su Jefe Superior."});
                } else {
                    return res
                    .status(200)
                    .json({ update: projectsByIdUpdate });
            }
        } catch (error) {
            return res.status(409).json({
              error: "No se ha podidio actualizar",
              message: error.message,
            });
        }
        } else {
        // si el proyecto con ese id no existe
        return res.status(404).json("El proyecto no ha sido encontrado");
        }
    } catch (error) {
        return res
        .status(409)
        .json({ error: "No se ha podidio actualizar", message: error.message });   
    }
};

//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//?----------------------------------------------------------- DELETE - AUTH -------------------------------------------------------------------------------------------
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------------

const deleteProject = async (req, res, next) => {

    try {
        const { id } = req.params;
        // Buscamos el proyecto
        const projects = await Projects.findByIdAndDelete(id);
            if (projects) {
                const projectDelete = await Projects.findById(id);
                try { //Actualizamos las divisiones y usuarios que tengan el proyecto borrado
                    await Division.updateMany(
                        { projects: id },
                        { $pull: { projects: id } } 
                    )
                    await User.updateMany(
                        { user: id },
                        { $pull: { project: id }}
                    );
                    return res.status(projectDelete ? 409 : 200).json({
                        deleteTest: projectDelete ? false : true }); 
                } catch (error) {
                    return res.status(409).json({
                    error: "Error al borrar el proyecto",
                    message: error.message,
                });
                }
            } else {
                return res.status(409).json({
                error: "Error al encontrar el proyecto",
                message: error.message,
                });    
            }
    } catch (error) {
        return res.status(409).json({
            error: "Error al borrar el proyecto",
            message: error.message,
          });    
    }
};




//?-------------------Exportamos funciones--------------------------
module.exports = {createProject, getAll, getById, getByName, getByLocation, updateProject, deleteProject};