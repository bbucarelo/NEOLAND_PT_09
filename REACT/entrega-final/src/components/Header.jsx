import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
    const { onDrawerToggle, pages = [] } = props;
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Link
                                href="https://www.notion.so/neoland-school/Contenidos-Web-Development-ccbd8f65c7f741ca993d045abf7058f2"
                                variant="body2"
                                sx={{
                                    textDecoration: 'none',
                                    color: lightColor,
                                    '&:hover': {
                                        color: 'common.white',
                                    },
                                }}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Ir a la documentación
                            </Link>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Notificaciones">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{ zIndex: 0 }}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                Mis Gestiones
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{ borderColor: lightColor }}
                                variant="outlined"
                                color="inherit"
                                size="small"
                                onClick={logout} 
                            >
                                Cerrar Sesión
                            </Button>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Ayuda">
                                <IconButton color="inherit">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Tabs value={0} textColor="inherit">
                    {pages.map((page) => (
                        <Tab key={page.path} label={page.label} onClick={() => handleNavigate(page.path)} />
                    ))}
                    
                    
                </Tabs>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Header;
