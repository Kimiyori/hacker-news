import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import PostsListPage from 'pages/Posts/Posts';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<PostsListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
