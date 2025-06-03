// literacy-learners-app/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ScoreProvider } from './context/ScoreContext'; // Import ScoreProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScoreProvider> {/* Wrap with ScoreProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ScoreProvider>
  </React.StrictMode>
);
