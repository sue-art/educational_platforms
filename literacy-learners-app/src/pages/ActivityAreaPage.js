// literacy-learners-app/src/pages/ActivityAreaPage.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import './ActivityAreaPage.css'; // Assuming no specific CSS or it's obsolete

function ActivityAreaPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}> {/* Consistent padding and max-width */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
          Activity Area
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Select an activity to begin learning!
        </Typography>
        {/*
          This page will later render specific activities.
          Future work: Implement routing or state logic to display one of the
          placeholder activity components from src/components/activities/
          (e.g., PhonemicAwarenessActivity, PhonicsActivity, etc.) here.
          Those activities would then also need to be styled with MUI.
        */}
      </Box>
    </Container>
  );
}

export default ActivityAreaPage;
