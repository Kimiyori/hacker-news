import { render, screen } from '@testing-library/react';
import PostInfo from '../PostInfo';
import { setupServer } from 'msw/lib/node';
import { mockComment, mockPost } from 'utils/testHelpers';
import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
const server = setupServer(
  rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/item/${NaN}`, (_, res, ctx) => {
    return res(ctx.json(mockPostData));
  }),
);
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const mockPostData = mockPost(false);

describe('rendering', () => {
  test('correct render with comments', async () => {
    render(<PostInfo />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/Link to original post/i)).toBeInTheDocument();
    expect(await screen.findByText('Author: ' + mockPostData.by)).toBeInTheDocument();
    expect(await screen.findByText(mockPostData.title)).toBeInTheDocument();
    expect(await screen.findByText('Total comments: ' + mockPostData.descendants)).toBeInTheDocument();
    expect(screen.getByText(/Update comments/i)).toBeInTheDocument();
  });
  test('correct render without comments', async () => {
    mockPostData.descendants = 0;
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/item/${NaN}`, (_, res, ctx) => {
        return res(ctx.json(mockPostData));
      }),
    );
    render(<PostInfo />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/No Comments/i)).toBeInTheDocument();
  });
});
describe('action', () => {
  test('click update button', async () => {
    mockPostData.kids = [1234567];
    const newComment = mockComment(false);
    render(<PostInfo />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    server.use(
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/item/${NaN}`, (_, res, ctx) => {
        return res(ctx.json(mockPostData));
      }),
      rest.get(`${process.env.REACT_APP_BACKEND_URL}/posts/item/${1234567}`, (_, res, ctx) => {
        return res(ctx.json(newComment));
      }),
    );
    await user.click(screen.getByText(/Update comments/i));
    expect(await screen.findByText(newComment.text)).toBeInTheDocument();
  });
});
