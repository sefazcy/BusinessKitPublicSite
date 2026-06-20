import apiClient from './apiClient';
import type { PaymentCheckoutResponse, PublicPaymentStatus } from '../types/payment';

export const createCheckout = (appointmentId: number) =>
  apiClient.post<PaymentCheckoutResponse>('/api/payments/checkout', { appointmentId });

export const getPaymentStatus = (paymentId: number) =>
  apiClient.get<PublicPaymentStatus>(`/api/payments/${paymentId}/status`);

/** DEV ONLY — calls the backend simulate-paid endpoint. Not for production. */
export const simulatePaid = (paymentId: number) =>
  apiClient.patch(`/api/payments/${paymentId}/simulate-paid`);
