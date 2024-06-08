//Hacemos las importaciones respectivas
//outlet es la referencia de las rutas anidadas, hacemos las comprobaciones al usuario
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    //si no hay usuario no puedes acceder a la ruta
    return <Navigate to='/' />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Settings", path: "settings" },
          { label: "Profile", path: "profile" },
        ]}
      />
      {outlet}
    </div>
  );
};