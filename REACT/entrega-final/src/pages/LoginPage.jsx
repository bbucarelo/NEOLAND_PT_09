import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

 const LoginPage = () => { 
    const { login } = useAuth();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    //Función para manejar los inputs
    const handleInput = (ev) => {
        const { name, value } = ev.target;
        setUserLogin({ ...userLogin, [name]: value });
    };
    //Función para manejar el submit
    const handleSubmit = (ev) => {
        ev.preventDefault();
        login(userLogin);
    };

    //Formulario de login
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
                <button type="submit">Login</button>
            </form>
            <Link to="/register">{"¿No tienes una cuenta? Registrate"}</Link> 
        </div>
    );
};

export default LoginPage;