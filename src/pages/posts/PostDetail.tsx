import { getPostAndComments } from '@/shared/postService';
import Loader from '@/widgets/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<{ postId: number; body: string }[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { post: fetchedPost, comments: fetchedComments } = await getPostAndComments(Number(id));
        setPost(fetchedPost);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    setComments((prevComments) => [
      ...prevComments,
      { postId: Number(id), body: newComment },
    ]);
    setNewComment('');
  };

  if (loading) {
    return <Loader />;
  };

  if (!post) {
    return <div className='m-auto'>Post not found</div>;
  };

  return (
    <div className='p-12'>
      <h1 className='text-5xl mb-12'>{post.title}</h1>
      <p className='mt-4'>{post.body}</p>
      <div className='mt-8'>
        <h3 className='font-semibold'>Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className='border-blue-500 my-2 border p-4 rounded-md'>{comment.body}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleAddComment} className='mt-4'>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder='Leave a comment...'
          className='w-full border bg-white p-2 rounded'
        />
        <button type='submit' className='mt-2 bg-blue-500 text-white p-2 rounded'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default PostDetail;