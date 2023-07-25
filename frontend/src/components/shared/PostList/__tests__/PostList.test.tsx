import { render, screen } from '@testing-library/react';
import PostsList from '../PostList';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockPosts } from 'utils/testHelpers';
const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
describe('rendering', () => {
  test('correct render', async () => {
    server.use(
      rest.get(`http://localhost:8000/posts/${1}`, (_, res, ctx) => {
        return res(ctx.json(mockPosts()));
      }),
    );
    render(<PostsList />);
    expect(await screen.findAllByText(/Author:/i)).toHaveLength(20);
  });
});
