import { createContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { username: string; userId: string; role: string } | null;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
