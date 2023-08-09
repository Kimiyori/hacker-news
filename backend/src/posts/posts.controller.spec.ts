import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('PostsController', () => {
  let controller: PostsController;
  const mockHackerUrl = 'https://test/v0';
  const mockConfigService = { get: () => mockHackerUrl };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PostsController],
      providers: [PostsService, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });
  test('throw error in case of page out of range', async () => {
    try {
      await controller.findPage(7);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
