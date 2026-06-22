import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { PublicPaymentStatus } from '../types/payment';
import { getPaymentStatus, simulatePaid } from '../api/paymentApi';
import { extractError } from '../utils/extractError';

const KNOWN_STATUSES = ['Pending', 'Paid', 'Failed', 'Refunded'];

function statusBadgeClass(s: string): string {
  switch (s) {
    case 'Pending':  return 'ps-badge ps-badge-pending';
    case 'Paid':     return 'ps-badge ps-badge-paid';
    case 'Failed':   return 'ps-badge ps-badge-failed';
    case 'Refunded': return 'ps-badge ps-badge-refunded';
    default:         return 'ps-badge';
  }
}

function statusBadgeLabel(s: string): string {
  switch (s) {
    case 'Pending':  return 'Awaiting payment';
    case 'Paid':     return 'Payment completed';
    case 'Failed':   return 'Payment failed';
    case 'Refunded': return 'Payment refunded';
    default:         return s;
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function PaymentStatusPage() {
  const { paymentId } = useParams<{ paymentId: string }>();
  const id = paymentId ? parseInt(paymentId, 10) : NaN;

  const [status, setStatus] = useState<PublicPaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simError, setSimError] = useState('');

  useEffect(() => {
    if (isNaN(id)) {
      setError('Invalid payment ID.');
      setLoading(false);
      return;
    }
    getPaymentStatus(id)
      .then(({ data }) => setStatus(data))
      .catch(err => setError(extractError(err)))
      .finally(() => setLoading(false));
  }, [id]);

  const refresh = async () => {
    setRefreshing(true);
    setSimError('');
    try {
      const { data } = await getPaymentStatus(id);
      setStatus(data);
      setError('');
    } catch (err) {
      setError(extractError(err));
    } finally {
      setRefreshing(false);
    }
  };

  const handleSimulate = async () => {
    setSimulating(true);
    setSimError('');
    try {
      await simulatePaid(id);
      const { data } = await getPaymentStatus(id);
      setStatus(data);
    } catch (err) {
      setSimError(extractError(err));
    } finally {
      setSimulating(false);
    }
  };

  const isIyzico = status?.provider === 'Iyzico';
  const isUnknownStatus = status !== null && !KNOWN_STATUSES.includes(status.status);
  const showRefresh = status?.status === 'Pending' || isUnknownStatus;

  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Payment Status</h1>
          <p className="page-hero-subtitle">
            Check the current status of your payment below.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container container-narrow">

          {loading && (
            <p className="placeholder-text">Loading payment status…</p>
          )}

          {!loading && error && (
            <div className="ps-error-box">
              <p className="ps-error-message">{error}</p>
              <div className="ps-actions">
                {!isNaN(id) && (
                  <button className="btn-outline" onClick={refresh}>
                    Try again
                  </button>
                )}
                <Link to="/booking" className="btn-outline">Back to booking</Link>
                <Link to="/" className="btn-outline">Home</Link>
              </div>
            </div>
          )}

          {!loading && !error && status && (
            <div className="ps-card">
              <div className="ps-card-header">
                <span className={statusBadgeClass(status.status)}>
                  {statusBadgeLabel(status.status)}
                </span>
                <p className="ps-payment-id">Payment #{status.id}</p>
              </div>

              {/* Amount */}
              {status.amount > 0 && status.currency && (
                <div className="ps-meta">
                  <span className="ps-meta-label">Amount</span>
                  <span className="ps-meta-value">
                    {Number(status.amount).toFixed(2)} {status.currency}
                  </span>
                </div>
              )}

              {/* Timestamps */}
              {status.status === 'Paid' && status.paidAt && (
                <div className="ps-meta">
                  <span className="ps-meta-label">Paid at</span>
                  <span className="ps-meta-value">{formatDate(status.paidAt)}</span>
                </div>
              )}
              {status.status === 'Failed' && status.failedAt && (
                <div className="ps-meta">
                  <span className="ps-meta-label">Failed at</span>
                  <span className="ps-meta-value">{formatDate(status.failedAt)}</span>
                </div>
              )}
              {status.status === 'Refunded' && status.refundedAt && (
                <div className="ps-meta">
                  <span className="ps-meta-label">Refunded at</span>
                  <span className="ps-meta-value">{formatDate(status.refundedAt)}</span>
                </div>
              )}

              {/* Pending */}
              {status.status === 'Pending' && (
                <>
                  <h2 className="ps-status-title">Payment is pending</h2>
                  <p className="ps-description">
                    Your booking request was received. Payment is still waiting.
                    {isIyzico
                      ? ' Your payment is processed securely by Iyzico.'
                      : ' Our team will process it and reach out to you.'}
                  </p>
                  {status.checkoutUrl && (
                    <div className="ps-continue-block">
                      <a
                        href={status.checkoutUrl}
                        className="btn-primary ps-continue-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Continue payment
                      </a>
                      {isIyzico && (
                        <p className="ps-continue-note">
                          You will be redirected to Iyzico's secure payment page.
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Paid */}
              {status.status === 'Paid' && (
                <>
                  <h2 className="ps-status-title">Payment completed</h2>
                  <p className="ps-description">
                    Your payment has been received. Thank you!
                  </p>
                </>
              )}

              {/* Failed */}
              {status.status === 'Failed' && (
                <>
                  <h2 className="ps-status-title">Payment failed</h2>
                  <p className="ps-description">
                    The payment could not be completed. Please create a new booking
                    or contact the business to arrange an alternative.
                  </p>
                </>
              )}

              {/* Refunded */}
              {status.status === 'Refunded' && (
                <>
                  <h2 className="ps-status-title">Payment refunded</h2>
                  <p className="ps-description">
                    This payment has been refunded. Please allow a few business days
                    for the amount to return to your account.
                  </p>
                </>
              )}

              {/* Unknown status fallback */}
              {isUnknownStatus && (
                <p className="ps-description">
                  We could not determine the payment status. Please refresh or
                  contact support.
                </p>
              )}

              <div className="ps-actions">
                {showRefresh && (
                  <button
                    className="btn-outline"
                    onClick={refresh}
                    disabled={refreshing}
                  >
                    {refreshing ? 'Refreshing…' : 'Refresh status'}
                  </button>
                )}
                <Link to="/booking" className="btn-outline">Book another</Link>
                <Link to="/" className="btn-outline">Home</Link>
              </div>

              {status.status === 'Pending' && import.meta.env.DEV && (
                <div className="ps-dev-panel">
                  <p className="ps-dev-label">Developer tools</p>
                  <p className="ps-dev-description">
                    This section is visible for development testing only. It calls the
                    backend <code>PATCH /api/payments/{status.id}/simulate-paid</code> endpoint
                    to mark this payment as Paid. Works for <strong>Manual provider</strong> only —
                    Iyzico payments must be verified through the real callback flow.
                  </p>
                  {simError && (
                    <div className="form-error" style={{ marginBottom: '0.875rem' }}>
                      {simError}
                    </div>
                  )}
                  <button
                    className="ps-dev-btn"
                    onClick={handleSimulate}
                    disabled={simulating}
                  >
                    {simulating ? 'Simulating…' : 'Simulate successful payment'}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
