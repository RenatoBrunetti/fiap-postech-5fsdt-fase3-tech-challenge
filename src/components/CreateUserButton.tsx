import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserPlus } from 'lucide-react';

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.warning};
  outline: none;
  text-decoration: none;
  white-space: nowrap;
  margin-top: 8px;

  span {
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.light} !important;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.warningHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 1;
    justify-content: center;
  }
`;

const CreateUserButton: React.FC = () => {
  return (
    <CreateButton to="/create-user">
      <UserPlus />
      <span>Novo Usuário</span>
    </CreateButton>
  );
};

export default CreateUserButton;
