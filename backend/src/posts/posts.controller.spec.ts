import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { HttpModule } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

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
