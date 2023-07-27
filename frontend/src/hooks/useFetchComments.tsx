import { atom, useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { useMemo } from 'react';
import { postCommentsProps } from 'utils/types';

export const useFetchComments = (comments: number[]) => {
  const refreshAtom = atom(Math.random());
  const refreshData = atom(null, (get, set) => {
    set(refreshAtom, Math.random());
  });
  const [commentList] = useMemo(
    () =>
      atomsWithQuery((get) => ({
        queryKey: ['postItem', comments, get(refreshAtom)],
        queryFn: async ({ queryKey: [, idsList] }): Promise<postCommentsProps[]> => {
          const data = await Promise.all(
            (idsList as number[]).map((id) => fetch(`http://localhost:8000/posts/item/${id}`).then((y) => y.json())),
          );
          return data;
        },
        // refetchInterval: 60000,
      })),
    [comments, refreshAtom],
  );
  const data = useAtomValue(commentList);
  return { data, refreshData };
};
