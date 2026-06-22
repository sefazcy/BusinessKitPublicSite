export interface PaymentCheckoutResponse {
  paymentId: number;
  appointmentId: number;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  checkoutUrl: string | null;
  message: string;
}

export interface PublicPaymentStatus {
  id: number;
  status: string;
  amount: number;
  currency: string;
  provider: string;
  checkoutUrl: string | null;
  paidAt: string | null;
  failedAt: string | null;
  refundedAt: string | null;
}
