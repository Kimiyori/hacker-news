import PostCard from 'components/core/Cards/PostCard';
import { postListData } from 'store/postList';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

const PostsList: FC = () => {
  const data = useAtomValue(postListData);
  return (
    <>
      {data.map((item) => (
        <PostCard key={item.id} id={item.id} title={item.title} time={item.time} author={item.by} rating={item.score} />
      ))}
    </>
  );
};
export default PostsList;
