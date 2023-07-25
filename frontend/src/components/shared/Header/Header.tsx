/* eslint-disable react/display-name */
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { IoNewspaperOutline } from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledHeader position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <Link component={RouterLink} to="/">
              <IoNewspaperOutline title="HeaderIcon" />
            </Link>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Hacker News
          </Typography>
        </Toolbar>
      </StyledHeader>
    </Box>
  );
};

export default Header;

const StyledHeader = styled(AppBar)<AppBarProps>({
  height: '60px',
  justifyContent: 'center',
});
