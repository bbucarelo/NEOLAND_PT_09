import React, { useContext, useState } from "react";
import { ProjectsContext } from "../context/projectsContext";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, styled } from "@mui/material";
import { FormProjects } from "../components";
import { UsersContext } from "../context/usersContext";
import Footer from "../components/Footer";

const HeroSection = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2, 0), 
}));

const ProjectsPage = () => {
    const { projects, deleteProject } = useContext(ProjectsContext);
    const { users } = useContext(UsersContext);
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
        const projectUsers = project.user.map(userId => users.find(user => user._id === userId));
        setSelectedProject({ ...project, user: projectUsers });
        setOpen(true);
    };

    const handleDelete = (id) => {
        deleteProject(id);
    };

    return (
        <React.Fragment>
            <HeroSection>
                <Typography variant="h2" component="h1" gutterBottom>
                    Proyectos
                </Typography>
                <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ marginBottom: "1px" }}>
                    Crear Proyecto
                </Button>
                <FormProjects open={open} handleClose={handleClose} initialData={selectedProject} />
            </HeroSection>
            <Container>
                <TableContainer component={Paper} style={{ marginTop: "1px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Vertical de Trabajo</TableCell>
                                <TableCell>Usuarios</TableCell>
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
                                        {project.user.map(userId => users.find(user => user._id === userId).name).join(", ")}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(project)} color="primary">Editar</Button>
                                        <Button onClick={() => handleDelete(project._id)} color="secondary">Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default ProjectsPage;
