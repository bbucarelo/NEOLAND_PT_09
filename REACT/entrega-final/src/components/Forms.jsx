//Aqui traer el contenido de projectpage 

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import axios from "axios";

export const ProjectsPage = () => {
    const { user, logout } = useAuth();
    const [project, setProject] = useState({
        name: "",
        projectDescription: "",
        starDate: "",
        finishDate: "",
        estatus: "",
        clients: "",
        workVertical: "",
        user: [],
        division: [],
    });

    //Traemos el usuario y los proyectos
    const users = useUser();
    

    // Usamos useEffect pra buscar el proyecto por id y añadirle un usuario 
    
        const findingUser = async () => {
            const findUser = users.find((user) => user.email === user.email);
                if (findUser) {
                    setProject({ ...project, user: findUser });
                } else {
                    console.error("No se encontró el usuario");
                }
    }
    
        if (user.length > 0) {
            findingUser();
        }
    

 
    //Función para manejar los inputs
    const handleInput = (ev) => {
        const { name, value } = ev.target;
        setProject({ ...project, [name]: value });
    };

    //Función para manejar el submit
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/api/v1/projects/create", project);
            console.log("Proyecto registrado", response.data);
           
            //! Añadir un modal para mostrar el mensaje de proyecto registrado
            setProject({
                name: "",
                projectDescription: "",
                starDate: "",
                finishDate: "",
                estatus: "",
                clients: "",
                workVertical: "",
                user: [],
                division: [],
            });
            //! Crear una notificación de proyecto registrado
        } catch (error) {
            console.error("error al registrar el proyecto", error);
        }
    };

    return (
        <div>
            <h1>Projects</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={project.name}
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="projectDescription">
                    <input
                        type="text"
                        name="projectDescription"
                        id="projectDescription"
                        required
                        value={project.projectDescription}
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="starDate">
                    <input
                        type="date"
                        name="starDate"
                        id="starDate"
                        required
                        value={project.starDate}
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="finishDate">
                    <input
                        type="date"
                        name="finishDate"
                        id="finishDate"
                        required
                        value={project.finishDate}
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="estatus">
                    <input
                        type="text"
                        name="estatus"
                        id="estatus"
                        required
                        value={project.estatus}
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="clients">
                    <input
                        type="text"
                        name="clients"
                        id="clients"
                        required
                        value={project.clients}
                        onChange={handleInput}
                    />
                </label>
                <label htmlFor="workVertical">
                    <input
                        type="text"
                        name="workVertical"
                        id="workVertical"
                        required
                        value={project.workVertical}
                        onChange={handleInput}
                    />
                </label>
                <button type="submit">Create Project</button>
                <button onClick={logout}>Logout</button>
            </form>
        </div>
    );
}

