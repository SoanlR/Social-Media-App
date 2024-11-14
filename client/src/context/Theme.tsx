import React, { useState, createContext, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  buttonSize: 'mini' | 'medium';
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
  buttonSize: 'mini'
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const currentTheme = localStorage.getItem('isDarkTheme') === 'false' ? false : true;
  const buttonSize = window.screen.width > 500 ? 'medium' : 'mini';
  
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(currentTheme);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.contains('dark')
        ? document.body.classList.toggle('dark')
        : document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('isDarkTheme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, buttonSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
