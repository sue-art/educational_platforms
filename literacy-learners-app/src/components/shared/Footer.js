// literacy-learners-app/src/components/shared/Footer.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'; // To constrain width like header/main content

// import './Footer.css'; // Assuming no specific Footer.css or it's obsolete

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3, // Padding top and bottom
        px: 2, // Padding left and right
        mt: 'auto', // Push footer to bottom if content is short
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        borderTop: (theme) => `1px solid ${theme.palette.divider}` // Add a top border
      }}
      className="app-footer" // Keep className if any global styles might target it, though MUI styling is preferred
    >
      <Container maxWidth="lg"> {/* Or "md" to match DashboardPage, or remove for full width */}
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Literacy Learners Inc. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
