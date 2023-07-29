import { Button, Container, Typography } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { handlePostTime } from 'utils/time';
import CommentList from 'components/feature/CommentsList/CommentList';
import { postData } from 'store/postItem';
import { FC } from 'react';
import { StyledBoxSrapper, StyledLinkPostUrl, StylesBoxMainPostData } from './PostInfo.styles';
import { refreshComments } from 'store/comments';

const PostInfo: FC = () => {
  const postDataValue = useAtomValue(postData);
  const updateComments = useSetAtom(refreshComments);
  return (
    <Container sx={{ color: 'primary.main' }}>
      <StyledBoxSrapper>
        {postDataValue.url && (
          <StyledLinkPostUrl url={postDataValue.url}>
            <Typography variant="h1">Link to original post</Typography>
          </StyledLinkPostUrl>
        )}
        <StylesBoxMainPostData>
          <Typography sx={{ textAlign: 'right' }} variant="h3">
            {postDataValue.title}
          </Typography>
          <Typography sx={{ textAlign: 'right', opacity: 0.75 }} variant="h3">
            {handlePostTime(postDataValue.time)}
          </Typography>
          <Typography sx={{ opacity: 0.5 }} variant="h4">
            Author: {postDataValue.by}
          </Typography>
          {postDataValue.descendants ? (
            <Typography sx={{ opacity: 0.5 }} variant="h4">
              Total comments: {postDataValue.descendants}
            </Typography>
          ) : (
            <Typography sx={{ opacity: 0.5 }} variant="h4">
              No Comments
            </Typography>
          )}
          <Button onClick={() => updateComments(Math.random())}>Update comments</Button>
          {postDataValue.kids?.length && <CommentList comments={postDataValue.kids} />}
        </StylesBoxMainPostData>
      </StyledBoxSrapper>
    </Container>
  );
};

export default PostInfo;
