import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { GitHub, LinkedIn } from '@mui/icons-material';


const lightColor = 'rgba(255, 255, 255, 0.7)';

function Footer(props) {
  return (
    <React.Fragment>
      <AppBar
        component="footer"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, top: 'auto', bottom: 0 }}
      >
        <Toolbar>
          <Grid container spacing={15} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography color="inherit" variant="body1">
                © 2024 Neoland. Todos los derechos reservados.
              </Typography>
            </Grid>
            <Grid item>
              <Link
                href="/privacy"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                  marginRight: 2,
                }}
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
              >
                Términos de Uso
              </Link>
            </Grid>
            <Grid item>
            <IconButton color="inherit" aria-label="Facebook" component="a" href="https://www.facebook.com/NeolandStudio/" target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/school/neoland/posts/?feedView=all" target="_blank">
            <LinkedIn />
          </IconButton>
          <IconButton color="inherit" aria-label="Instagram" component="a" href="https://www.instagram.com/neolandschool/" target="_blank">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="GitHub" component="a" href="https://github.com/bbucarelo" target="_blank">
            <GitHub />
          </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Footer.propTypes = {
  position: PropTypes.string,
};

export default Footer;
