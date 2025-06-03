import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/shared/Header'; // Path needs to be components/shared/Header
import Footer from './components/shared/Footer'; // Path needs to be components/shared/Footer
import DashboardPage from './pages/DashboardPage';
import ActivityAreaPage from './pages/ActivityAreaPage';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/activities" element={<ActivityAreaPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
