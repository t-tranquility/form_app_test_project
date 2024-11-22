import { PostProps } from '@/shared/types';
import React, { FC } from 'react';
import { FaThumbsUp, FaThumbsDown, FaStar, FaRegStar } from 'react-icons/fa';

export const Post: FC<PostProps & { onLike: () => void; onDislike: () => void; onFavorite: () => void; isFavorite: boolean }> = ({
  title,
  body,
  onLike,
  onDislike,
  onFavorite,
  isFavorite = false,
}) => {
  return (
    <div className='flex flex-col gap-4 max-w-[300px] w-full border border-gray-900 rounded-md p-8'>
      <h2 className='font-bold text-center line-clamp-2'>{title}</h2>
      <p className='line-clamp-1'>{body}</p>
      <div>
        <div className='flex text-white flex-row gap-4 justify-center flex-wrap'>
          <button onClick={onLike}>
            <FaThumbsUp /> 
          </button>
          <button onClick={onDislike}>
            <FaThumbsDown />
          </button>
          <button onClick={onFavorite}>
            {isFavorite ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
      </div>
    </div>
  );
};