import TreeItem from '@mui/lab/TreeItem';
import parse from 'html-react-parser';
import { FC, Suspense } from 'react';
import { useFetchComments } from 'store/comments';
import { CommentBlockSkeleton } from 'components/feature/CommentsList/Comments.skeleton';
import { Box, Typography, alpha, styled } from '@mui/material';
import { time2TimeAgo } from 'utils/time';

const CommentText: FC<{ text: string; author: string; time: number }> = ({ text, author, time }) => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography>{parse(String(text))}</Typography>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{time2TimeAgo(time)}</Typography>
          <Typography>by {author}</Typography>
        </Box>
      </Box>
    </>
  );
};
const CommentItem: FC<{ comments: number[] }> = ({ comments }) => {
  const fetchedComments = useFetchComments(comments);
  return (
    <>
      {fetchedComments.map((comment) => {
        return (
          <StyledTreeItem
            key={comment.id}
            nodeId={String(comment.id)}
            label={<CommentText text={comment.text} author={comment.by} time={comment.time} />}
          >
            {comment.kids?.length && (
              <Suspense fallback={<CommentBlockSkeleton />}>
                <CommentItem comments={comment.kids} />
              </Suspense>
            )}
          </StyledTreeItem>
        );
      })}
    </>
  );
};
export default CommentItem;

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  borderLeft: 'solid',
  borderColor: alpha(theme.palette.primary.main, 0.25),
  borderLeftWidth: 1,
  marginTop: 15,
  width: '100%',
  div: {
    width: '100%',
    flexDirection: 'row-reverse',
    gap: 10,
  },
}));
