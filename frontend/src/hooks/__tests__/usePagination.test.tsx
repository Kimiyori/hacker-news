import { renderHook } from '@testing-library/react';
import { useAtom } from 'jotai';
import { postPage } from 'store/postList';

test('initial state without params', () => {
  const { result } = renderHook(() => useAtom(postPage));
  expect(result.current[0].searchParams?.get('page')).toBe(null);
});
test('initial state with params', () => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...window.location,
      search: '?page=3',
    },
  });
  const { result } = renderHook(() => useAtom(postPage));
  expect(result.current[0].searchParams?.get('page')).toBe('3');
});
