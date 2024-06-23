//Hacemos las importaciones correspondientes. UseNavigate: redirige al usuario a una nueva página como resultado de alguna acción, como enviar un formulario
import { createContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // 
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";

//Creamos el contexto
    export const AuthContext = createContext(null);

//Definimos el proveedor
    export const AuthProvider = ({children}) => {
        //customHook
        const [user, setUser] = useLocalStorage("user", null);
        const [error, setError] = useState(null);
    
    //Declaramos el navigate
    const navigate = useNavigate();

    //Función login para actualizar el estado del usuario 
       
    const login = async (data) => {
        // Si existe el usuario, lo guardamos en el estado y hacemos la validación con el back
        try { 
            const response = await axios.post("http://localhost:8081/api/v1/user/login", data);
            console.log("Usuario logueado correctamente", response.data);
            setUser(data);
            navigate("/dashboard/profile", { replace: true });
        } catch (error) {
            console.error("error al loguear el usuario", 
                error.response ? error.response.data : error.message);
                setError("Usuario o contraseña incorrectos", error.message);
        }        
    };

    const register = async (data) => {
        //!Aquí igual que en login, añadir la validación de los usuarios
        const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
        registeredUsers.push(data);
        localStorage.setItem('users', JSON.stringify(registeredUsers));
        setUser(data);
        navigate("/dashboard/profile", { replace: true }); 
    };

    //Función logout que limpia el estado del usuario
    const logout = () => {
        // Cambiar el estado del setuser a null
        setUser(null); 
        //navigate para redirigir a home o loginpage
        navigate("/", { replace: true }); 
      };

      

    // useMemo para guardar en memoria los valores del usuario y que no se pidan cada vez
    const value = useMemo(() => ({
        user, 
        login, 
        register,
        logout, 
        error,
        
    }),
    [user] 
    );

    //Devolvemos el provider
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
