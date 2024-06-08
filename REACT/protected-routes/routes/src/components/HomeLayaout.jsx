//Hacemos las importaciones correspondientes, traemos el contexto con el customHook
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
    //queremos comprobar que exista el usuario
  const { user } = useAuth();
  const outlet = useOutlet();
//si existe le redirigimos al profile
  if (user) {
    return <Navigate to='/dashboard/profile' replace />;
  }
// especificamos las props para indicar a donde se debe redirigir
  return (
    <div>
      <AppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" },
          { label: "Sign Up", path: "/register" },
        ]}
      />
      {outlet}
    </div>
  );
};
