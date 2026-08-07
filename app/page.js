import Link from 'next/link';
import { getAllProducts } from '@/lib/products';

export const revalidate = 60; // rebuild this page at most once a minute

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="container">
      <h1 style={{ marginTop: 32 }}>New Arrivals</h1>
      <p style={{ color: 'var(--mute)' }}>
        Stylish, durable, and built for every activity.
      </p>

      <div className="product-grid">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="product-card">
            <div className="product-card__image">
              {p.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.images[0]}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ color: 'var(--mute)', fontSize: 12 }}>{p.cat}</span>
              )}
            </div>
            <div className="product-card__body">
              {p.badge ? <span className="badge">{p.badge}</span> : null}
              <p className="product-card__name">{p.name}</p>
              <p className="product-card__price">৳{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
          }
