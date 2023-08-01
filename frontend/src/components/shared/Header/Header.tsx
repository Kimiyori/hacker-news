/* eslint-disable react/display-name */
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box, { BoxProps } from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import StyledLink from 'components/core/Link/Link';
import { Typography } from '@mui/material';

const Header: FC = () => {
  return (
    <StyledHeaderBox>
      <StyledHeader position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <NewspaperIcon />
          </IconButton>
          <StyledLink url="/">
            <Typography variant="h6">Hacker News</Typography>
          </StyledLink>
        </Toolbar>
      </StyledHeader>
    </StyledHeaderBox>
  );
};

export default Header;

const StyledHeader = styled(AppBar)<AppBarProps>({
  height: '60px',
  justifyContent: 'center',
});
const StyledHeaderBox = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  marginBottom: 10,
  [theme.breakpoints.up('md')]: {
    marginBottom: 50,
  },
}));
