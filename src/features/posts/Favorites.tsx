import React from 'react';
import { PostProps } from '@/shared/types';
import { Post } from '@/entities/Post';
import useFavoritesStore from '@/shared/useFavoritesStore';
import { getPosts } from '@/shared/api';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useFavoritesStore();
  const [posts, setPosts] = React.useState<PostProps[]>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);
  const favoritePosts = posts.filter(post => favorites.includes(post.id));

  return (
    <div className='p-12'>
      <h1>Favorite Posts</h1>
      <Link to="/" className='text-blue-500'>Back to Posts</Link>
      <div className='flex flex-row gap-4 items-center justify-between flex-wrap my-12'>
        {favoritePosts.length > 0 ? (
          favoritePosts.map((post) => (
            <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                userId={post.userId} 
            />
          ))
        ) : (
          <div>No favorite posts available</div>
        )}
      </div>
    </div>
  );
};

export default Favorites;