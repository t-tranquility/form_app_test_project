import { create } from 'zustand';
import { PostStore } from '@/shared/types';
import { createPost, deletePost, getPosts } from '@/shared/api';


const usePostStore = create<PostStore>((set) => ({
  posts: [],
  getAllPosts: async () => {
    try {
      const response = await getPosts();
      set({ posts: response.data });
    } catch (error) {
      console.error('Failed to get posts:', error);
    }
  },
  addPost: async (post) => {
    try {
      const response = await createPost(post);
      set((state) => ({ posts: [...state.posts, response.data] }));
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  },
  removePost: (postId) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }));
    deletePost(postId);
  },
}));

export default usePostStore;