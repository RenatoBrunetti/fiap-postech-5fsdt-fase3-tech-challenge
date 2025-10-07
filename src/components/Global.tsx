import React from 'react';

// Components
import Header from './Header';

interface GlobalProps {
  theme: string;
  toggleTheme: () => void;
}

const Global: React.FC<GlobalProps> = ({ theme, toggleTheme }) => {
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
    </>
  );
};

export default Global;
