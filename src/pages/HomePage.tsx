import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types/service';
import type { GalleryItem } from '../types/gallery';
import { getPublicServices } from '../api/servicesApi';
import { getPublicGallery } from '../api/galleryApi';

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    getPublicServices()
      .then(({ data }) => setServices(data.filter(s => s.isActive).slice(0, 3)))
      .catch(() => {});
    getPublicGallery()
      .then(({ data }) => setGallery(data.filter(g => g.isActive).slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner container">
          <h1 className="hero-title">Your Style, Our Craft</h1>
          <p className="hero-subtitle">
            Premium services tailored to you. Walk in or book your appointment online.
          </p>
          <div className="hero-actions">
            <Link to="/booking" className="btn-primary">Book an Appointment</Link>
            <Link to="/services" className="btn-secondary">View Services</Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Everything you need, under one roof.</p>
          </div>
          {services.length > 0 ? (
            <div className="service-cards">
              {services.map(s => (
                <div key={s.id} className="service-card">
                  {s.imageUrl && (
                    <div className="service-card-img">
                      <img src={s.imageUrl} alt={s.title} loading="lazy" />
                    </div>
                  )}
                  <div className="service-card-body">
                    <h3 className="service-card-title">{s.title}</h3>
                    <div className="service-card-meta">
                      <span className="service-duration">{s.durationMinutes} min</span>
                      <span className="service-price">${Number(s.price).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="placeholder-text">Services are being updated. Check back soon.</p>
          )}
          <div className="section-cta">
            <Link to="/services" className="btn-outline">See All Services</Link>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section cta-banner">
        <div className="container cta-inner">
          <div>
            <h2 className="cta-title">Ready to book?</h2>
            <p className="cta-text">Choose your service and pick a time that works for you.</p>
          </div>
          <Link to="/booking" className="btn-primary">Book Now</Link>
        </div>
      </section>

      {/* Gallery preview */}
      {gallery.length > 0 && (
        <section className="section bg-light">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Work</h2>
              <p className="section-subtitle">A glimpse of what we do best.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map(item => (
                <div key={item.id} className="gallery-thumb">
                  <img src={item.imageUrl} alt={item.title} loading="lazy" />
                  <div className="gallery-thumb-overlay">
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="section-cta">
              <Link to="/gallery" className="btn-outline">View Full Gallery</Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">
              Questions? We'd love to hear from you.
            </p>
          </div>
          <div className="section-cta">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
