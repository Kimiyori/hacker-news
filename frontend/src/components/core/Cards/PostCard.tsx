import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { time2TimeAgo } from 'utils/time';
import { StyledCard, StyledCardContent, StyledTitle, TimeTypo } from 'components/core/Cards/PostCard.styles';
import Box from '@mui/material/Box';
import { useSetAtom } from 'jotai';
import { postId } from 'store/postItem';
import StyledLink from '../Link/Link';

type PostCardProps = {
  id: number;
  title: string;
  time: number;
  author: string;
  rating: number;
};

const PostCard: FC<PostCardProps> = ({ id, title, time, author, rating }) => {
  const setPostId = useSetAtom(postId);
  return (
    <StyledCard data-testid="itemPost">
      <StyledCardContent>
        <StyledLink url={`/${id}`} onClick={() => setPostId(id)}>
          <StyledTitle variant="h5">{title}</StyledTitle>
        </StyledLink>
        <Typography color="text.secondary">Author: {author}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TimeTypo>{time2TimeAgo(time)}</TimeTypo>
          <Typography color="text.secondary" gutterBottom>
            {rating} points
          </Typography>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};
export default PostCard;
