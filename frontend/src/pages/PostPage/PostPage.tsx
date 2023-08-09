import { Container } from '@mui/material';
import PostInfo from 'components/shared/PostInfo/PostInfo';
import { PostInfoSkeleton } from 'components/shared/PostInfo/PostInfo.skeleton';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'components/feature/ErrorFallback/ErrorFallback';
import { useNavigate } from 'react-router-dom';
const PostPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ErrorBoundary FallbackComponent={Fallback} onReset={() => navigate(-1)}>
        <Suspense fallback={<PostInfoSkeleton />}>
          <PostInfo />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default PostPage;
