import React from 'react';
import { Link, type To } from 'react-router-dom';
import styled from 'styled-components';
import { Edit } from 'lucide-react';

const EditButton = styled(Link)`
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

interface EditButtonNavigationProps {
  to: To;
}

const EditPostButtonNavigation: React.FC<EditButtonNavigationProps> = ({
  to,
}) => {
  return (
    <EditButton to={to}>
      <Edit />
      <span>Editar Post</span>
    </EditButton>
  );
};

export default EditPostButtonNavigation;
