import { render, screen } from '@testing-library/react';
import { App } from '../App';

test('renders the navbar title', () => {
  render(<App />);
  expect(screen.getByText(/star wars album/i)).toBeInTheDocument();
});
