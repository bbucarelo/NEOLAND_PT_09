//Realizamos las importaciones respectivas tanto para la navegación como para acceder al contexto de autenticación
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../hooks/useAuth"; 


// Definimos el componente AppBar, que recibe una prop llamada pages.
export const AppBar = ({ pages }) => {
  const navigate = useNavigate(); // Obtenemos la función navigate usando el hook useNavigate.
  //Usamos nuestro customHook
  const { user, logout } = useAuth(); 

  // Definimos una función para manejar la navegación a una ruta específica.
  const handleNavigate = (path) => {
    if (path) {
      // Si la ruta está definida,
      navigate(path); // navegamos a esa ruta
    }
  };

  return (
    // JSX que define la barra de navegación
    <nav>
      <span>React Router Auth</span>{" "}
      {/* Texto que se muestra en la barra de navegación */}
      {/* Iteramos sobre el array pages para crear un botón por cada página */}
      {pages?.map((page) => (
        <button key={page.label} onClick={() => handleNavigate(page.path)}>
          {page.label}{" "}
          {/* Etiqueta del botón, que corresponde a la label de la página */}
        </button>
      ))}
      {/* Si el usuario está autenticado, mostramos el botón de logout */}
      {!!user && (
        <button key={"logout"} onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};