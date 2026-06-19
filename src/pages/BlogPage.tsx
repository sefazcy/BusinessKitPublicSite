import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types/blog';
import { getPublicPosts } from '../api/blogApi';

function formatDate(dt: string | null): string {
  if (!dt) return '';
  return new Date(dt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicPosts()
      .then(({ data }) => setPosts(data))
      .catch(() => setError('Unable to load blog posts right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Blog</h1>
          <p className="page-hero-subtitle">Tips, news, and updates from our team.</p>
        </div>
      </div>

      <section className="section">
        <div className="container container-blog">
          {loading && <p className="placeholder-text">Loading posts…</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="placeholder-text">No posts yet — check back soon.</p>
          )}
          {!loading && !error && posts.length > 0 && (
            <div className="blog-list">
              {posts.map(post => (
                <article key={post.id} className="blog-card">
                  {post.coverImageUrl && (
                    <div className="blog-card-img">
                      <img src={post.coverImageUrl} alt={post.title} loading="lazy" />
                    </div>
                  )}
                  <div className="blog-card-body">
                    {post.category && (
                      <span className="blog-category">{post.category}</span>
                    )}
                    <h2 className="blog-card-title">{post.title}</h2>
                    {post.summary && (
                      <p className="blog-card-summary">{post.summary}</p>
                    )}
                    <div className="blog-card-footer">
                      {post.publishedAt && (
                        <time className="blog-date">{formatDate(post.publishedAt)}</time>
                      )}
                      <Link to={`/blog/${post.slug}`} className="blog-read-more">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
