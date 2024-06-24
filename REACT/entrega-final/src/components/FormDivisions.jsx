import React, { useState, useEffect, useContext } from "react";
import { DivisionsContext } from "../context/divisionsContext";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


const FormDivisions = ({ division, handleCloseForm }) => {
  const { addDivision, updateDivision } = useContext(DivisionsContext);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    workVertical: "",
  });

  useEffect(() => {
    if (division) {
      setFormData({
        name: division.name,
        location: division.location,
        workVertical: division.workVertical,
      });
    } else {
      setFormData({
        name: "",
        location: "",
        workVertical: "",
      });
    }
  }, [division]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (division) {
      updateDivision(division._id, formData);
    } else {
      addDivision(formData);
    }
    handleCloseForm();
  };

  

  return (
    <Dialog open={true} onClose={handleCloseForm}>
      <DialogTitle>{division ? "Edit Division" : "Add Division"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          value={formData.location}
          onChange={handleChange}
          
        />
        <TextField
         
          margin="dense"
          name="workVertical"
          label="Work Vertical"
          type="text"
          fullWidth
          value={formData.workVertical}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {division ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
    );
};

export default FormDivisions;
