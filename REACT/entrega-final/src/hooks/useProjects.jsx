import { useContext } from "react";
import { UsersContext } from "../context/usersContext";

//Customhook para usar el context
export const useProjects = () => {
    return useContext(UsersContext);
}