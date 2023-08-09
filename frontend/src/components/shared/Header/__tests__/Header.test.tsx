import { render, screen, waitFor } from '@testing-library/react';
import Header from 'components/shared/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
describe('rendering', () => {
  test('correct render', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Hacker News/i)).toBeInTheDocument();
  });
});

describe('action', () => {
  test('click on icon', async () => {
    const initialUrl = 'http://localhost/route';
    window.history.pushState({}, 'Test page', '/route');
    render(<Header />, { wrapper: BrowserRouter });
    expect(window.location.href).toBe(initialUrl);
    const user = userEvent.setup();
    user.click(screen.getByText(/Hacker News/i));
    await waitFor(() => expect(window.location.href).toBe('http://localhost/'));
  });
});
