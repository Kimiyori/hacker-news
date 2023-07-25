import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Box, BoxProps, styled } from '@mui/material';

const StyledLayoutBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

export default function MainLayout() {
  return (
    <>
      <StyledLayoutBox>
        <Header />
        <Outlet />
      </StyledLayoutBox>
    </>
  );
}
