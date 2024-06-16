import { useContext } from "react";
import { DivisionContext } from "../context/divisionContext";

//Customhook para usar el context
export const useDivision = () => {
    return useContext(DivisionContext);
}
