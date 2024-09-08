// ThemeContext.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define the context shape
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the ThemeContext
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// The ThemeProvider component to wrap around your app
export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check system preference for dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // State to manage dark mode, initialize from localStorage if available
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference !== null ? JSON.parse(savedPreference) : prefersDarkMode;
  });

  // Toggle dark mode and save the preference
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save the preference to local storage
      return newMode;
    });
  };

  // Create the theme based on the current mode
  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
