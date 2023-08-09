import { Outlet } from 'react-router-dom';
import Header from 'components/shared/Header/Header';
import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const MainLayout: FC = () => {
  return (
    <StyledLayoutBox>
      <Header />
      <Outlet />
    </StyledLayoutBox>
  );
};
export default MainLayout;
const StyledLayoutBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));
