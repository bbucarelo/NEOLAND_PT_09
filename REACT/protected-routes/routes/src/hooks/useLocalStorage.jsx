//Realizamos las importaciones correspondientes
import { useState } from "react";

//?Gestión de la comunicación con el localStorage
//Creamos un hook personalizado
export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        //Trycatch para capturar y manejar los errores que puedan darse en la comunicación
        try {
            // Value contiene el valor existente en Keyname del localstorage
            const value = window.localStorage.getItem(keyName);
            //El valor que trae es un objeto 
            if (value) {
            // Si hay un valor almacenado, lo parseamos de JSON a su forma original
                return JSON.parse(value);
            } else {
                // Si no hay valor almacenado, guardamos el valor por defecto en localStorage
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue; // Devolvemos el valor por defecto.
                }
        } catch (error) {
            // Devolvemos el valor por defecto en caso de error
            return defaultValue;
        }
        });

// Ahora, damos la posibilidad de añadir el nuevo valor
  const setValue = (newValue) => {
        //Trycatch para gestionar errores en caso que existan
        try {
            // Intentamos guardar el nuevo valor en localStorage después de convertirlo a JSON
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (error) {
        // Devolvemos el error por consola
        console.log(error);
        }
        // Actualizamos el estado con el nuevo valor
        setStoredValue(newValue);
        };
        // Se devuelve un array con el valor almacenado y la función para actualizarlo, similar a como useState devuelve un estado y su función de actualización.
        return [storedValue, setValue];
};