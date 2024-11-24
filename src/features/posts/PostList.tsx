import React, { useEffect, useState } from 'react';
import { Post } from '@/entities/Post';
import { getUsers } from '@/shared/api';
import useFavoritesStore from '@/shared/useFavoritesStore';
import usePostStore from '@/shared/usePostStore';

const PostList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({});
  const [dislikesCount, setDislikesCount] = useState<{ [key: number]: number }>({});
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { posts } = usePostStore();
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
    setLoading(false);
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
    if (favorites.includes(postId)) {
      removeFavorite(postId);
    } else {
      addFavorite(postId);
    }
  };

  const filteredPosts = selectedUserId 
    ? posts.filter(post => post.userId === selectedUserId) 
    : posts;

  if (loading) {
    return <div>Loading posts...</div>;
  };

  if (posts.length === 0) {
    return <div>No posts available</div>;
  };

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