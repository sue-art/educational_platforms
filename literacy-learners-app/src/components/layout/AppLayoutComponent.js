// literacy-learners-app/src/components/layout/AppLayoutComponent.js
import React from 'react';
import { Navbar, Typography } from "@material-tailwind/react";
import HeaderComponent from './HeaderComponent';
import NavigationComponent from './NavigationComponent';
import FooterComponent from './FooterComponent';

const AppLayoutComponent = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />
      <NavigationComponent />
      <main className="flex-grow p-4">{children}</main>
      <FooterComponent />
    </div>
  );
};

export default AppLayoutComponent;
