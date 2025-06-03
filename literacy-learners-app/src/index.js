// literacy-learners-app/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import CssBaseline from '@mui/material/CssBaseline';   // Import CssBaseline
import theme from './theme';                          // Import our custom theme
import './index.css';
import App from './App';
import { ScoreProvider } from './context/ScoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider and pass the theme */}
      <CssBaseline /> {/* Adds baseline styles and applies background from theme */}
      <ScoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ScoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
