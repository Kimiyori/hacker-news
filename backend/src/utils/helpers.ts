import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { PostEntity } from 'posts/entities/post.entity';
import { catchError, firstValueFrom } from 'rxjs';

export const getSubset = (item: PostEntity, subsetProps: string[]): Partial<PostEntity> => {
  return subsetProps.reduce((acc, key) => ((acc[key] = item[key]), acc), {});
};
export const fetchData = async <T>(httpService: HttpService, url: string) => {
  const { data } = await firstValueFrom(
    httpService.get<T>(url).pipe(
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
