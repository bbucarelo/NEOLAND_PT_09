import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Usuario o contraseña incorrectos",
      }));
    }
  }, [error]);

  return (
    <React.Fragment>
      <HeroSection>
        <Container maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Inicia sesión
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="email"
              name="email"
              label="Correo electrónico"
              type="email"
              required
              value={userLogin.email}
              onChange={handleInput}
              error={!!formErrors.email}
              helperText={formErrors.email}
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
              value={userLogin.password}
              onChange={handleInput}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <StyledButton
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Iniciar sesión
            </StyledButton>
          </form>
          <Typography variant="body1" align="center" mt={2}>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" style={{ color: 'inherit', fontWeight: 'bold' }}>
              Regístrate aquí
            </Link>
          </Typography>
        </Container>
      </HeroSection>
    </React.Fragment>
  );
};

export default LoginPage;
