// literacy-learners-app/src/components/layout/AppLayoutComponent.js
import React from 'react';
import HeaderComponent from './HeaderComponent';
import NavigationComponent from './NavigationComponent';
import FooterComponent from './FooterComponent';
import './AppLayoutComponent.css'; // Import the CSS

const AppLayoutComponent = ({ children }) => {
  return (
    <div className="app-layout">
      <HeaderComponent />
      <NavigationComponent />
      <main>{children}</main>
      <FooterComponent />
    </div>
  );
};

export default AppLayoutComponent;
