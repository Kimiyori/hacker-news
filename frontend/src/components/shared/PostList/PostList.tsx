import PostCard from '../../core/Cards/PostCard';
import { postData } from '../../../store/postList';
import { useAtomValue } from 'jotai';

const PostsList = () => {
  const data = useAtomValue(postData);
  return (
    <>
      {data.map((item) => (
        <PostCard key={item.id} title={item.title} time={item.time} author={item.by} rating={item.score} />
      ))}
    </>
  );
};
export default PostsList;
