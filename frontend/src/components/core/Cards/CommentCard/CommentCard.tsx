import parse from 'html-react-parser';
import { FC } from 'react';
import { Box, BoxProps, Typography, alpha, styled } from '@mui/material';
import { time2TimeAgo } from 'utils/time';

const CommentCard: FC<{ text: string; author: string; time: number }> = ({ text, author, time }) => {
  return (
    <StyledBoxComment>
      <Typography>{parse(String(text))}</Typography>
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{time2TimeAgo(time)}</Typography>
        <Typography>by {author}</Typography>
      </Box>
    </StyledBoxComment>
  );
};
export default CommentCard;

const StyledBoxComment = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 20,
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
  a: { color: theme.palette.primary.main },
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));
