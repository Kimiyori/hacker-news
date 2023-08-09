import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostCompactEntity, ItemEntity } from 'posts/entities/post.entity';
import { typeMapping } from '../utils/const';
import { fetchData, getSubset } from '../utils/helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  async findPage(page: number): Promise<PostCompactEntity[]> {
    const listPosts = await fetchData<number[]>(
      this.httpService,
      `${this.configService.get<string>('HACKER_API_DOMAIN')}/newstories.json`,
    );
    const data = await Promise.all(
      listPosts
        .slice((page - 1) * 100, page * 100)
        .map((id) =>
          fetchData<ItemEntity>(
            this.httpService,
            `${this.configService.get<string>('HACKER_API_DOMAIN')}/item/${id}.json`,
          ),
        ),
    );
    return data.map((newsItem) => getSubset(newsItem, ['by', 'id', 'score', 'time', 'title']));
  }
  async findItem(id: number, type: string): Promise<Partial<ItemEntity>> {
    const item = await fetchData<ItemEntity>(
      this.httpService,
      `${this.configService.get<string>('HACKER_API_DOMAIN')}/item/${id}.json`,
    );
    if (!item) {
      throw new NotFoundException('Item not exist', {
        cause: new Error(),
      });
    }
    if (item.type !== type) {
      throw new BadRequestException('Wrong item type', {
        cause: new Error(),
      });
    }
    return getSubset(item, typeMapping[item.type]);
  }
}
