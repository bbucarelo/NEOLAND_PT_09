import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [userRegister, setUserRegister] = useState("");
    
    const handleInput = (ev) => {
        const { name, value } = ev.target;
        setUserRegister({ ...userRegister, [name]: value });
    };
    const registerCustom = async (userRegister) => {
        try { //! Consultar
            await axios.post("http://localhost:8081/api/v1/user/register", userRegister);
            navigate("/login");
        } catch (error) {
            console.error("error al registrar el usuario", error);
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (userRegister.password !== userRegister.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        register(userRegister);
    };
    
    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(registerCustom)}>
            <label htmlFor="name">
            <input
                type="text"
                name="name"
                id="name"
                required
                value={userRegister.name}
                onChange={handleInput}
            />
            </label>
            <label htmlFor="email">
            <input
                type="email"
                name="email"
                id="email"
                required
                value={userRegister.email}
                onChange={handleInput}
            />
            </label>
            <label htmlFor="password">
            <input
                type="password"
                name="password"
                id="password"
                required
                value={userRegister.password}
                onChange={handleInput}
            />
            </label>
            <button type="submit">Register</button>
        </form>
        <Link to="/login">{"¿Ya tienes una cuenta? Inicia sesión"}</Link>
        </div>
    );
};

export default RegisterPage;