import React from 'react';
import styled from 'styled-components';
import { Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = styled.button`
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

const BackButtonNavigation: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <BackButton onClick={handleGoBack}>
      <Undo2 />
      <span>Voltar</span>
    </BackButton>
  );
};

export default BackButtonNavigation;
