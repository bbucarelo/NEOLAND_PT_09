import { useState } from "react";


//?Gestión de la comunicación con el localStorage
//Creamos un hook personalizado para manejar el localStorage
export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
        //Try catch para manejar errores
        const value = window.localStorage.getItem(keyName);
        // Si hay valor, lo devolvemos parseado
        if (value) {
          return JSON.parse(value);
        } else {
            //Si no hay valor, devolvemos el valor por defecto
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
            }
        } catch (error) {
            //Si hay un error, devolvemos el valor por defecto en caso de que haya
          return defaultValue;
        }
    });

    //Función para actualizar el valor del localStorage
    const setValue = (newValue) => {
        try {
            //Guardamos el valor en el localStorage después de parsearlo
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (error) {
            //Manejamos el error
            console.error(error);
        }
        //Actualizamos el estado con el nuevo valor
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};