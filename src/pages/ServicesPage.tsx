import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types/service';
import { getPublicServices } from '../api/servicesApi';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicServices()
      .then(({ data }) => setServices(data.filter(s => s.isActive)))
      .catch(() => setError('Unable to load services right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Our Services</h1>
          <p className="page-hero-subtitle">
            Explore our full range of professional services.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading && <p className="placeholder-text">Loading services…</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && !error && services.length === 0 && (
            <p className="placeholder-text">No services are currently listed. Check back soon.</p>
          )}
          {!loading && !error && services.length > 0 && (
            <div className="service-list">
              {services.map(s => (
                <div key={s.id} className="service-list-item">
                  {s.imageUrl && (
                    <div className="service-list-img">
                      <img src={s.imageUrl} alt={s.title} loading="lazy" />
                    </div>
                  )}
                  <div className="service-list-body">
                    <h3 className="service-list-title">{s.title}</h3>
                    <div className="service-list-meta">
                      <span className="service-duration">{s.durationMinutes} min</span>
                      <span className="service-price">${Number(s.price).toFixed(2)}</span>
                    </div>
                  </div>
                  <Link to="/booking" className="btn-outline service-book-btn">
                    Book
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="section-cta" style={{ marginTop: '2.5rem' }}>
            <Link to="/booking" className="btn-primary">Book an Appointment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
