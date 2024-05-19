//Ejercicio:
// Utilizando useContext y useReducer cread una gestión de tareas, donde se pueda añadir una tarea a un estado global utilizando el context.
// La modificación tendrá que ser mediante una función reductora
// Deberéis definir un componente donde se consuma la informacion del context y se use la funcion reductora.

//? Paso 1: Se crea un contexto para las tareas 
import { createContext, useContext, useReducer } from "react";

const TareasContext = createContext(); //! Usar mayúsculas para los contextos
// TareasContext: contexto que hemos creado y que usaremos para proporcionar y consumir el estado de las tareas en nuestra aplicación
// createContext: función que se utiliza para crear un contexto, este, proporciona una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel

//? Paso 2: Definir una función reductora que añade nuevas tareas

const tareasReducer = (state, action) => {
  //tareasReducer: función reductora que toma el estado actual y una acción, y devuelve un nuevo estado basado en el tipo de acción
  //state: representa el estado actual de la tarea
  //action: objeto que describe el tipo de cambio que se desea realizar en el estado. Usualmente tiene 2 propiedades "type" y "payload".
  //type: Un string que indica el tipo de acción a realizar
  //payload: Propiedad opcional de un objeto con los datos necesarios para realizar la acción (en este caso, la nueva tarea a añadir) y se usa para actualizar el estado
  switch (action.type) {
    // switch: declaración de control de flujo que evalúa la propiedad type del objeto action y ejecuta el bloque de código correspondiente basado en su valor.
    case "add": // tipo de acción add, se devuelve un nuevo array que incluye todas las tareas anteriores más la nueva tarea (action.payload). Se ejecuta cuando action.type es igual a "add".
      return [...state, action.payload]; // Aquí, estamos devolviendo un nuevo estado. Este nuevo estado es una copia del estado actual (...state) con spread operator, con la nueva tarea (action.payload) añadida al final del array.
      default: // Este bloque se ejecuta si action.type no coincide con ninguno de los casos especificados.
        return state; // devolvemos el estado actual sin realizar ningún cambio. Esto asegura que, si se recibe una acción desconocida, el estado no se modifica.
  }
};

//? Paso 3: Crear el provider que contendrá el estado y la función reductora

const TareasProvider = ({ children }) => { 
  //TareasProvider: componente proveedor que envuelve la parte de la aplicación que necesita acceso al estado de las tareas
  //children: se recibe children como una prop. Representa cualquier contenido que sea pasado dentro de TareasProvider cuando se usa en el árbol de componentes
  const [tareas, dispatch] = useReducer(tareasReducer, []);
    //tareas: Es el estado actual de las tareas. Al inicio, es un array vacío []
    //dispatch: Es una función que se usa para enviar acciones a la función reductora. Llama a tareasReducer con el estado actual y la acción y actualiza el estado basado en el resultado
    //useReducer: hook de manejo de estados complejos en componentes
    //tareasReducer: Es la función reductora que define cómo se actualiza el estado de las tareas.
    return (
    <TareasContext.Provider value={{tareas, dispatch}}>
      {/* TareasContext.Provider>: Es el componente Provider del contexto que hemos creado (TareasContext). Todo lo que esté envuelto por este Provider tendrá acceso a los valores que proporciona. */}
      {/* value={{ tareas, dispatch }}: Aquí estamos proporcionando un objeto como valor del contexto. */}
      {/* tareas: Estado actual y dispatch: función para despachar acciones y actualizar el estado */}
      {children}
      {/* children: Cualquier componente hijo que esté dentro de TareasProvider en el árbol de componentes.*/}
    </TareasContext.Provider>
    );
};

//? Paso 4: AddTareas permite añadir nuevas tareas utilizando el método dispatch del contexto

const AddTareas = () => {
  const { dispatch } = useContext(TareasContext);
  // dispatch: Se obtiene del contexto TareasContext y se usa para despachar acciones que modifican el estado.
  // useContext: hook que permite consumir el valor del contexto

  const addToTareas = () => dispatch({ type: "add", payload: "Nueva Tarea"});
    // addToTareas: función que despacha una acción de tipo "add" con el valor de newTask como payload, añadiendo así una nueva tarea al estado global
    return <button onClick={ () => addToTareas()}>Add Tareas</button>;
    // botón que al hacer clic llama a addToTareas para añadir la nueva tarea
};

//? Paso 5: ListaTareas muestra las tareas

const ListaTareas = () => {
  const { tareas } = useContext(TareasContext);
  // tareas: Se obtiene del contexto TareasContext y representa la lista de tareas
  // useContext: se utiliza para acceder al estado del contexto
    return (
      <ul>
        {tareas.map((tarea, index) => (
          // Itera sobre el array de tareas y crea un elemento de lista (<li>) para cada tarea
          <li key={index}>{tarea}</li>
          // key={index}: Atributo especial que React utiliza para identificar qué ítems han cambiado, se han añadido o se han eliminado en una lista
          // {tarea}: contenido de la tarea que se va a mostrar
        ))}
      </ul>
    );

};

function App() {
  return ( //return: describe lo que se va a renderizar en la pantalla
    <TareasProvider>
      <AddTareas/>
      <ListaTareas/>
    </TareasProvider>
  );  
  //TareasProvider: componente proveedor de contexto que envuelve los componentes hijos AddTareas y ListaTareas. 
  //Proporciona el estado de las tareas y las funciones para despachar acciones a estos componentes hijos.
}

export default App;

