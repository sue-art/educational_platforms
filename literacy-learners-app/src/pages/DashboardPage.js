import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/shared/ProgressBar';
import Button from '../components/shared/Button';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const userProgress = 65; // Sample data
  const userName = "Learner"; // Sample data

  const handleActivityNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-page">
      <h2>Welcome back, {userName}!</h2>
      <p>Let's continue your learning adventure!</p>

      <section className="progress-section">
        <h3>Your Overall Progress</h3>
        <ProgressBar progress={userProgress} label={`${userProgress}% Complete`} />
      </section>

      <section className="activity-links">
        <h3>Start a New Activity</h3>
        <div className="activity-buttons">
          <Button onClick={() => handleActivityNavigation('/activities')}>
            Phonics Fun
          </Button>
          <Button onClick={() => handleActivityNavigation('/activities')}>
            Word Adventures
          </Button>
          <Button onClick={() => handleActivityNavigation('/activities')}>
            Story Time
          </Button>
          <Button onClick={() => handleActivityNavigation('/activities')}>
            Reading Quests
          </Button>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
