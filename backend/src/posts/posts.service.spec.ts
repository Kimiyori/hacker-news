import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { faker } from '@faker-js/faker';
import { mockPost, mockPosts } from '../utils/testHelpers';
import { HttpException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const server = setupServer();
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
describe('PostsService', () => {
  let service: PostsService;
  const mockHackerUrl = 'https://test/v0';
  const mockConfigService = { get: () => mockHackerUrl };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, ConfigService],
      imports: [HttpModule],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    service = module.get<PostsService>(PostsService);
  });
  describe('Post Page', () => {
    test('Successful getting post page data', async () => {
      const mockNewStories = faker.helpers.multiple(faker.number.int, {
        count: 20,
      });
      const mockPostsList = mockPosts(mockNewStories.length);
      server.use(
        rest.get(`${mockHackerUrl}/newstories.json`, (_, res, ctx) => {
          return res(ctx.json(mockNewStories));
        }),
        ...mockNewStories.map((postId, index) =>
          rest.get(`${mockHackerUrl}/item/${postId}.json`, (_, res, ctx) => {
            return res(ctx.json(mockPostsList[index]));
          }),
        ),
      );
      const result = await service.findPage(1);
      result.sort((a, b) => (a.time > b.time ? 1 : -1));
      mockPostsList.sort((a, b) => (a.time > b.time ? 1 : -1));
      result.forEach((post, index) => {
        expect(post.by).toEqual(mockPostsList[index].by);
        expect(post.time).toEqual(mockPostsList[index].time);
      });
    });
    test('Error whlie getting post page', async () => {
      const expectedResult = {
        status: 503,
        error: 'Something went wrong during request',
      };
      server.use(
        rest.get(`${mockHackerUrl}/newstories.json`, (_, res, ctx) => {
          return res(ctx.status(503), ctx.json(expectedResult.error));
        }),
      );
      await expect(service.findPage(1)).rejects.toThrowError(HttpException);
    });
  });
  describe('Post Item', () => {
    const mockPostData = mockPost('story');
    test('Successful getting post item data', async () => {
      server.use(
        rest.get(`${mockHackerUrl}/item/${1}.json`, (_, res, ctx) => {
          return res(ctx.json(mockPostData));
        }),
      );
      const result = await service.findItem(1, mockPostData.type);
      expect(result.title).toEqual(mockPostData.title);
    });
    test('Error whlie getting post item', async () => {
      const expectedResult = {
        status: 503,
        error: 'Something went wrong during request',
      };
      server.use(
        rest.get(`${mockHackerUrl}/item/${1}.json`, (_, res, ctx) => {
          return res(ctx.status(503), ctx.json(expectedResult.error));
        }),
      );
      await expect(service.findItem(1, mockPostData.type)).rejects.toThrowError(HttpException);
    });
    test('case when item does not exist', async () => {
      server.use(
        rest.get(`${mockHackerUrl}/item/${1}.json`, (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(null));
        }),
      );
      await expect(service.findItem(1, mockPostData.type)).rejects.toThrowError(NotFoundException);
    });
  });
});
