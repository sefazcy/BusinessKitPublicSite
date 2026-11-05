import apiClient from './apiClient';
import type { PaymentCheckoutResponse, PublicPaymentStatus } from '../types/payment';

/** Starts (or returns the existing) checkout for an appointment, by its public token. */
export const createCheckout = (appointmentToken: string) =>
  apiClient.post<PaymentCheckoutResponse>('/api/payments/checkout', { appointmentToken });

export const getPaymentStatus = (paymentToken: string) =>
  apiClient.get<PublicPaymentStatus>(`/api/payments/${encodeURIComponent(paymentToken)}/status`);

/** DEV ONLY — calls the backend simulate-paid endpoint. Not for production. */
export const simulatePaid = (paymentToken: string) =>
  apiClient.patch(`/api/payments/${encodeURIComponent(paymentToken)}/simulate-paid`);
