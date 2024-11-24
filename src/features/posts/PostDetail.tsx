import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts, getCommentsByPostId } from '@/shared/api';
import { PostProps } from '@/shared/types';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<{ postId: number; body: string }[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await getPosts();
        const foundPost = response.data.find((p: PostProps) => p.id === Number(id));
        setPost(foundPost || null);

        if (foundPost) {
          const commentsResponse = await getCommentsByPostId(foundPost.id);
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
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
    return <div>Loading post...</div>;
  };

  if (!post) {
    return <div>Post not found</div>;
  };

  return (
    <div className='p-12'>
      <h1 className='text-2xl font-bold'>{post.title}</h1>
      <p className='mt-4'>{post.body}</p>
      <div className='mt-8'>

        <h3 className='font-semibold'>Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className='border-b p-2'>{comment.body}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleAddComment} className='mt-4'>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder='Leave a comment...'
          className='w-full border p-2 rounded'
        />
        <button type='submit' className='mt-2 bg-blue-500 text-white p-2 rounded'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default PostDetail;