import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockPosts } from 'utils/testHelpers';
import PostsListPage from '../Posts';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
describe('rendering', () => {
  test('correct render', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/page/${1}`, (_, res, ctx) => {
        return res(ctx.json(mockPosts(20)));
      }),
    );
    render(<PostsListPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Update news/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/skeletonPost/i)).toHaveLength(18);
    expect(await screen.findAllByTestId(/itemPost/i)).toHaveLength(20);
  });
});
describe('action', () => {
  test('click on update button', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/page/${1}`, (_, res, ctx) => {
        return res(ctx.json(mockPosts(20)));
      }),
    );

    render(<PostsListPage />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    expect(await screen.findAllByTestId(/itemPost/i)).toHaveLength(20);
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/page/${1}`, (_, res, ctx) => {
        return res(ctx.json(mockPosts(40)));
      }),
    );
    await user.click(screen.getByText(/Update news/i));
    await waitFor(() => expect(screen.getAllByTestId(/itemPost/i)).toHaveLength(40));
  });
});
