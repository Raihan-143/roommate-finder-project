import React from 'react';
import { useThemeToggle } from '../Contexts/UseTheme';
import { Moon, Sun } from 'lucide-react';


function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
     <button
      onClick={toggleTheme}
      className="text-gray-800 dark:text-yellow-300 transition duration-300"
      title="Toggle Theme"
    >
      {theme === 'light' ? <Sun size={20} className='text-yellow-300'/> : <Moon size={20} />}
    </button>
  );
}

export default ThemeToggleButton;