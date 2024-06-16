//Hacemos las importaciones respectivas
//outlet es la referencia de las rutas anidadas, hacemos las comprobaciones al usuario
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { NewAppBar2 } from "./NewAppBar2";


const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    //si no hay usuario no puedes acceder a la ruta
    return <Navigate to='/' />;
  }

  //si existe el usuario le redirigimos a la ruta
  return (
    <div>
      <NewAppBar2
        pages={[
          { label: "Settings", path: "settings" },
          { label: "Profile", path: "profile" },
        ]}
      />
      {outlet}
    </div>
  );
};

export default ProtectedLayout;