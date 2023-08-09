import TreeItem from '@mui/lab/TreeItem';
import { FC, Suspense } from 'react';
import { useFetchComments } from 'store/comments';
import { CommentBlockSkeleton } from 'components/feature/CommentsList/Comments.skeleton';
import { alpha, styled } from '@mui/material';
import CommentCard from 'components/core/Cards/CommentCard/CommentCard';

const CommentItem: FC<{ comments: number[] }> = ({ comments }) => {
  const fetchedComments = useFetchComments(comments);
  return (
    <>
      {fetchedComments.map((comment) => {
        return (
          <StyledTreeItem
            key={comment.id}
            nodeId={String(comment.id)}
            label={<CommentCard text={comment.text} author={comment.by} time={comment.time} />}
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
  'borderLeft': 'solid',
  'borderColor': alpha(theme.palette.primary.main, 0.25),
  'borderLeftWidth': 1,
  'marginTop': 15,
  '.MuiTreeItem-content': {
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row-reverse',
      gap: 50,
    },
  },
}));
