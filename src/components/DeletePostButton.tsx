import React from 'react';
import styled from 'styled-components';
import { Trash } from 'lucide-react';

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.alert};
  outline: none;
  text-decoration: none;
  white-space: nowrap;

  span {
    margin-left: 8px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.alertHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 1;
    justify-content: center;
  }
`;

const DeletePostButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <DeleteButton onClick={onClick}>
      <Trash />
      <span>Excluir Post</span>
    </DeleteButton>
  );
};

export default DeletePostButton;
