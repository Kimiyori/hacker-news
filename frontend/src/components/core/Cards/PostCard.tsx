import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { time2TimeAgo } from 'utils/time';
import { StyledCard, StyledCardContent, StyledTitle, TimeTypo } from 'components/core/Cards/PostCard.elements';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSetAtom } from 'jotai';
import { postId } from 'store/postItem';

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
        <Link sx={{ textDecoration: 'none' }} component={RouterLink} to={`/${id}`} onClick={() => setPostId(id)}>
          <StyledTitle variant="h5">{title}</StyledTitle>
        </Link>
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
