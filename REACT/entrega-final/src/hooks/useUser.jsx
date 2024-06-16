
import { useContext } from "react";
import { UsersContext } from "../context/usersContext";


//Customhook para usar el context
export const useUser = () => {
    return useContext(UsersContext);
}