import { atom, useAtomValue } from 'jotai';
import { postCommentsProps } from 'utils/types';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { useMemo } from 'react';

export const refreshComments = atom(Math.random());

export const useFetchComments = (comments: number[]) => {
  const [commentList] = useMemo(
    () =>
      atomsWithQuery((get) => ({
        queryKey: ['comments', comments, get(refreshComments)],
        queryFn: async ({ queryKey: [, idsList] }): Promise<postCommentsProps[]> => {
          const data = await Promise.all(
            (idsList as number[]).map((id) => fetch(`http://localhost:8000/posts/item/${id}`).then((y) => y.json())),
          );
          return data;
        },
        refetchInterval: 60000,
      })),
    [comments],
  );
  return useAtomValue(commentList);
};
