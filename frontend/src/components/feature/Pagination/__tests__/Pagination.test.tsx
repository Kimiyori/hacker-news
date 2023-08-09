import { render, renderHook, screen, waitFor } from '@testing-library/react';
import PaginationRounded, { paginationCount } from '../Pagination';
import { useAtom } from 'jotai';
import { postPage } from 'store/postList';
import userEvent from '@testing-library/user-event';

describe('rendering', () => {
  test('correct render', () => {
    render(<PaginationRounded />);
    Array.from(new Array(paginationCount)).map((_, num) => {
      expect(screen.getByText(num + 1)).toBeInTheDocument();
    });
    expect(screen.getByText(/1/i)).toHaveClass('Mui-selected');
  });
  test('correct render with page param in url', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        search: '?page=3',
      },
    });
    render(<PaginationRounded />);
    expect(screen.getByText(/1/i)).not.toHaveClass('Mui-selected');
    expect(screen.getByText(/3/i)).toHaveClass('Mui-selected');
  });
  test('correct render with page param in url outside pagination range', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        search: '?page=10',
      },
    });
    render(<PaginationRounded />);
    expect(screen.getByText(/1/i)).toHaveClass('Mui-selected');
  });
});
describe('action', () => {
  test('click on another page', async () => {
    render(<PaginationRounded />);
    const { result } = renderHook(() => useAtom(postPage));
    const user = userEvent.setup();
    user.click(screen.getByText(/2/i));
    await waitFor(() => expect(result.current[0].searchParams?.get('page')).toBe('2'));
    await waitFor(() => expect(screen.getByText(/2/i)).toHaveClass('Mui-selected'));
  });
});
