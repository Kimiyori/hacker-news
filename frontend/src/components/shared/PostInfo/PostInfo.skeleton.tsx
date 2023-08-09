import { Box, Skeleton } from '@mui/material';
import { CommentListSkeleton } from 'components/feature/CommentsList/Comments.skeleton';
import { FC } from 'react';

export const PostInfoSkeleton: FC = () => {
  return (
    <Box sx={{ mt: 10, display: { xs: 'block', md: 'flex' }, height: '100vh', gap: 2, flexDirection: 'row-reverse' }}>
      <Skeleton variant="rectangular" sx={{ height: { xs: '100px', md: '70%' }, width: { xs: '100%', md: 100 } }} />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Skeleton sx={{ height: 150, width: '80%' }} />
        <Skeleton sx={{ height: 100, width: '70%' }} />
        <Skeleton sx={{ height: 50, width: '50%' }} />
        <Skeleton sx={{ height: 50, width: '50%' }} />
        <CommentListSkeleton />
      </Box>
    </Box>
  );
};
