import { PostProps } from '@/shared/types';
import React, { FC } from 'react';
import { FaThumbsUp, FaThumbsDown, FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Post: FC<PostProps> = ({
  id,
  title,
  body,
  onLike,
  onDislike,
  onFavorite,
  likes,
  dislikes,
  isFavorite = false,
}) => {
  return (
    <div className='relative flex flex-col gap-4 shadow-lg max-w-[550px] w-full border border-blue-500 rounded-md p-8'>
      <button onClick={onFavorite} className='absolute top-2 right-2 text-blue-500 w-fit'>
            {isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
      <Link to={`/posts/${id}`} className='font-bold text-2xl text-center line-clamp-1 my-6 cursor-pointer'>
        {title}
      </Link>
      <p className='line-clamp-3'>{body}</p>
      <div>
        <div className='flex flex-row gap-4 justify-center flex-wrap'>
          <button className='flex flex-row gap-2 text-blue-600' onClick={onLike}>
            <FaThumbsUp /> {likes}
          </button>
          <button className='flex flex-row gap-2 text-blue-900' onClick={onDislike}>
            <FaThumbsDown /> {dislikes}
          </button>
          
        </div>
      </div>
    </div>
  );
};