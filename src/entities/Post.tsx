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
    <div className='flex flex-col gap-4 max-w-[300px] w-full border border-gray-900 rounded-md p-8'>
      <Link to={`/posts/${id}`} className='font-bold text-center line-clamp-1 cursor-pointer'>
        {title}
      </Link>
      <p className='line-clamp-1'>{body}</p>
      <div>
        <div className='flex text-white flex-row gap-4 justify-center flex-wrap'>
          <button onClick={onLike}>
            <FaThumbsUp /> {likes}
          </button>
          <button onClick={onDislike}>
            <FaThumbsDown /> {dislikes}
          </button>
          <button onClick={onFavorite}>
            {isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
      </div>
    </div>
  );
};