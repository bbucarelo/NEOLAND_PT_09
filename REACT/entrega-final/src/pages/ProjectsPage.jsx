import React, { useContext, useState } from "react";
import { ProjectsContext } from "../context/projectsContext";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { FormProjects } from "../components";

const ProjectsPage = () => {
    const { projects, deleteProject } = useContext(ProjectsContext);
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleClickOpen = () => {
        setSelectedProject(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (project) => {
        setSelectedProject(project);
        setOpen(true);
    };

    const handleDelete = (id) => {
        deleteProject(id);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Crear Proyecto
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Vertical de Trabajo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project._id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.projectDescription}</TableCell>
                                <TableCell>{project.workVertical}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(project)} color="primary">Editar</Button>
                                    <Button onClick={() => handleDelete(project._id)} color="secondary">Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <FormProjects open={open} handleClose={handleClose} initialData={selectedProject} />
        </div>
    );
};

export default ProjectsPage;
