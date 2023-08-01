import PostsList from 'components/shared/PostList/PostList';
import { Suspense } from 'react';
import PostsListSkeleton from 'components/shared/PostList/Post.List.skeleton';
import PaginationRounded from 'components/feature/Pagination/Pagination';
import { refreshDataToggle } from 'store/postList';
import { useSetAtom } from 'jotai';
import { StyledBox, StyledButton, StyledContainer } from 'pages/Posts/Posts.styles';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'components/feature/ErrorFallback/ErrorFallback';
import { Box, Stack } from '@mui/material';
import usePagination, { handleCorrentPage } from 'hooks/usePagination';

const PostsListPage = () => {
  const updateNews = useSetAtom(refreshDataToggle);
  const { currentPage, changePage } = usePagination();
  return (
    <StyledContainer>
      <ErrorBoundary FallbackComponent={Fallback} onReset={() => changePage(handleCorrentPage(currentPage))}>
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
        <StyledBox>
          <PaginationRounded />
          <StyledButton onClick={() => updateNews(Math.random())} variant="contained">
            Update news
          </StyledButton>
        </StyledBox>
      </ErrorBoundary>
    </StyledContainer>
  );
};
export default PostsListPage;
