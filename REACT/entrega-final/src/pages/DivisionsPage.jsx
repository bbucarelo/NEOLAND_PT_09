import React, { useContext, useState } from "react";
import FormDivisions from "../components/FormDivisions";
import { DivisionsContext } from "../context/divisionsContext";
import Footer from "../components/Footer";
import {
  Box,
  Container,
  Typography,
  Button,
  styled,
} from "@mui/material";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url('https://res.cloudinary.com/ddte4t4qb/image/upload/v1720805584/abstract-bluish-paint-background-wallpaper_ckhihp.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  fontSize: '1.5rem',
  minHeight: 'calc(70vh - 64px)', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: theme.spacing(6, 0), 
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const DivisionsPage = () => {
  const { divisions, deleteDivision } = useContext(DivisionsContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const handleOpenForm = (division) => {
    setSelectedDivision(division);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedDivision(null);
    setShowForm(false);
  };

  return (
    <React.Fragment>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Divisiones
          </Typography>
          <StyledButton
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleOpenForm(null)}
            style={{ marginBottom: "16px" }}
          >
            Add Division
          </StyledButton>
          <div className="divisions-list">
            {divisions.map((division) => (
              <div key={division._id} className="division-item">
                <h3>{division.name}</h3>
                <p>Location: {division.location}</p>
                <p>Work Vertical: {division.workVertical}</p>
                <div className="division-item-actions">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenForm(division)}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteDivision(division._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {showForm && (
            <div className="form-modal">
              <FormDivisions
                division={selectedDivision}
                handleCloseForm={handleCloseForm}
              />
            </div>
          )}
        </Container>
      </HeroSection>
      <Footer />
    </React.Fragment>
  );
};

export default DivisionsPage;
