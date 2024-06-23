import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
    const { login, error } = useAuth();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    // Función para manejar los inputs
    const handleInput = (ev) => {
        const { name, value } = ev.target;
        setUserLogin({ ...userLogin, [name]: value });
    };

    // Función para manejar el submit
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const newErrors = { email: "", password: "" };
        
        // Validaciones del formulario
        if (!userLogin.email) {
            newErrors.email = "El email es obligatorio";
        }

        if (!userLogin.password) {
            newErrors.password = "La contraseña es obligatoria";
        }

        setFormErrors(newErrors);

        // Si no hay errores, intenta iniciar sesión
        if (!newErrors.email && !newErrors.password) {
            await login(userLogin);
        }
    };

    // useEffect para manejar los errores del backend
    useEffect(() => {
        if (error) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                password: "Usuario o contraseña incorrectos",
            }));
        }
    }, [error]);

    // Formulario de login
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={userLogin.email}
                    onChange={handleInput}
                />
                {formErrors.email && <p>{formErrors.email}</p>}
                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={userLogin.password}
                        onChange={handleInput}
                    />
                </label>
                {formErrors.password && <p>{formErrors.password}</p>}
                <button type="submit">Login</button>
            </form>
            <Link to="/register">{"¿No tienes una cuenta? Registrate"}</Link>
        </div>
    );
};

export default LoginPage;
