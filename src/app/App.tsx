import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

const PostList = React.lazy(() => import('@features/posts/PostList'));
const PostDetail = React.lazy(() => import('@features/posts/PostDetail'));
const UserProfile = React.lazy(() => import('@features/auth/UserProfile'));
const AdminPanel = React.lazy(() => import('@features/admin/AdminPanel'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
