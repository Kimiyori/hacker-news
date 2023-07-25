import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { HttpException } from '@nestjs/common';

const mockData = { page: 1, response: { status: 'success' } };

describe('PostsService', () => {
  const server = setupServer();

  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
      imports: [HttpModule],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('Successful getting post page', async () => {
    server.use(
      rest.get(
        `https://hacker-news.firebaseio.com/v0/newstories.json`,
        (_, res, ctx) => {
          return res(ctx.json([1, 2]));
        },
      ),
      rest.get(
        `https://hacker-news.firebaseio.com/v0/item/${1}.json`,
        (_, res, ctx) => {
          return res(ctx.json(mockData.response));
        },
      ),
      rest.get(
        `https://hacker-news.firebaseio.com/v0/item/${2}.json`,
        (_, res, ctx) => {
          return res(ctx.json(mockData.response));
        },
      ),
    );
    const result = await service.findPage(mockData.page);
    expect(result).toMatchObject([
      { status: 'success' },
      { status: 'success' },
    ]);
  });
  test('Error whlie getting post page', async () => {
    const expectedResult = {
      status: 503,
      error: 'Something went wrong during request',
    };
    server.use(
      rest.get(
        `https://hacker-news.firebaseio.com/v0/newstories.json`,
        (_, res, ctx) => {
          return res(ctx.status(503), ctx.json(expectedResult.error));
        },
      ),
    );
    await expect(service.findPage(mockData.page)).rejects.toThrowError(
      HttpException,
    );
  });
});
