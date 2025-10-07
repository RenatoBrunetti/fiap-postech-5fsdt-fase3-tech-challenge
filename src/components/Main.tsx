import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};
export default Main;
