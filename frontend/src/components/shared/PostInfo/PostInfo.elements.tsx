import { Box, BoxProps, Link, styled } from '@mui/material';
import { useSetAtom } from 'jotai';
import { Link as RouterLink } from 'react-router-dom';
import { refreshComments } from 'store/comments';
import Button from '@mui/material/Button';
import { FC } from 'react';

interface IListItemButtonStyled {
  component: typeof RouterLink;
  to: string;
}
export const StyledLinkPostUrl = styled(Link)<IListItemButtonStyled>(({ theme }) => ({
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

export const UpdateCommentsButton: FC = () => {
  const updateComments = useSetAtom(refreshComments);
  return <Button onClick={() => updateComments(Math.random())}>Update comments</Button>;
};
