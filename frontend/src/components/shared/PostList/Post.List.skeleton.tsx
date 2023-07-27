import { Skeleton, SkeletonProps, styled } from '@mui/material';
import { FC } from 'react';

const PostsListSkeleton: FC = () => {
  return (
    <>
      {Array.from(new Array(18)).map((_, index) => (
        <StyledSkeletonPostCard data-testid="skeletonPost" key={index} variant="rectangular" />
      ))}
    </>
  );
};
export default PostsListSkeleton;

const StyledSkeletonPostCard = styled(Skeleton)<SkeletonProps>(({ theme }) => ({
  height: 200,
  width: '25%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
