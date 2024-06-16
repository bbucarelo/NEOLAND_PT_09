import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const NewAppBar2 = ({pages}) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        if (path) {
            navigate(path);
        }
    }
    //retornamos el componente y le indicamos que si existe el usuario muestre el boton de logout
    return (
        <nav>
        <span> Navegación </span>{" "}
        {pages.map((page) => (
            <button key={page.path} onClick={() => handleNavigate(page.path)}>
            {page.label}
            </button>
        ))}
        {!!user && (
            <button onClick={logout}>
                Logout
            </button>
        )}
        </nav>
    );
}