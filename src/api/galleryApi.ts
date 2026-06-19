import apiClient from './apiClient';
import type { GalleryItem } from '../types/gallery';

export const getPublicGallery = (params?: { category?: string }) =>
  apiClient.get<GalleryItem[]>('/api/gallery', { params });
