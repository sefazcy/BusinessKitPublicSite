import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { PublicPaymentStatus } from '../types/payment';
import { getPaymentStatus, simulatePaid } from '../api/paymentApi';
import { extractError } from '../utils/extractError';

function statusLabel(s: string): string {
  switch (s) {
    case 'Pending':  return 'Awaiting payment';
    case 'Paid':     return 'Payment completed';
    case 'Failed':   return 'Payment failed';
    case 'Refunded': return 'Payment refunded';
    default:         return s;
  }
}

function statusBadgeClass(s: string): string {
  switch (s) {
    case 'Pending':  return 'ps-badge ps-badge-pending';
    case 'Paid':     return 'ps-badge ps-badge-paid';
    case 'Failed':   return 'ps-badge ps-badge-failed';
    case 'Refunded': return 'ps-badge ps-badge-refunded';
    default:         return 'ps-badge';
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
                  {statusLabel(status.status)}
                </span>
                <p className="ps-payment-id">Payment #{status.id}</p>
              </div>

              {status.status === 'Paid' && status.paidAt && (
                <div className="ps-meta">
                  <span className="ps-meta-label">Paid at</span>
                  <span className="ps-meta-value">{formatDate(status.paidAt)}</span>
                </div>
              )}

              {status.status === 'Pending' && (
                <p className="ps-description">
                  Your payment is pending. Click "Refresh status" to check for updates, or
                  our team will process it and reach out to you.
                </p>
              )}

              {status.status === 'Paid' && (
                <p className="ps-description">
                  Your payment has been received. Thank you!
                </p>
              )}

              {status.status === 'Failed' && (
                <p className="ps-description">
                  This payment could not be completed. Please contact us if you believe
                  this is an error or to arrange an alternative.
                </p>
              )}

              {status.status === 'Refunded' && (
                <p className="ps-description">
                  This payment has been refunded. Please allow a few business days for
                  the amount to return to your account.
                </p>
              )}

              <div className="ps-actions">
                {status.status === 'Pending' && (
                  <button
                    className="btn-primary"
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
                    to mark this payment as Paid without a real payment provider.
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
