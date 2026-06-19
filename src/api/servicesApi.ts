import apiClient from './apiClient';
import type { Service } from '../types/service';

export const getPublicServices = () =>
  apiClient.get<Service[]>('/api/services');
