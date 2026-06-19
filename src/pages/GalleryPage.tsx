import { useEffect, useState } from 'react';
import type { GalleryItem } from '../types/gallery';
import { getPublicGallery } from '../api/galleryApi';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicGallery()
      .then(({ data }) => {
        const active = data.filter(g => g.isActive);
        setItems(active);
        const cats = Array.from(
          new Set(active.map(g => g.category).filter((c): c is string => c !== null))
        );
        setCategories(cats);
      })
      .catch(() => setError('Unable to load gallery right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory
    ? items.filter(g => g.category === activeCategory)
    : items;

  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Our Gallery</h1>
          <p className="page-hero-subtitle">A look at our work and our space.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading && <p className="placeholder-text">Loading gallery…</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && (
            <>
              {categories.length > 0 && (
                <div className="category-filter">
                  <button
                    className={`cat-btn${activeCategory === '' ? ' active' : ''}`}
                    onClick={() => setActiveCategory('')}
                  >
                    All
                  </button>
                  {categories.map(c => (
                    <button
                      key={c}
                      className={`cat-btn${activeCategory === c ? ' active' : ''}`}
                      onClick={() => setActiveCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <p className="placeholder-text">No photos in this category yet.</p>
              )}

              <div className="gallery-grid gallery-grid-lg">
                {filtered.map(item => (
                  <div key={item.id} className="gallery-thumb">
                    <img src={item.imageUrl} alt={item.title} loading="lazy" />
                    <div className="gallery-thumb-overlay">
                      <span>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
