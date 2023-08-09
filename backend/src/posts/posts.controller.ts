import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentEntity, PostCompactEntity, PostEntity } from './entities/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('page/:page')
  @ApiParam({ name: 'page', type: Number, example: 1, description: 'Must be from 1 to 5' })
  @ApiOperation({ description: 'Returns page with 100 news items' })
  @ApiResponse({
    status: 200,
    description: 'Page with 100 news items',
    type: PostCompactEntity,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Page must be in range from 1 to 5',
    schema: {
      example: {
        message: 'Page must be in range from 1 to 5',
        statusCode: 404,
      },
    },
  })
  findPage(@Param('page') page: number) {
    if (page > 5 || page < 1) {
      throw new NotFoundException('Page must be in range from 1 to 5', {
        cause: new Error(),
      });
    }
    return this.postsService.findPage(page);
  }
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, example: 123 })
  @ApiOperation({ description: 'Returns item' })
  @ApiResponse({
    status: 200,
    description: 'Hacker API post',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not Found item',
    schema: {
      example: {
        message: 'Item not exist',
        statusCode: 404,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Wrong item type',
    schema: {
      example: {
        message: 'Wrong item type',
        statusCode: 400,
      },
    },
  })
  findPost(@Param('id') id: number) {
    return this.postsService.findItem(id, 'story');
  }
  @Get('comment/:id')
  @ApiParam({ name: 'id', type: Number, example: 123 })
  @ApiOperation({ description: 'Returns item' })
  @ApiResponse({
    status: 200,
    description: 'Hacker API comment',
    type: CommentEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not Found item',
    schema: {
      example: {
        message: 'Item not exist',
        statusCode: 404,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Wrong item type',
    schema: {
      example: {
        message: 'Wrong item type',
        statusCode: 400,
      },
    },
  })
  findComment(@Param('id') id: number) {
    return this.postsService.findItem(id, 'comment');
  }
}
