import apiClient from './apiClient';
import type { BusinessSettings } from '../types/businessSettings';

export const getBusinessSettings = () =>
  apiClient.get<BusinessSettings>('/api/business-settings');
