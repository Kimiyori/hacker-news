import { time2TimeAgo } from 'utils/time';
import PostCard from '../PostCard';
import { render, screen } from '@testing-library/react';

const testData = {
  title: 'Test Title',
  time: 1690028049,
  author: 'Test Author',
  rating: 10,
};

describe('rendering', () => {
  test('correct render', () => {
    render(<PostCard {...testData} />);
    expect(screen.getByText(testData.title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${testData.author}`)).toBeInTheDocument();
    expect(screen.getByText(`${testData.rating} points`)).toBeInTheDocument();
    expect(screen.getByText(String(time2TimeAgo(testData.time)))).toBeInTheDocument();
  });
});
