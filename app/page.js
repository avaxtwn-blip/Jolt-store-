import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { productMatchesCategory } from '@/lib/categories';

export const revalidate = 60;

export default async function HomePage({ searchParams }) {
  const products = await getAllProducts();

  const category = searchParams?.category || null;
  const filtered = category
    ? products.filter((p) => productMatchesCategory(p, category))
    : products;

  const title = category || 'New Arrivals';
  const description = category
    ? `Browse our ${category.replace(/\s*\(.*\)/, '')} collection.`
    : 'Stylish, durable, and built for every activity.';

  return (
    <main className="container">
      <div className="section-head">
        <div>
          <h1 style={{ marginTop: 32, marginBottom: 4 }}>{title}</h1>
          <p style={{ color: 'var(--mute)', margin: 0 }}>{description}</p>
        </div>
        {category && (
          <Link href="/" className="clear-filter-btn">Clear filter ✕</Link>
        )}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--mute)', padding: '32px 0' }}>
          No products found in this category yet.
        </p>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
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
      )}
    </main>
  );
}
