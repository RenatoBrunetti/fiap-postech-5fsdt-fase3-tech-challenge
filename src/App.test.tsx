import { render, screen } from '@testing-library/react';

// Mocking axios
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mockAxios = new MockAdapter(axios);

// Component to be tested
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render the component correctly', () => {
    render(<App />);
    expect(screen.getByText('Cadastro')).toBeInTheDocument();
  });
});
