import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import AuthProvider from './context/AuthProvider';
import { lightTheme, darkTheme } from './themes';

// Components
import Global from './components/Global';
import Main from './components/Main';

// Pages
import Create from './pages/Create';
import CreateUser from './pages/CreateUser';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import PrivateRoute from './components/PrivateRoute';

// Styles
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.body};
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <AppContainer>
            <Global theme={theme} toggleTheme={toggleTheme} />
            <Main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route
                  path="/create"
                  element={<PrivateRoute element={<Create />} />}
                />
                <Route
                  path="/post/:postId"
                  element={<PrivateRoute element={<Post />} />}
                />
                <Route
                  path="/edit/:postId"
                  element={<PrivateRoute element={<Edit />} />}
                />
              </Routes>
            </Main>
          </AppContainer>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
