import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CommentsItem from 'components/feature/CommentsList/CommentItem';
import { FC, Suspense } from 'react';
import { CommentListSkeleton } from 'components/feature/CommentsList/Comments.skeleton';

const CommentList: FC<{ comments: number[] }> = ({ comments }) => {
  return (
    <Suspense fallback={<CommentListSkeleton />}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandLessIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ExpandMoreIcon />}
        sx={{ textAlign: 'right', width: '100%' }}
      >
        <CommentsItem comments={comments} />
      </TreeView>
    </Suspense>
  );
};

export default CommentList;
