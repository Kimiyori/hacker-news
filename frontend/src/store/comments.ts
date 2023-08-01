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
            (idsList as number[]).map((id) =>
              fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/item/${id}`).then((response) => response.json()),
            ),
          );
          return data.filter((comment) => {
            return !(comment.dead || comment.deleted);
          });
        },
        refetchInterval: 60000,
      })),
    [comments],
  );
  return useAtomValue(commentList);
};
