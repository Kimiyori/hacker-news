import { PaginationItem, PaginationItemProps, styled, alpha } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';

export const StyledStackPagination = styled(Stack)<StackProps>(({ theme }) => ({
  width: 350,
  [theme.breakpoints.up('md')]: {
    width: 500,
  },
}));
export const StyledPaginationItem = styled(PaginationItem)<PaginationItemProps>(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: 20,
  backgroundColor: alpha(theme.palette.primary.light, 0.3),
  [theme.breakpoints.up('md')]: {
    width: 60,
    height: 60,
  },
}));
