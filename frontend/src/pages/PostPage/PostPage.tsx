import { Container } from '@mui/material';
import PostInfo from 'components/shared/PostInfo/PostInfo';
import { PostInfoSkeleton } from 'components/shared/PostInfo/PostInfo.skeleton';
import { Suspense } from 'react';

const PostPage = () => {
  return (
    <Container>
      <Suspense fallback={<PostInfoSkeleton />}>
        <PostInfo />
      </Suspense>
    </Container>
  );
};

export default PostPage;
