import apiClient from './apiClient';

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
}

export const sendContactMessage = (data: ContactRequest) =>
  apiClient.post<void>('/api/contact', data);
