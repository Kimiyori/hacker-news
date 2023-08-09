import { useAtom } from 'jotai';
import { postPage } from 'store/postList';

export const handleCorrentPage = (page: number) => {
  return page && 1 <= page && page <= 5 ? page : 1;
};

const usePagination = () => {
  const [loc, setLocPage] = useAtom(postPage);
  const currentPage = handleCorrentPage(Number(loc.searchParams?.get('page')));
  const changePage = (page: number) => {
    setLocPage((prev: { pathname?: string; searchParams?: URLSearchParams }) => ({
      ...prev,
      searchParams: new URLSearchParams({ page: String(handleCorrentPage(page)) }),
    }));
  };
  return { currentPage, changePage };
};
export default usePagination;
