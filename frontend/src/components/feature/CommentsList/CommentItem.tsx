import TreeItem from '@mui/lab/TreeItem';
import parse from 'html-react-parser';
import { FC, Suspense } from 'react';
import { useFetchComments } from 'store/comments';
import { CommentBlockSkeleton } from 'components/feature/CommentsList/Comments.skeleton';
import { Typography, alpha, styled } from '@mui/material';

const CommentText: FC<{ text: string }> = ({ text }) => {
  return <Typography>{parse(String(text))}</Typography>;
};
const CommentItem: FC<{ comments: number[] }> = ({ comments }) => {
  const fetchedComments = useFetchComments(comments);
  return (
    <>
      {fetchedComments.map((comment) => {
        return (
          <StyledTreeItem key={comment.id} nodeId={String(comment.id)} label={<CommentText text={comment.text} />}>
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
  marginBottom: 10,
  div: {
    width: 'auto',
    flexDirection: 'column-reverse',
    gap: 10,
  },
}));
