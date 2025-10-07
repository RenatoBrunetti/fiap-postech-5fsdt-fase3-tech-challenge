import React, { useState } from 'react';
import styled from 'styled-components';
import { Search as SearchIcon } from 'lucide-react';

const SearchInner = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 1;
    justify-content: center;
  }
`;

const SearchInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.input.text};
    opacity: 0.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
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

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

interface SearchProps {
  handlePostsSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ handlePostsSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <SearchInner>
      <SearchInput
        type="text"
        placeholder="Pesquisar..."
        onChange={handleChange}
      />
      <SearchButton type="submit" onClick={() => handlePostsSearch(query)}>
        <SearchIcon />
      </SearchButton>
    </SearchInner>
  );
};

export default Search;
