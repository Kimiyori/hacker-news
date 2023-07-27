import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':page')
  findPage(@Param('page') page: number) {
    return this.postsService.findPage(page);
  }
  @Get('item/:id')
  findPost(@Param('id') id: number) {
    return this.postsService.findItem(id);
  }
}
