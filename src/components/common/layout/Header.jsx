import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom will be used for navigation

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-primary-foreground/80">
          Learning App
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-primary-foreground/80">Home</Link>
          <Link to="/phonics" className="hover:text-primary-foreground/80">Phonics</Link>
          <Link to="/reading" className="hover:text-primary-foreground/80">Reading</Link>
          <Link to="/writing" className="hover:text-primary-foreground/80">Writing</Link>
          {/* Add other navigation links as needed */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
