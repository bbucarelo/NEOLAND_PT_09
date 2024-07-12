
//Hacemos las importaciones respectivas
//outlet es la referencia de las rutas anidadas, hacemos las comprobaciones al usuario
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";


const ProtectedLayaout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    //si no hay usuario no puedes acceder a la ruta
    return <Navigate to='/' />;
  }

  //si existe el usuario le redirigimos a la ruta
  return (
    <div>
      <Header onDrawerToggle={() => {}}
        pages={[
          { label: "Configuración", path: "settings" },
          { label: "Perfil", path: "profile" },
          { label: "Proyectos", path: "proyectos" },
          { label: "Divisiones", path: "divisions" },
        ]}
      />
      {outlet}
    </div>
  );
};

export default ProtectedLayaout;
