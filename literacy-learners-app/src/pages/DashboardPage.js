// literacy-learners-app/src/pages/DashboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'; // Import Container
import Paper from '@mui/material/Paper'; // Import Paper for sections
import './DashboardPage.css'; // Keep for now, but try to minimize its use

function LinearProgressWithLabel(props) {
  // ... (LinearProgressWithLabel component remains the same)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const userProgress = 65;
  const userName = "Learner";

  const handleActivityNavigation = (path) => {
    navigate(path);
  };

  return (
    // Use Container for max-width and centering. Apply page-level padding here.
    <Container maxWidth="md" sx={{ py: 4 }} className="dashboard-page">
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: 'text.primary', mb: 1 }}>
        Welcome back, {userName}!
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}>
        Let's continue your learning adventure!
      </Typography>

      {/* Use Paper for distinct sections with elevation */}
      <Paper component="section" elevation={3} sx={{ mb: 4, p: 3, borderRadius: 2 /* theme.shape.borderRadius could be used here */ }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'secondary.main', textAlign: 'center', mb: 2 }}>
          Your Overall Progress
        </Typography>
        <LinearProgressWithLabel value={userProgress} color="secondary" />
      </Paper>

      <Paper component="section" elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'secondary.main', textAlign: 'center', mb: 2 }}>
          Start a New Activity
        </Typography>
        <Box className="activity-buttons" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: theme => theme.spacing(2) /* Use theme spacing */ }}>
          <Button variant="contained" color="secondary" onClick={() => handleActivityNavigation('/activities')} sx={{ minWidth: 200 }}>
            Phonics Fun
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleActivityNavigation('/activities')} sx={{ minWidth: 200 }}>
            Word Adventures
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleActivityNavigation('/activities')} sx={{ minWidth: 200 }}>
            Story Time
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleActivityNavigation('/activities')} sx={{ minWidth: 200 }}>
            Reading Quests
          </Button>
        </Box>
      </Paper>
    </Container> // This was a Box before, changed to Container for the outermost wrapper
  );
}
// Note: The outermost Box was changed to Container. Removed className="dashboard-page" from the inner Boxes as Container handles padding and centering.
// The classNames "progress-section" and "activity-links" are now less critical as Paper and sx props handle their styling.
// DashboardPage.css might still have some global page background color or min-height, which Container doesn't set.
// The sx={{ py: 4 }} on Container adds vertical padding. Background is handled by CssBaseline + theme.
export default DashboardPage;
