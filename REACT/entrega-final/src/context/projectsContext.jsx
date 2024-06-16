import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ProjectsContext = createContext();

//Provider de proyectos con useReducer
const projectsReducer = (state, action) => {
    // Configuramos el reducer para los proyectos
    switch (action.type) {
        case "GET_PROJECTS":
            return action.payload;
        default:
            return state;
    }
};

//Provider de proyectos
export const ProjectsProvider = ({ children }) => {
    const [projects, dispatch] = useReducer(projectsReducer, []);
    //useEffect para obtener los proyectos mediante una petición GET a la API
    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/v1/projects/getAll");
                //Dispatch para actualizar el estado de los proyectos
                dispatch({ type: "GET_PROJECTS", payload: response.data });
            } catch (error) {
                console.error("error al obtener los proyectos", error);
            }
        };
        //Llamamos a la función getProjects para obtener los proyectos
        getProjects();
        //el array vacío indica que se ejecutará una sola vez
    }, []);
    return (
        //Devolvemos el provider con el valor de los proyectos obtenidos
        <ProjectsContext.Provider value={projects}>
            {children}
        </ProjectsContext.Provider>
    );
}

