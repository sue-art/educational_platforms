// literacy-learners-app/src/components/layout/FooterComponent.js
import React from 'react';
import './FooterComponent.css'; // Import the CSS

const FooterComponent = () => {
  return (
    <footer className="app-footer"> {/* Add a class */}
      <p>&copy; {new Date().getFullYear()} Literacy Learners. All rights reserved.</p>
    </footer>
  );
};

export default FooterComponent;
