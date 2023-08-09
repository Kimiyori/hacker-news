import { render, screen } from '@testing-library/react';
import PostsList from 'components/shared/PostList/PostList';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockPosts } from 'utils/testHelpers';
import { BrowserRouter } from 'react-router-dom';
const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
describe('rendering', () => {
  test('correct render', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/page/${1}`, (_, res, ctx) => {
        return res(ctx.json(mockPosts()));
      }),
    );
    render(<PostsList />, { wrapper: BrowserRouter });
    expect(await screen.findAllByText(/Author:/i)).toHaveLength(20);
  });
});
