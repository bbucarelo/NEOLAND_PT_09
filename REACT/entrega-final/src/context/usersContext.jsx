import { createContext, useState, useEffect } from "react";
import axios from "axios";

//Contexto de usuarios
export const UsersContext = createContext();

//Provider de usuarios
export const UsersProvider = ({ children }) => {
  //Estado de usuarios
  const [users, setUsers] = useState([]);
  
    //useEffect para obtener los usuarios mediante una petición GET a la API
    useEffect(() => {
        
        const getUsers = async () => {
            try {
                //AXIOS: Librería para hacer peticiones HTTP desde el navegador
                const response = await axios.get("http://localhost:8081/api/v1/user/getAll");
                //Actualizamos el estado de los usuarios
                setUsers(response.data);
            } catch (error) {
                //Manejamos el error
                console.error("error al obtener los usuarios", error);
            }
        }
        //Llamamos a la función getUsers para obtener los usuarios
        getUsers();
    }, []);

    return (
        //Devolvemos el provider con el valor de los usuarios obtenidos
        <UsersContext.Provider value={users}>
            {children}
        </UsersContext.Provider>
    );
};