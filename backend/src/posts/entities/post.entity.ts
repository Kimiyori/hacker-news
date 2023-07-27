import { ApiProperty } from '@nestjs/swagger';
export class PostEntity {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
}
export class PostCommentsProps {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
}
export class PostCommentsEntity {
  @ApiProperty()
  commentsIds: number[];
}
