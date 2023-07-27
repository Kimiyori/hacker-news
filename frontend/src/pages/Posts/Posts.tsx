import PostsList from 'components/shared/PostList/PostList';
import { Suspense } from 'react';
import PostsListSkeleton from 'components/shared/PostList/Post.List.skeleton';
import PaginationRounded from 'components/feature/Pagination/Pagination';
import { refreshDataToggle } from 'store/postList';
import { useSetAtom } from 'jotai';
import { StyledButton, StyledContainer } from 'pages/Posts/Posts.elements';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'components/feature/ErrorFallback/ErrorFallback';
import { Box, Stack } from '@mui/material';

const PostsListPage = () => {
  const updateNews = useSetAtom(refreshDataToggle);
  return (
    <StyledContainer>
      <ErrorBoundary FallbackComponent={Fallback} onReset={() => updateNews(Math.random())}>
        <Box>
          <Stack
            data-testid="postsList"
            sx={{ justifyContent: 'center' }}
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Suspense fallback={<PostsListSkeleton />}>
              <PostsList />
            </Suspense>
          </Stack>
        </Box>
        <PaginationRounded />
        <StyledButton onClick={() => updateNews(Math.random())} variant="contained">
          Update news
        </StyledButton>
      </ErrorBoundary>
    </StyledContainer>
  );
};

export default PostsListPage;
