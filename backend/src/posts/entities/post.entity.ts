import { ApiPropertyOptional, PickType } from '@nestjs/swagger';

export class ItemEntity {
  @ApiPropertyOptional({ example: 'Post author' })
  by?: string;
  @ApiPropertyOptional({ example: 1234 })
  descendants?: number;
  @ApiPropertyOptional({ example: 1234 })
  id?: number;
  @ApiPropertyOptional({ example: [1, 2, 3] })
  kids?: number[];
  @ApiPropertyOptional({ example: '192' })
  score?: number;
  @ApiPropertyOptional({ example: 19378437836 })
  time?: number;
  @ApiPropertyOptional({ example: 'Title example' })
  title?: string;
  @ApiPropertyOptional({ example: 'news' })
  type: string;
  @ApiPropertyOptional({ example: 'https://docs.nestjs.com' })
  url?: string;
  @ApiPropertyOptional({ example: 19378437836 })
  parent?: number;
  @ApiPropertyOptional({ example: false })
  deleted?: boolean;
  @ApiPropertyOptional({ example: false })
  dead?: boolean;
  @ApiPropertyOptional({ example: 2222 })
  poll?: number;
  @ApiPropertyOptional({ example: [1, 2] })
  parts?: number[];
  @ApiPropertyOptional({ example: 'Text example' })
  text?: string;
}
export class PostCompactEntity extends PickType(ItemEntity, ['by', 'id', 'score', 'time', 'title'] as const) {}
export class CommentEntity extends PickType(ItemEntity, ['by', 'id', 'kids', 'time', 'text', 'parent'] as const) {}
export class PostEntity extends PickType(ItemEntity, [
  'by',
  'id',
  'time',
  'title',
  'url',
  'descendants',
  'kids',
] as const) {}
