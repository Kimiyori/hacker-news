import { render, screen } from '@testing-library/react';
import { mockComments } from 'utils/testHelpers';
import { faker } from '@faker-js/faker';
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import CommentList from 'components/feature/CommentsList/CommentList';

const testCommentsListIds = faker.helpers.multiple(faker.number.int, { count: faker.number.int({ min: 2, max: 4 }) });
const testCommentsList = mockComments(testCommentsListIds.length);
const testCommentsListFirstCommChilds = mockComments(testCommentsList[0].kids.length);
const server = setupServer(
  ...testCommentsListIds.map((id, index) =>
    rest.get(`http://localhost:8000/posts/item/${id}`, (_, res, ctx) => {
      return res(ctx.json(testCommentsList[index]));
    }),
  ),
  ...testCommentsList[0].kids.map((id, index) =>
    rest.get(`http://localhost:8000/posts/item/${id}`, (_, res, ctx) => {
      return res(ctx.json(testCommentsListFirstCommChilds[index]));
    }),
  ),
);
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
describe('rendering', () => {
  test('correct initial render', async () => {
    render(<CommentList comments={testCommentsListIds} />);
    testCommentsList.map(async (comment) => {
      expect(await screen.findByText(comment.text)).toBeInTheDocument();
    });
  });
  test('render childs comments after click', async () => {
    render(<CommentList comments={[testCommentsListIds[0]]} />);
    const user = userEvent.setup();
    await user.click(await screen.findByTestId(/ExpandMoreIcon/i));
    testCommentsListFirstCommChilds.map(async (comment) => {
      expect(await screen.findByText(comment.text)).toBeInTheDocument();
    });
  });
});
