// literacy-learners-app/src/components/layout/NavigationComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationComponent.css'; // Import the CSS

const NavigationComponent = () => {
  return (
    <nav className="app-nav"> {/* Add a class */}
      <Link to="/">Home</Link> | <Link to="/modules">Modules</Link>
    </nav>
  );
};

export default NavigationComponent;
