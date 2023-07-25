import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PostEntity } from './entities/post.entity';

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
  async findPage(page: number): Promise<PostEntity[]> {
    const listPosts = await this.fetchData<number[]>(
      `https://hacker-news.firebaseio.com/v0/newstories.json`,
    );
    const data = await Promise.all(
      listPosts
        .slice((page - 1) * 100, page * 100)
        .map((id) =>
          this.fetchData<PostEntity>(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          ),
        ),
    );
    return data;
  }
}
