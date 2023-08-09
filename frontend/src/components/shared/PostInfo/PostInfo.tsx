import { Box, Button, Container, Divider, Typography } from '@mui/material';
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
          <Box
            sx={
              postDataValue.descendants
                ? {
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row-reverse' },
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'flex-end',
                  }
                : { width: '100%', textAlign: 'right' }
            }
          >
            <Typography sx={{ opacity: 0.5, fontSize: { xs: 24, md: 32 }, textAlign: 'right' }} variant="h4">
              {postDataValue.descendants ? `Total comments: ${postDataValue.descendants}` : 'No Comments'}
            </Typography>

            <Button onClick={() => updateComments(Math.random())}>Update comments</Button>
          </Box>
          {postDataValue.kids?.length && (
            <>
              <Divider />
              <CommentList comments={postDataValue.kids} />
            </>
          )}
        </StylesBoxMainPostData>
      </StyledBoxSrapper>
    </Container>
  );
};

export default PostInfo;
