import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
`;

const LoaderComponent = styled.section`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  margin: 0 5px;
  animation: bounce 0.6s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  animation: ${bounce} 0.5s ease-in-out infinite alternate;
`;

const Loader: React.FC = () => {
  return (
    <LoaderComponent>
      <LoaderContainer>
        <Dot />
        <Dot />
        <Dot />
      </LoaderContainer>
    </LoaderComponent>
  );
};

export default Loader;
