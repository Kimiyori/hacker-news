import { StyledPaginationItem, StyledStackPagination } from 'components/feature/Pagination/Pagination.elements';
import { Pagination } from '@mui/material';
import usePagination from 'hooks/usePagination';

export const paginationCount = 5;

const PaginationRounded = () => {
  const { currentPage, changePage } = usePagination();
  return (
    <StyledStackPagination spacing={2}>
      <Pagination
        count={paginationCount}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => <StyledPaginationItem {...item} />}
        onChange={changePage}
        color="primary"
      />
    </StyledStackPagination>
  );
};
export default PaginationRounded;
