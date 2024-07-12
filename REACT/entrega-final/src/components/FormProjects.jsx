import React, { useState, useContext, useEffect } from "react";
import { ProjectsContext } from "../context/projectsContext";
import { UsersContext } from "../context/usersContext";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, Alert } from "@mui/material";

const FormProjects = ({ open, handleClose, initialData }) => {
    const { addProject, updateProject } = useContext(ProjectsContext);
    const { users } = useContext(UsersContext);  
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectData, setProjectData] = useState({
        name: "", 
        projectDescription: "", 
        workVertical: "",
        user: [],
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            const projectUsers = initialData.user.map(userId => users.find(user => user._id === userId));
            setProjectData({ ...initialData, user: projectUsers });
            setSelectedUsers(projectUsers);
        } else {
            setProjectData({
                name: "", 
                projectDescription: "", 
                workVertical: "",
                user: [],
            });
            setSelectedUsers([]);
        }
    }, [initialData, users]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async () => {
        const dataToSubmit = { ...projectData, user: selectedUsers.map(user => user._id) };
        setError(null);
    
        try {
            if (dataToSubmit._id) {
                await updateProject(dataToSubmit._id, dataToSubmit);
            } else {
                await addProject(dataToSubmit);
            }
            handleClose();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError("El proyecto ya existe o hay un conflicto con los datos proporcionados.");
            } else {
                setError("Ocurrió un error al procesar la solicitud.");
            }
            console.error("Error al crear/actualizar el proyecto:", error.message);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{projectData._id ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Project Name"
                    type="text"
                    fullWidth
                    value={projectData.name || ""}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="projectDescription"
                    label="Description"
                    type="text"
                    fullWidth
                    value={projectData.projectDescription || ""}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="workVertical"
                    label="Work Vertical"
                    type="text"
                    fullWidth
                    value={projectData.workVertical || ""}
                    onChange={handleChange}
                />
                <Autocomplete
                    multiple
                    id="users"
                    options={users}
                    getOptionLabel={(option) => option.name}
                    value={selectedUsers}
                    onChange={(event, newValue) => {
                        setSelectedUsers(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="dense"
                            label="Select Users"
                            fullWidth
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>{projectData._id ? "Update" : "Add"}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormProjects;
