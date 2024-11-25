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
      <h1 className='text-5xl'>Manage Posts</h1>
      <form onSubmit={handleCreatePost} className='my-8'>
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

      <h2 className='text-3xl mb-6'>Existing Posts</h2>
      <div className='flex flex-col gap-6'>
        {posts.map((post) => (
          <div key={post.id} className='border p-6 rounded flex flex-col gap-4'>
            <h3 className='font-bold'>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => removePost(post.id)} className='bg-red-500 text-white px-10 py-2 rounded-md w-fit'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostManager;