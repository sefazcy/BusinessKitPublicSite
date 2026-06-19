import { Link } from 'react-router-dom';

export default function BookingPage() {
  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Book an Appointment</h1>
          <p className="page-hero-subtitle">
            Choose your service and preferred time — we'll confirm shortly.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container container-narrow">
          <div className="placeholder-card">
            <div className="placeholder-icon">📅</div>
            <h2 className="placeholder-card-title">Booking Coming Soon</h2>
            <p className="placeholder-card-text">
              Our online booking system is being set up. In the meantime, please
              contact us directly to schedule your appointment.
            </p>
            <div className="placeholder-card-actions">
              <Link to="/contact" className="btn-primary">Contact Us to Book</Link>
              <Link to="/services" className="btn-outline">Browse Services</Link>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3 className="info-card-title">Walk-ins Welcome</h3>
              <p className="info-card-text">
                No appointment? No problem. We accept walk-ins based on availability.
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-card-title">Phone Booking</h3>
              <p className="info-card-text">
                Call us during business hours and we'll find the perfect slot for you.
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-card-title">Fast Confirmation</h3>
              <p className="info-card-text">
                All bookings are confirmed within a few hours — usually much sooner.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
