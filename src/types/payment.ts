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
  paidAt: string | null;
}
