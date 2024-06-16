import React from 'react';
import { useState } from 'react';
import { useAuth } from "../hooks/useAuth";

const SettingsPage = () => {
    //Queremos que el usuario pueda cambiar su nombre, su email y su contraseña en esta página
    const { updateUserProfile, changePassword } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    //Función para guardar los cambios en el perfil
    const handleProfileSave = () => {
        updateUserProfile({name, email});
    };

    //Función para cambiar la contraseña
    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        changePassword(currentPassword, newPassword);
        console.log("Contraseña cambiada");
    };

    //Formulario para actualizar los datos del usuario
    return (
       <div>
        <h2>Perfil</h2>
        <label>
            Nombre:
            <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
            />
        </label>
        <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />
        </label>
        <button onClick={handleProfileSave}>Guardar cambios</button>

        <h2>Cambiar contraseña</h2>
        <label>
            Contraseña actual:
            <input
                type="password"
                value={currentPassword}
                onChange={(ev) => setCurrentPassword(ev.target.value)}
            />
        </label>
        <label>
            Nueva contraseña:
            <input
                type="password"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
            />
        </label>
        <label>
            Confirmar contraseña:
            <input
                type="password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
        </label>
        <button onClick={handleChangePassword}>Cambiar contraseña</button>
       </div> 
    );
};

export default SettingsPage;