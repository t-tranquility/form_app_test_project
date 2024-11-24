import React, { useEffect, useState } from 'react';
import usePostStore from '@/shared/usePostStore';

const PostManager = () => {
  const { posts, getAllPosts, addPost, removePost } = usePostStore();
  const [newPost, setNewPost] = useState<{ title: string; body: string }>({
    title: '',
    body: '',
  });

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPostId = Date.now();
    const currentUserId = 1;
    await addPost({ id: newPostId, userId: currentUserId, title: newPost.title, body: newPost.body });
    setNewPost({ title: '', body: '' });
  };

  return (
    <div className='p-12'>
      <h1>Manage Posts</h1>
      <form onSubmit={handleCreatePost} className='my-4'>
        <input 
          type="text" 
          placeholder="Title" 
          value={newPost.title} 
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className='border p-2 rounded w-full'
          required
        />
        <textarea 
          placeholder="Body" 
          value={newPost.body} 
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          className='border p-2 rounded w-full my-2'
          required
        />
        <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Create Post</button>
      </form>

      <h2>Existing Posts</h2>
      <div className='flex flex-col gap-4'>
        {posts.map((post) => (
          <div key={post.id} className='border p-4 rounded'>
            <h3 className='font-bold'>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => removePost(post.id)} className='bg-red-500 text-white p-2 rounded'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostManager;