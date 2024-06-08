import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Customhook para usar el context
export const useAuth = () => {
    //Simplificación de código
    return useContext(AuthContext)
};