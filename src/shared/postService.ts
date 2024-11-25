import { getPosts, getCommentsByPostId } from '@/shared/api';
import { PostProps } from '@/shared/types';

export const getPostAndComments = async (id: number) => {
  try {
    const response = await getPosts();
    const foundPost = response.data.find((p: PostProps) => p.id === id);
    
    let comments = [];
    if (foundPost) {
      const commentsResponse = await getCommentsByPostId(foundPost.id);
      comments = commentsResponse.data;
    }

    return { post: foundPost || null, comments };
  } catch (error) {
    console.error('Failed to get post and comments:', error);
    throw error;
  }
};