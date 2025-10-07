import React, { useState } from 'react';

import AuthContext from './AuthContext';

import api from '../api';
import { loginRequest } from '../queries';

interface UserData {
  id: string;
  username: string;
  role: { id: string; name: string };
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? true : false;
  });
  const [user, setUser] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const loginResponse = await loginRequest(api, { username, password });
    if (!loginResponse) {
      alert('Credenciais inválidas. Tente novamente.');
      return;
    }
    setUser({
      id: loginResponse.id,
      username: loginResponse.username,
      role: loginResponse.role,
    });
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(loginResponse));
  };

  const logout = () => {
    const confirm = window.confirm('Tem certeza que deseja sair?');
    if (confirm) {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('user');
    }
    return;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
