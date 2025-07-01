import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground p-4 text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Learning App. All rights reserved.</p>
        {/* Add other footer content as needed */}
      </div>
    </footer>
  );
};

export default Footer;
