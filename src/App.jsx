// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StudentProvider } from "./contexts/StudentContext";
import { PhonicsProvider } from "./components/features/phonics/context/PhonicsContext";
import { AuthProvider } from "@/hooks/useAuth"; // Add this import

import HomePage from "./pages/HomePage";
import PhonicsPage from "./pages/PhonicsPage";
import ReadingPage from "./pages/ReadingPage";
import WritingPage from "./pages/WritingPage";
import PhonemePage from "./components/features/modules/components/pages/PhonemePage";
import ActivityPage from "./components/features/modules/components/pages/ActivityPage";
import ModulePage from "./components/features/modules/components/pages/ModulePage";
import LoginPage from "./components/features/auth/pages/LoginPage";
import RegisterPage from "./components/features/auth/pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StudentProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/phonics/*"
              element={
                <PhonicsProvider>
                  <PhonicsPage />
                </PhonicsProvider>
              }
            />
            <Route path="/phonics/list" element={<PhonemePage />} />
            <Route path="/phonics/:moduleId" element={<ModulePage />} />

            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
            <Route path="/reading/*" element={<ReadingPage />} />
            <Route path="/writing/*" element={<WritingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
