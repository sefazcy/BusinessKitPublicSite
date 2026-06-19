import apiClient from './apiClient';
import type { BlogPost } from '../types/blog';

export const getPublicPosts = (params?: { language?: string; category?: string }) =>
  apiClient.get<BlogPost[]>('/api/blog', { params });

export const getPublicPost = (slug: string) =>
  apiClient.get<BlogPost>(`/api/blog/${slug}`);
