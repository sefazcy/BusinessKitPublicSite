export interface CreateBookingRequest {
  customerFullName: string;
  customerEmail: string | null;
  customerPhone: string;
  staffMemberId: null;
  businessServiceId: number | null;
  requestedDate: string;
  requestedTime: string;
  note: string | null;
}

export interface BookingConfirmation {
  id: number;
  /** Unguessable token used to start payment for this appointment. */
  publicToken: string;
  customerFullName: string;
  businessServiceTitle: string | null;
  requestedDate: string;
  requestedTime: string;
  status: string;
}
