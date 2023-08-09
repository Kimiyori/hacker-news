import { atom } from 'jotai';
import { atomWithLocation } from 'jotai-location';
import { postDataProps } from 'utils/types';
import { atomsWithQuery } from 'jotai-tanstack-query';

export const postPage = atomWithLocation();
export const refreshDataToggle = atom(Math.random());
export const [postListData] = atomsWithQuery((get) => ({
  queryKey: ['post', get(postPage).searchParams?.get('page'), get(refreshDataToggle)],
  queryFn: async ({ queryKey: [, page] }): Promise<Omit<postDataProps, 'descendants' | 'url' | 'type'>[]> => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/page/${page || 1}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`${response.statusText}`);
  },
  refetchInterval: 60000,
}));
