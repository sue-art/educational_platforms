// literacy-learners-app/src/components/shared/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import ScoreDisplayComponent from '../gamification/ScoreDisplayComponent'; // Corrected path
import './Header.css'; // Import the CSS

function Header() {
  return (
    <header className="app-header"> {/* Ensure this class or inline styles allow for flex if needed */}
      <div className="app-title-nav"> {/* Wrapper for title and nav */}
        <h1>Literacy Learning Platform</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/activities">Activities</Link>
            </li>
          </ul>
        </nav>
      </div>
      <ScoreDisplayComponent /> {/* Add score display */}
    </header>
  );
}

export default Header;
