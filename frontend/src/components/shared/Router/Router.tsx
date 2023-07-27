import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from 'components/shared/MainLayout/MainLayout';
import PostsListPage from 'pages/Posts/Posts';
import PostPage from 'pages/PostPage/PostPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<PostsListPage />} />
          <Route path="/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
