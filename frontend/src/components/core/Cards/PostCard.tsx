import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { time2TimeAgo } from 'utils/time';
import { StyledCard, StyledCardContent, StyledTitle, TimeTypo } from 'components/core/Cards/PostCard.elements';
import Box from '@mui/material/Box';

type PostCardProps = {
  title: string;
  time: number;
  author: string;
  rating: number;
};

const PostCard: FC<PostCardProps> = ({ title, time, author, rating }) => {
  return (
    <StyledCard data-testid="itemPost">
      <StyledCardContent>
        <StyledTitle variant="h5">{title}</StyledTitle>
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
