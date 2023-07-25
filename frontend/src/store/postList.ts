import { atom } from 'jotai';
import { atomWithLocation } from 'jotai-location';
import { postDataProps } from '../utils/types';
import { atomsWithQuery } from 'jotai-tanstack-query';

export const postPage = atomWithLocation();
export const refreshDataToggle = atom(Math.random());
export const [postData] = atomsWithQuery((get) => ({
  queryKey: ['post', get(postPage).searchParams?.get('page'), get(refreshDataToggle)],
  queryFn: async ({ queryKey: [, page] }): Promise<postDataProps[]> => {
    const response = await fetch(`http://localhost:8000/posts/${page || 1}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`status: ${response.status}`);
  },
  refetchInterval: 60000,
}));
