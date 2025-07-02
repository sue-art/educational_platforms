import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/store/authSlice";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

/**
 * Main layout component for the application
 *
 * @returns {JSX.Element} - Rendered layout with header, content, and footer
 */
function MainLayout() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
