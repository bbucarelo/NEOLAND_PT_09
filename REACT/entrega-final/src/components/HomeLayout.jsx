
//Hacemos las importaciones correspondientes, traemos el contexto con el customHook
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";
import Footer from "./Footer";


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
        <Header onDrawerToggle={() => {}}
            pages={[
                { path: "/", label: "Inicio" },
                {path: "/login", label: "Inicia Sesión" }, 
                { path: "/register", label: "Registrate" },
                
            ]}
        />
        {outlet}
        <Footer />
    </div>
  );
};

export default HomeLayout;