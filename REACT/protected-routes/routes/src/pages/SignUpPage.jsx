//Pública
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const SignUpPage = () => {
    const { register } = useAuth();
    const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInput = (ev) => {
    const { name, value } = ev.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userRegister.password !== userRegister.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register(userRegister);
  };

  return (
    <div>
    <h1>This is the SignUp Page</h1>
        <form onSubmit={handleSubmit} noValidate>
        <label htmlFor='name'>
          <input
            type='text'
            name='name'
            id='name'
            required
            value={userRegister.name}
            onChange={handleInput}
            placeholder="Name"
          />
        </label>
        <label htmlFor='email'>
          <input
            type='email'
            name='email'
            id='email'
            required
            value={userRegister.email}
            onChange={handleInput}
            placeholder="Email"
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            name='password'
            id='password'
            required
            value={userRegister.password}
            onChange={handleInput}
            placeholder="Password"
          />
        </label>
        <label htmlFor='confirmPassword'>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            required
            value={userRegister.confirmPassword}
            onChange={handleInput}
            placeholder="Confirm Password"
          />
        </label>
        <button type='submit'>Register</button>
      </form>
      <Link to='/login'>{"Already have an account? Login"}</Link>
    </div>
  );
};