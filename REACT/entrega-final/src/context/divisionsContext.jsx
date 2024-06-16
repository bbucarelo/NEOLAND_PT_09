import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const DivisionsContext = createContext();

//Provider de divisiones con useReducer
const divisionsReducer = (state, action) => {
    // Configuramos el reducer para las divisiones
        switch (action.type) {
            case "GET_DIVISIONS":
                return action.payload;
        default:
            return state;
    }
};

//Provider de divisiones
export const DivisionsProvider = ({ children }) => {
    const [divisions, dispatch] = useReducer(divisionsReducer, []);
    //useEffect para obtener las divisiones mediante una petición GET a la API
    useEffect(() => {
        const getDivisions = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/v1/division/getAll");
                //Dispatch para actualizar el estado de las divisiones
                dispatch({ type: "GET_DIVISIONS", payload: response.data });
            } catch (error) {
                console.error("error al obtener las divisiones", error);
            }
        };
        //Llamamos a la función getDivisions para obtener las divisiones
        getDivisions();
        //el array vacío indica que se ejecutará una sola vez
    }, []);
    return (
        //Devolvemos el provider con el valor de las divisiones obtenidas
        <DivisionsContext.Provider value={divisions}>
            {children}
        </DivisionsContext.Provider>
    );
}