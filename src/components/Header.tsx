import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogOut, Newspaper, Sun, Moon } from 'lucide-react';

import useAuth from '../hooks/useAuth';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  padding: 16px;
`;

const HeaderInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HeaderLeft = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;

  h1 {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.5rem;
    margin: 0;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    h1 {
      font-size: 1rem;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const HeaderRightButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.alternative};
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const HeaderRightUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
`;

const HeaderRightUserInfoSpan = styled.span<{ type: string }>`
  color: ${({ theme, type }) =>
    type === 'role' ? theme.colors.primaryHover : theme.colors.light};
  font-size: 0.9rem;
  font-weight: ${({ type }) => (type === 'role' ? '600' : '400')};
  line-height: 1;
`;

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { user, logout, isLoggedIn } = useAuth();

  const role =
    user?.role?.name === 'admin'
      ? 'Professor'
      : user?.role?.name === 'student'
        ? 'Aluno'
        : 'Usuário';
  return (
    <HeaderContainer>
      <HeaderInner>
        <HeaderLeft to="/">
          <Newspaper />
          <h1>Challenge Blog</h1>
        </HeaderLeft>
        <HeaderRight>
          {user && (
            <HeaderRightUserInfo>
              <HeaderRightUserInfoSpan type="name">
                Olá, {user.username}
              </HeaderRightUserInfoSpan>
              <HeaderRightUserInfoSpan type="role">
                {role}
              </HeaderRightUserInfoSpan>
            </HeaderRightUserInfo>
          )}
          {isLoggedIn && (
            <HeaderRightButton onClick={logout} aria-label="Sair">
              <LogOut />
            </HeaderRightButton>
          )}
          <HeaderRightButton onClick={toggleTheme} aria-label="Alterar Modo">
            {theme === 'light' ? <Moon /> : <Sun />}
          </HeaderRightButton>
        </HeaderRight>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
