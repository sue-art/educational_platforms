import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Add this import
import { Button } from "@/components/ui/button"; // shadcn Button

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Changed from useStudent to useAuth

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-emerald-300 rounded-lg p-4 text-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
            Reading Threads
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link
              to="/phonics"
              className="text-sm font-medium hover:text-primary"
            >
              Phonics
            </Link>
            <Link
              to="/reading"
              className="text-sm font-medium hover:text-primary"
            >
              Reading
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
