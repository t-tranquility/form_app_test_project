import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { SideBar } from '@widgets/SideBar';

const PostList = React.lazy(() => import('@features/posts/PostList'));
const PostDetail = React.lazy(() => import('@features/posts/PostDetail'));
const UserProfile = React.lazy(() => import('@features/auth/UserProfile'));
const AdminPanel = React.lazy(() => import('@features/admin/AdminPanel'));
const Favorites = React.lazy(() => import('@features/posts/Favorites'));
const PostManager = React.lazy(() => import('@features/posts/PostManager'));

const App = () => {
  return (
      <Router>
        <div className='flex flex-row'> 
          <SideBar /> 
          <main className='max-w-[1800px] w-full'>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/post-manager" element={<PostManager />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
  );
};

export default App;
