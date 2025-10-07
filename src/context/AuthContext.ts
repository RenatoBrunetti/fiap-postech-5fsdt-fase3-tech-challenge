import { createContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: {
    id: string;
    username: string;
    role: { id: string; name: string };
  } | null;
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
