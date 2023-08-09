import { Box, BoxProps, LinkProps, styled } from '@mui/material';
import StyledLink from 'components/core/Link/Link';

export const StyledLinkPostUrl = styled(StyledLink)<LinkProps>(({ theme }) => ({
  h1: {
    fontSize: '10cqw',
  },
  [theme.breakpoints.up('md')]: {
    textOrientation: 'sideways',
    writingMode: 'vertical-lr',
    textDecoration: 'none',
    h1: {
      fontSize: '10cqh',
    },
  },
}));
export const StylesBoxMainPostData = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

export const StyledBoxSrapper = styled(Box)<BoxProps>(({ theme }) => ({
  gap: 12,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
  },
}));
