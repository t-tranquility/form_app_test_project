import React, { useEffect, useState } from 'react';
import { PostProps } from '@/shared/types';
import { Post } from '@/entities/Post';
import { getPosts, getUsers } from '@/shared/api';

const PostList = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({});
  const [dislikesCount, setDislikesCount] = useState<{ [key: number]: number }>({});
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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

    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getAllPosts();
    fetchUsers();
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

  const filteredPosts = selectedUserId 
    ? posts.filter(post => post.userId === selectedUserId) 
    : posts;

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className='p-12'>
      <h1>Posts</h1>
      <div>
        <label htmlFor="user-select">Filter by User:</label>
        <select 
          id="user-select" 
          value={selectedUserId || ''} 
          onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div className='flex flex-row gap-4 items-center justify-between flex-wrap my-12'>
        {filteredPosts.map((post) => (
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
            likes={likesCount[post.id] || 0}
            dislikes={dislikesCount[post.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;