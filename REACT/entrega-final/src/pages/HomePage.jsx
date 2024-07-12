import React from 'react';
import { Box, Container, Typography, Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url('https://res.cloudinary.com/ddte4t4qb/image/upload/v1720804818/woman-holding-blank-business-card_cfobbd.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 'calc(70vh - 64px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.common.black,
  fontFamily: 'Montserrat, sans-serif',
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

const HomePage = () => {
  return (
    <React.Fragment>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenido a la Plataforma de Gestión
          </Typography>
          <Typography variant="h5" component="p" paragraph>
            Una herramienta integral para gestionar y controlar todas las áreas de tu negocio.
          </Typography>
          <StyledButton
            variant="contained"
            color="primary"
            size="large"
            component={Link} 
            to="/login" 
          >
            Descubre más
          </StyledButton>
        </Container>
      </HeroSection>
    </React.Fragment>
  );
};

export default HomePage;
