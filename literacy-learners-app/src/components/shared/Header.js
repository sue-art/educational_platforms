// literacy-learners-app/src/components/shared/Header.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Alias Link to avoid conflict if any
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; // For layout
import ScoreDisplayComponent from '../gamification/ScoreDisplayComponent';
// import './Header.css'; // Removing custom CSS import, will rely on MUI styling

function Header() {
  return (
    <AppBar position="static" color="primary"> {/* Using theme's primary color */}
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Literacy Learning Platform
          </RouterLink>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}> {/* Hide on extra small screens, show on small and up */}
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/activities">
            Activities
          </Button>
        </Box>

        {/* Score Display */}
        {/* Wrap ScoreDisplayComponent in a Box for potential sx styling if needed */}
        <Box sx={{ marginLeft: 2 }}>
          <ScoreDisplayComponent />
        </Box>

        {/* Could add a Mobile Menu (IconButton + Menu) here later for small screens */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
