import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ProjectsContext = createContext();

const projectsReducer = (state, action) => {
    switch (action.type) {
        case "GET_PROJECTS":
            return action.payload;
        case "ADD_PROJECT":
            return [...state, action.payload];
        case "UPDATE_PROJECT":
            return state.map(project => project._id === action.payload._id ? action.payload : project);
        case "DELETE_PROJECT":
            return state.filter(project => project._id !== action.payload);
        default:
            return state;
    }
};

export const ProjectsProvider = ({ children }) => {
    const [projects, dispatch] = useReducer(projectsReducer, []);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/v1/projects/getAll");
                dispatch({ type: "GET_PROJECTS", payload: response.data });
            } catch (error) {
                console.error("Error al obtener los proyectos", error);
            }
        };
        getProjects();
    }, []);

    const addProject = async (project) => {
        try {
            const response = await axios.post("http://localhost:8081/api/v1/projects/create", project);
            dispatch({ type: "ADD_PROJECT", payload: response.data });
        } catch (error) {
            console.error("Error al crear el proyecto", error);
        }
    };

    const updateProject = async (id, project) => {
        try {
            console.log("Updating project:", id, project);
            const response = await axios.patch(`http://localhost:8081/api/v1/projects/update/${id}`, project);
            dispatch({ type: "UPDATE_PROJECT", payload: response.data });
        } catch (error) {
            console.error("Error al actualizar el proyecto", error);
            throw error;
        }
    };

    const deleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/v1/projects/delete/${id}`);
            dispatch({ type: "DELETE_PROJECT", payload: id });
        } catch (error) {
            console.error("Error al eliminar el proyecto", error);
        }
    };

    return (
        <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
            {children}
        </ProjectsContext.Provider>
    );
};
