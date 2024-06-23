import React, { useContext, useState } from "react";
import FormDivisions from "../components/FormDivisions";
import { DivisionsContext } from "../context/divisionsContext";

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
    <div className="divisions-page">
      <h1>Divisions</h1>
      <button className="add-division-button" onClick={() => handleOpenForm(null)}>Add Division</button>
      <div className="divisions-list">
        {divisions.map((division) => (
          <div key={division._id} className="division-item">
            <h3>{division.name}</h3>
            <p>Location: {division.location}</p>
            <p>Work Vertical: {division.workVertical}</p>
            <div className="division-item-actions">
              <button className="edit-button" onClick={() => handleOpenForm(division)}>Edit</button>
              <button className="delete-button" onClick={() => deleteDivision(division._id)}>Delete</button>
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
    </div>
  );
};

export default DivisionsPage;
