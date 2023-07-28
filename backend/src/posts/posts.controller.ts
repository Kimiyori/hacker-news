import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':page')
  findPage(@Param('page') page: number) {
    if (page > 5 || page < 1) {
      throw new NotFoundException('Page must be in range from 1 to 5', {
        cause: new Error(),
        description: 'Page must be in range from 1 to 5',
      });
    }
    return this.postsService.findPage(page);
  }
  @Get('item/:id')
  findPost(@Param('id') id: number) {
    return this.postsService.findItem(id);
  }
}
