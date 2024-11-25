import React, { useEffect, useState } from 'react';
import { Post } from '@/entities/Post';
import { getUsers } from '@/shared/api';
import useFavoritesStore from '@/shared/useFavoritesStore';
import usePostStore from '@/shared/usePostStore';
import { FaFilter } from 'react-icons/fa';
import Loader from '@/widgets/Loader';

const PostList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({});
  const [dislikesCount, setDislikesCount] = useState<{ [key: number]: number }>({});
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const { posts, getAllPosts } = usePostStore();
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
    getAllPosts();
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (loading) {
    return <Loader />;
  };

  if (posts.length === 0) {
    return <div className='m-auto'>No posts available</div>;
  };

  return (
    <div className='p-12'>
      <div className='flex flex-row gap-4 items-center justify-between bg-transparent'>
        <h1 className='text-5xl'>Posts</h1>
        <div className='relative'>
          <label htmlFor="user-select" className='flex items-center'>
            <FaFilter className='mr-2 text-gray-500' />
            Filter by User:
          </label>
          <select 
            id="user-select" 
            className='bg-white border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-500'
            value={selectedUserId || ''} 
            onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex flex-row gap-12 items-center justify-between flex-wrap my-12'>
        {currentPosts.map((post) => (
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

      <div className='flex justify-center mt-8'>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='bg-blue-500 text-white px-4 py-2 rounded-l'
        >
          Previous
        </button>
        <span className='flex items-center justify-center px-4'>{currentPage} / {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='bg-blue-500 text-white px-4 py-2 rounded-r'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;