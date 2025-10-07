import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Plus } from 'lucide-react';

const CreateButton = styled(Link)`
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
  background: ${({ theme }) => theme.colors.primary};
  outline: none;
  text-decoration: none;
  white-space: nowrap;

  span {
    margin-left: 8px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 1;
    justify-content: center;
  }
`;

const CreatePostButton: React.FC = () => {
  return (
    <CreateButton to="/create">
      <Plus />
      <span>Novo Post</span>
    </CreateButton>
  );
};

export default CreatePostButton;
