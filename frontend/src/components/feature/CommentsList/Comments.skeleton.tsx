import { Skeleton, Box } from '@mui/material';
import { FC } from 'react';

export const CommentBlockSkeleton: FC = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <Skeleton sx={{ width: '75%' }} />
      <Skeleton sx={{ width: '50%' }} />
      <Skeleton sx={{ width: '50%' }} />
    </Box>
  );
};

export const CommentListSkeleton: FC = () => {
  return (
    <>
      <CommentBlockSkeleton />
      <CommentBlockSkeleton />
      <CommentBlockSkeleton />
    </>
  );
};
