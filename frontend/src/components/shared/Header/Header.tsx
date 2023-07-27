/* eslint-disable react/display-name */
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box, { BoxProps } from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <StyledHeaderBox>
      <StyledHeader position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <NewspaperIcon />
          </IconButton>
          <Link sx={{ textDecoration: 'none' }} component={RouterLink} to="/">
            <Typography variant="h6" color="inherit">
              Hacker News
            </Typography>
          </Link>
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
  [theme.breakpoints.up('md')]: {
    marginBottom: 10,
  },
}));
