import { useSetAtom } from 'jotai';
import { refreshComments } from 'store/comments';
import Button from '@mui/material/Button';
import { FC } from 'react';

export const UpdateCommentsButton: FC = () => {
  const updateComments = useSetAtom(refreshComments);
  return <Button onClick={() => updateComments(Math.random())}>Update comments</Button>;
};
