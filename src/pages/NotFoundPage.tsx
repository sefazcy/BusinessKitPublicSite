import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-content">
      <section className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: 800, color: '#e2e8f0', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '1rem 0 0.5rem' }}>
          Page not found
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-primary">Go home</Link>
      </section>
    </div>
  );
}
