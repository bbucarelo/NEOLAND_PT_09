import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  styled,
} from "@mui/material";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url('https://res.cloudinary.com/ddte4t4qb/image/upload/v1720805584/abstract-bluish-paint-background-wallpaper_ckhihp.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 'calc(70vh - 64px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    height: '100%',
    padding: theme.spacing(4),
  },
}));

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
    width: '100%',
    maxWidth: 400,
  },
  '& .MuiButton-root': {
    marginTop: theme.spacing(2),
    width: '100%',
    maxWidth: 400,
  },
}));

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
    <HeroSection>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Regístrate
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="name"
            name="name"
            label="Nombre"
            type="text"
            required
            value={userRegister.name}
            onChange={handleInput}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            label="Correo electrónico"
            type="email"
            required
            value={userRegister.email}
            onChange={handleInput}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            required
            value={userRegister.password}
            onChange={handleInput}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            required
            value={userRegister.confirmPassword}
            onChange={handleInput}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Registrarse
          </Button>
        </StyledForm>
        <Typography variant="body1" align="center" mt={2}>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" style={{ color: 'inherit', fontWeight: 'bold' }}>
            Inicia sesión aquí
          </Link>
        </Typography>
      </Container>
    </HeroSection>
  );
};

export default RegisterPage;
