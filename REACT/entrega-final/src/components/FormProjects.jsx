import React, { useState, useContext, useEffect } from "react";
import { ProjectsContext } from "../context/projectsContext";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const FormProjects = ({ open, handleClose, initialData }) => {
    const { addProject, updateProject } = useContext(ProjectsContext);
    const [projectData, setProjectData] = useState(initialData || 
        { 
        name: "", 
        projectDescription: "", 
        workVertical: "",
    });

    useEffect(() => {
        if (initialData) {
            setProjectData(initialData);
        } 
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    
    const handleSubmit = async () => {
        if (projectData._id) {
            try {
                await updateProject(projectData._id, projectData);
            } catch (error) {
                console.error("Error al actualizar el proyecto:", error.message);
            }
        } else {
            try {
                await addProject(projectData);
            } catch (error) {
                console.error("Error al crear el proyecto:", error);
            }
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{projectData._id ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>{projectData._id ? "Update" : "Add"}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormProjects;
