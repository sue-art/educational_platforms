import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Needed because DashboardPage uses useNavigate
import DashboardPage from './DashboardPage';

// Helper function to render with Router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

// Basic smoke test
test('renders DashboardPage component without crashing', () => {
  renderWithRouter(<DashboardPage />);
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
});

// Test for the welcome message content
test('displays the correct welcome message', () => {
  renderWithRouter(<DashboardPage />);
  const welcomeHeading = screen.getByRole('heading', { level: 2, name: /Welcome back, Learner!/i });
  expect(welcomeHeading).toBeInTheDocument();
});

// Test for the presence of activity buttons
test('displays activity navigation buttons', () => {
  renderWithRouter(<DashboardPage />);
  expect(screen.getByRole('button', { name: /Phonics Fun/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Word Adventures/i })).toBeInTheDocument();
  // Add checks for other buttons if necessary
  expect(screen.getByRole('button', { name: /Story Time/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Reading Quests/i })).toBeInTheDocument();
});
