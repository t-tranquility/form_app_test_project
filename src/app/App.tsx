import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { SideBar } from '@widgets/SideBar';

const PostList = React.lazy(() => import('@/pages/posts/PostList'));
const PostDetail = React.lazy(() => import('@/pages/posts/PostDetail'));
const UserProfile = React.lazy(() => import('@/pages/users/UserProfile'));
const AdminPanel = React.lazy(() => import('@/pages/admin/AdminPanel'));
const Favorites = React.lazy(() => import('@/pages/favorites/Favorites'));
const PostManager = React.lazy(() => import('@/pages/postManager/PostManager'));

const App = () => {
  return (
      <Router>
        <div className='flex flex-col'> 
          <SideBar /> 
          <main className='w-full mt-[100px]'>
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
