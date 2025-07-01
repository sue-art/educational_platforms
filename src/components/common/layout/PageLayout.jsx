import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
