import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

//!REHACER
const ConfirmationUser = () => {
  //Declaramos el estado del código de confirmación y su función para cambiarlo
  const [confirmationCode, setConfirmationCode] = useState("");
  //Declaramos el navigate para redirigir al usuario
  const navigate = useNavigate();
  


  //Función para confirmar el usuario
  const handleConfirm = async () => {
    //Si el código de confirmación es correcto, confirmamos al usuario
    if (confirmationCode === user.confirmationCode) {
      confirmUser();
      navigate("/dashboard/profile", { replace: true });
    }
  };

  //Retornamos el componente y lo enlazamos al register
  return (
    <div>
      <h1>Confirmation User</h1>
      <input
        type="text"
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <button onClick={handleConfirm}>Confirm</button>
      <link to="/login">{"Inicia Sesión"}</link>
    </div>
  );
};

export default ConfirmationUser;