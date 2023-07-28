import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PostCommentsProps, PostEntity } from 'posts/entities/post.entity';
import { hackerUrl } from '../utils/const';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}
  fetchData = async <T>(url: string) => {
    const { data } = await firstValueFrom(
      this.httpService.get<T>(url).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            {
              status: error.response.status,
              error: error.response.data,
            },
            error.response.status,
            {
              cause: error,
            },
          );
        }),
      ),
    );
    return data;
  };
  async findPage(page: number): Promise<Omit<PostEntity, 'descendants' | 'url' | 'type' | 'kids'>[]> {
    const listPosts = await this.fetchData<number[]>(`${hackerUrl}/newstories.json`);
    const data = await Promise.all(
      listPosts
        .slice((page - 1) * 100, page * 100)
        .map((id) => this.fetchData<PostEntity>(`${hackerUrl}/item/${id}.json`)),
    );
    return data.map(({ by, id, score, time, title }) => {
      return { by, id, score, time, title };
    });
  }
  async findItem(id: number): Promise<PostEntity | PostCommentsProps> {
    const post = await this.fetchData<PostEntity | PostCommentsProps>(`${hackerUrl}/item/${id}.json`);
    if (!post) {
      throw new NotFoundException('Item not exist', {
        cause: new Error(),
        description: 'Item not exist',
      });
    }
    return post;
  }
}
