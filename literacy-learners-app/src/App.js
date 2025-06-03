// literacy-learners-app/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayoutComponent from './components/layout/AppLayoutComponent';
import HomePage from './pages/HomePage';
import LearningModulesPage from './pages/LearningModulesPage';
import { ScoreProvider } from './context/ScoreContext'; // Import ScoreProvider
import './App.css';

function App() {
  return (
    <ScoreProvider> {/* Wrap with ScoreProvider */}
      <Router>
        <AppLayoutComponent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/modules" element={<LearningModulesPage />} />
          </Routes>
        </AppLayoutComponent>
      </Router>
    </ScoreProvider>
  );
}

export default App;
