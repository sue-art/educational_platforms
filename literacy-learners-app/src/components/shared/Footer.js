import React from 'react';
// import './Footer.css'; // CSS was commented out in user's file

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Literacy Learners Inc. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
