import styled from 'styled-components';

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.input.border};
  color: ${({ theme }) => theme.colors.input.text};
  background: ${({ theme }) => theme.colors.input.background};
  font-size: 1rem;
  outline: none;
  transition: all 0.25s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export default Select;
