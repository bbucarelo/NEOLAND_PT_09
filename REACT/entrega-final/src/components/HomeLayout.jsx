//Hacemos las importaciones correspondientes, traemos el contexto con el customHook
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { NewAppBar2 } from "./NewAppBar2";



const HomeLayout = () => {
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
        <NewAppBar2
            pages={[
                { path: "/", label: "Home" },
                {path: "/login", label: "Login" }, 
                { path: "/register", label: "Register" },
                {path: "/confirmationCode", label: "Confirmation Code"},
            ]}
        />
        {outlet}
    </div>
  );
};

export default HomeLayout;