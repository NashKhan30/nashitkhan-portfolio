import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Render App without StrictMode (Instructor Rule for clean single-run GSAP timelines)
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);