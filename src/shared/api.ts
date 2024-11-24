import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const getPosts = () => api.get('/posts');
export const gethPostById = (id: number) => api.get(`/posts/${id}`);
export const createPost = (postData: { title: string; body: string }) => api.post('/posts', postData);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

export const getUsers = () => api.get('/users');

export const getCommentsByPostId = (postId: number) => api.get(`/posts/${postId}/comments`);


export default api;
