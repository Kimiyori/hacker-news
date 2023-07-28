import { postDataProps } from 'utils/types';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { atomWithDefault } from 'jotai/vanilla/utils';

export const postId = atomWithDefault<number | null>(() => {
  const loc = window.location.href;
  return Number(loc.match(/(?<=\/)\d+$/gm)?.[0]);
});
export const [postData] = atomsWithQuery((get) => ({
  queryKey: ['postItem', get(postId)],
  queryFn: async ({ queryKey: [, id] }): Promise<postDataProps> => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/item/${id}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`status: ${response.status}`);
  },
}));
