import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types/service';
import type { BookingConfirmation } from '../types/appointment';
import type { PaymentCheckoutResponse } from '../types/payment';
import { getPublicServices } from '../api/servicesApi';
import { createBooking } from '../api/bookingApi';
import { createCheckout } from '../api/paymentApi';
import { extractError } from '../utils/extractError';

const today = new Date().toISOString().split('T')[0];

const EMPTY_FORM = {
  businessServiceId: '',
  requestedDate: '',
  requestedTime: '',
  customerFullName: '',
  customerEmail: '',
  customerPhone: '',
  note: '',
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState('');

  const [form, setForm] = useState(EMPTY_FORM);
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const [checkout, setCheckout] = useState<PaymentCheckoutResponse | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    getPublicServices()
      .then(({ data }) => setServices(data.filter(s => s.isActive)))
      .catch(() => setServicesError('Unable to load services. Please try again later or contact us directly.'))
      .finally(() => setServicesLoading(false));
  }, []);

  const validate = (): string => {
    if (!form.businessServiceId) return 'Please select a service.';
    if (!form.requestedDate) return 'Please choose a preferred date.';
    if (!form.requestedTime) return 'Please choose a preferred time.';
    if (!form.customerFullName.trim()) return 'Please enter your full name.';
    if (!form.customerEmail.trim()) return 'Please enter your email address.';
    if (!validateEmail(form.customerEmail)) return 'Please enter a valid email address.';
    if (!form.customerPhone.trim()) return 'Please enter your phone number.';
    return '';
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSubmitError('');

    const err = validate();
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError('');
    setSubmitting(true);

    let bookedId: number | null = null;
    try {
      const { data } = await createBooking({
        customerFullName: form.customerFullName.trim(),
        customerEmail: form.customerEmail.trim() || null,
        customerPhone: form.customerPhone.trim(),
        staffMemberId: null,
        businessServiceId: Number(form.businessServiceId),
        requestedDate: form.requestedDate,
        requestedTime: form.requestedTime,
        note: form.note.trim() || null,
      });
      setConfirmation(data);
      setForm(EMPTY_FORM);
      bookedId = data.id;
    } catch (err) {
      setSubmitError(extractError(err));
    } finally {
      setSubmitting(false);
    }

    if (bookedId === null) return;

    // Booking succeeded — start checkout session automatically
    setCheckoutLoading(true);
    try {
      const { data: checkoutData } = await createCheckout(bookedId);
      setCheckout(checkoutData);
    } catch (err) {
      setCheckoutError(extractError(err));
    } finally {
      setCheckoutLoading(false);
    }
  };

  const resetForm = () => {
    setConfirmation(null);
    setForm(EMPTY_FORM);
    setValidationError('');
    setSubmitError('');
    setCheckout(null);
    setCheckoutError('');
    setCheckoutLoading(false);
  };

  const selectedService = services.find(s => String(s.id) === form.businessServiceId);

  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Book an Appointment</h1>
          <p className="page-hero-subtitle">
            Fill in your details and we'll confirm your appointment shortly.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container container-narrow">
          {confirmation ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>Booking request received!</h2>
              <p>
                Thank you, <strong>{confirmation.customerFullName}</strong>. Your appointment
                request for{' '}
                <strong>
                  {confirmation.businessServiceTitle ?? 'your selected service'}
                </strong>{' '}
                on{' '}
                <strong>
                  {confirmation.requestedDate?.split('T')[0]} at {confirmation.requestedTime}
                </strong>{' '}
                has been submitted. We'll confirm it shortly.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Reference #{confirmation.id}
              </p>

              {/* Payment section */}
              {checkoutLoading && (
                <div className="checkout-info-card checkout-info-loading">
                  <span className="checkout-spinner" />
                  Setting up payment session…
                </div>
              )}

              {!checkoutLoading && checkout && (
                <div className="checkout-info-card">
                  <p className="checkout-info-label">Payment</p>
                  <div className="checkout-info-row">
                    <span className="checkout-info-amount">
                      {Number(checkout.amount).toFixed(2)} {checkout.currency}
                    </span>
                    <span className={`checkout-status-badge checkout-status-${checkout.status.toLowerCase()}`}>
                      {checkout.status}
                    </span>
                  </div>
                  <Link
                    to={`/payment-status/${checkout.paymentId}`}
                    className="checkout-info-link"
                  >
                    View payment status →
                  </Link>
                </div>
              )}

              {!checkoutLoading && checkoutError && (
                <div className="checkout-warning">
                  <strong>Payment setup could not be started automatically.</strong>
                  <p>
                    Your appointment request is still confirmed. Please contact us
                    if you'd like to arrange payment.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.75rem' }}>
                <button className="btn-outline" onClick={resetForm}>
                  Book another appointment
                </button>
                <Link to="/" className="btn-outline">Go to home</Link>
              </div>
            </div>
          ) : (
            <>
              {servicesLoading && (
                <p className="placeholder-text">Loading services…</p>
              )}

              {servicesError && (
                <div className="booking-services-error">
                  <p>{servicesError}</p>
                  <Link to="/contact" className="btn-outline" style={{ marginTop: '1rem' }}>
                    Contact us to book
                  </Link>
                </div>
              )}

              {!servicesLoading && !servicesError && services.length === 0 && (
                <div className="booking-services-error">
                  <p>No services are currently available for online booking.</p>
                  <Link to="/contact" className="btn-outline" style={{ marginTop: '1rem' }}>
                    Contact us to book
                  </Link>
                </div>
              )}

              {!servicesLoading && !servicesError && services.length > 0 && (
                <form className="contact-form booking-form" onSubmit={handleSubmit} noValidate>
                  {(validationError || submitError) && (
                    <div className="form-error">
                      {validationError || submitError}
                    </div>
                  )}

                  {/* Service */}
                  <div className="form-field">
                    <label htmlFor="service">Service *</label>
                    <select
                      id="service"
                      value={form.businessServiceId}
                      onChange={e => {
                        setForm(f => ({ ...f, businessServiceId: e.target.value }));
                        setValidationError('');
                      }}
                      className="booking-select"
                      required
                    >
                      <option value="">— Select a service —</option>
                      {services.map(s => (
                        <option key={s.id} value={String(s.id)}>
                          {s.title} — {s.durationMinutes} min — ${Number(s.price).toFixed(2)}
                        </option>
                      ))}
                    </select>
                    {selectedService && (
                      <div className="service-hint">
                        Duration: <strong>{selectedService.durationMinutes} min</strong> &nbsp;·&nbsp;
                        Price: <strong>${Number(selectedService.price).toFixed(2)}</strong>
                      </div>
                    )}
                  </div>

                  {/* Date + Time */}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="date">Preferred Date *</label>
                      <input
                        id="date"
                        type="date"
                        value={form.requestedDate}
                        min={today}
                        onChange={e => {
                          setForm(f => ({ ...f, requestedDate: e.target.value }));
                          setValidationError('');
                        }}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="time">Preferred Time *</label>
                      <input
                        id="time"
                        type="time"
                        value={form.requestedTime}
                        onChange={e => {
                          setForm(f => ({ ...f, requestedTime: e.target.value }));
                          setValidationError('');
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-divider">Your contact details</div>

                  {/* Name + Email */}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        id="fullName"
                        type="text"
                        value={form.customerFullName}
                        onChange={e => {
                          setForm(f => ({ ...f, customerFullName: e.target.value }));
                          setValidationError('');
                        }}
                        placeholder="Jane Doe"
                        maxLength={150}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email *</label>
                      <input
                        id="email"
                        type="email"
                        value={form.customerEmail}
                        onChange={e => {
                          setForm(f => ({ ...f, customerEmail: e.target.value }));
                          setValidationError('');
                        }}
                        placeholder="jane@example.com"
                        maxLength={200}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="form-field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.customerPhone}
                      onChange={e => {
                        setForm(f => ({ ...f, customerPhone: e.target.value }));
                        setValidationError('');
                      }}
                      placeholder="+1 555 000 0000"
                      maxLength={30}
                      required
                    />
                  </div>

                  {/* Notes */}
                  <div className="form-field">
                    <label htmlFor="note">Additional Notes (optional)</label>
                    <textarea
                      id="note"
                      value={form.note}
                      onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                      placeholder="Any specific requests, allergies, or preferences…"
                      rows={4}
                      maxLength={1000}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary btn-full"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending request…' : 'Request Appointment'}
                  </button>

                  <p className="booking-disclaimer">
                    Your request will be reviewed and confirmed by our team. We'll
                    reach out to you by phone or email.
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
