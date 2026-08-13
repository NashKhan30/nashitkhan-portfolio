import React from 'react';
import { AppRoutes } from '../route/AppRoutes';
import { ThemeProvider } from '../shared/context/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
