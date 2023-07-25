import { render, screen, waitFor } from '@testing-library/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
describe('rendering', () => {
  test('correct render', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Hacker News/i)).toBeInTheDocument();
    expect(screen.getByTitle(/HeaderIcon/i)).toBeInTheDocument();
  });
});

describe('action', () => {
  test('click on icon', async () => {
    const initialUrl = 'http://localhost/route';
    window.history.pushState({}, 'Test page', '/route');
    render(<Header />, { wrapper: BrowserRouter });
    expect(window.location.href).toBe(initialUrl);
    const user = userEvent.setup();
    user.click(screen.getByTitle(/HeaderIcon/i));
    await waitFor(() => expect(window.location.href).toBe('http://localhost/'));
  });
});
