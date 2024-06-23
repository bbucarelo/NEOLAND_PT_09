import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [userRegister, setUserRegister] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const handleInput = (ev) => {
        const { name, value } = ev.target;
        setUserRegister({ ...userRegister, [name]: value });
    };
    const registerCustom = async (userRegister) => {
        try { 
            const response = await axios.post("http://localhost:8081/api/v1/user/registerRedirect", userRegister);
            console.log("Usuario registrado correctamente", response.data);
            navigate("/confirmationCode");
        } catch (error) {
            console.error("error al registrar el usuario", 
                error.response ? error.response.data : error.message);
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (userRegister.password !== userRegister.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        registerCustom(userRegister);
    };
    
    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="confirmPassword">
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                value={userRegister.confirmPassword}
                onChange={handleInput}
            />
            </label>
            <button type="submit">Register</button>
        </form>
        <Link to="/login">Login</Link>
        </div>
    );
};

export default RegisterPage;