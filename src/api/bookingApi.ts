import apiClient from './apiClient';
import type { CreateBookingRequest, BookingConfirmation } from '../types/appointment';

export const createBooking = (data: CreateBookingRequest) =>
  apiClient.post<BookingConfirmation>('/api/appointments', data);
