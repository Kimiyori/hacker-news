import { time2TimeAgo } from 'utils/time';
import PostCard from '../PostCard';
import { render, screen } from '@testing-library/react';
import { mockPost } from 'utils/testHelpers';
import { BrowserRouter } from 'react-router-dom';

const testData = mockPost();

describe('rendering', () => {
  test('correct render', () => {
    render(
      <PostCard
        id={testData.id}
        title={testData.title}
        time={testData.time}
        author={testData.by}
        rating={testData.score}
      />,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByText(testData.title)).toBeInTheDocument();
    expect(screen.getByText(`Author: ${testData.by}`)).toBeInTheDocument();
    expect(screen.getByText(`${testData.score} points`)).toBeInTheDocument();
    expect(screen.getByText(String(time2TimeAgo(testData.time)))).toBeInTheDocument();
  });
});
