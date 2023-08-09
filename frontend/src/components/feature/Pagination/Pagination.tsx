import { StyledPaginationItem, StyledStackPagination } from 'components/feature/Pagination/Pagination.styles';
import { Pagination } from '@mui/material';
import usePagination from 'hooks/usePagination';
import { FC } from 'react';

export const paginationCount = 5;

const PaginationRounded: FC = () => {
  const { currentPage, changePage } = usePagination();
  return (
    <StyledStackPagination spacing={2}>
      <Pagination
        count={paginationCount}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => <StyledPaginationItem {...item} />}
        onChange={(_, page) => changePage(page)}
        color="primary"
      />
    </StyledStackPagination>
  );
};
export default PaginationRounded;
