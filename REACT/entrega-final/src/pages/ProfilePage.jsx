import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Container, Grid, Paper, Typography, Avatar, Divider, Button } from '@mui/material';
import { styled } from "@mui/material";

const ProfileContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

const ProfileSection = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ProfileInfo = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ProfileLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(user);
  }, [user]);

  return (
    <ProfileContainer>
      <ProfilePaper>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <ProfileAvatar
              src="/static/images/avatar/1.jpg"
              alt="User Avatar"
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {profile.email}
            </Typography>
            <Button variant="contained" color="primary" component={ProfileLink} to="/dashboard/settings">
              Editar Perfil
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 4 }} />
        <ProfileSection>
          <Typography variant="h6" gutterBottom>
            Información Personal
          </Typography>
          <ProfileInfo>
            <strong>Nombre Completo:</strong> {profile.name}
          </ProfileInfo>
          <ProfileInfo>
            <strong>Correo Electrónico:</strong> {profile.email}
          </ProfileInfo>
        </ProfileSection>
      </ProfilePaper>
      <Footer />
    </ProfileContainer>
  );
};

export default ProfilePage;
