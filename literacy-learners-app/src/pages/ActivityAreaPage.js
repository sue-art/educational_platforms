// literacy-learners-app/src/pages/ActivityAreaPage.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CVCCanvasActivity from '../components/activities/CVCCanvasActivity'; // Import the component

// import './ActivityAreaPage.css'; // Assuming no specific CSS or it's obsolete

function ActivityAreaPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Changed to lg for more space, added flex for centering canvas container */}
      <Box sx={{ textAlign: 'center', mb: 2 }}> {/* Added mb for spacing */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
          CVC Word Builder
        </Typography>
        {/* Removed old placeholder: <Typography variant="subtitle1" color="text.secondary"> Select an activity to begin learning! </Typography> */}
      </Box>

      {/* Render the CVCCanvasActivity component */}
      <CVCCanvasActivity />

    </Container>
  );
}

export default ActivityAreaPage;
