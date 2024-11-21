/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PostProps } from '@/shared/types';
import { Post } from '@/entities/Post';
import { getPosts } from '@/shared/api';

const PostList = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({});
  const [dislikesCount, setDislikesCount] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getAllPosts();
  }, []);

  const handleLike = (postId: number) => {
    setLikesCount((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1,
    }));
    console.log(`Post ${postId} liked!`);
  };

  const handleDislike = (postId: number) => {
    setDislikesCount((prevDislikes) => ({
      ...prevDislikes,
      [postId]: (prevDislikes[postId] || 0) + 1,
    }));
    console.log(`Post ${postId} disliked!`);
  };

  const handleFavorite = (postId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(postId)
        ? prevFavorites.filter((id) => id !== postId)
        : [...prevFavorites, postId]
    );
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className='px-28 py-12'>
      <h1>Posts</h1>
      <div className='flex flex-row gap-6 items-center justify-between flex-wrap my-12'>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
            onLike={() => handleLike(post.id)}
            onDislike={() => handleDislike(post.id)}
            onFavorite={() => handleFavorite(post.id)}
            isFavorite={favorites.includes(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;