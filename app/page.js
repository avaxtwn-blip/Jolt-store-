import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { productMatchesCategory } from '@/lib/categories';
import { getSiteContent } from '@/lib/siteContent';

export const revalidate = 60;

export default async function HomePage({ searchParams }) {
  const [products, content] = await Promise.all([getAllProducts(), getSiteContent()]);

  const category = searchParams?.category || null;
  const filtered = category
    ? products.filter((p) => productMatchesCategory(p, category))
    : products;

  const title = category || 'New Arrivals';
  const description = category
    ? `Browse our ${category.replace(/\s*\(.*\)/, '')} collection.`
    : 'Stylish, durable, and built for every activity.';

  return (
    <>
      {!category && (
        <section
          className="hero"
          style={content.heroImg ? { backgroundImage: `url(${content.heroImg})` } : undefined}
        >
          <div className="hero-inner">
            <div className="hero-eyebrow">{content.heroEyebrow}</div>
            <h1 className="hero-title">{content.heroTitle}</h1>
            <p className="hero-desc">{content.heroDesc}</p>
            {content.heroBtn && (
              <Link href="#new-arrivals" className="hero-btn">{content.heroBtn}</Link>
            )}
          </div>
        </section>
      )}

      <main className="container" id="new-arrivals">
        <div className="section-head">
          <div>
            <h2 style={{ marginTop: 32, marginBottom: 4 }}>{title}</h2>
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

      {!category && (
        <section className="promo">
          <div className="promo-img">
            {content.promoImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.promoImg} alt={content.promoTitle} />
            ) : null}
            <div className="promo-sale">SALE</div>
          </div>
          <div className="promo-text">
            <div className="promo-kicker">{content.promoKicker}</div>
            <h2 className="promo-title">{content.promoTitle}</h2>
            <p className="promo-desc">{content.promoDesc}</p>
            {content.promoSaveLabel && <div className="promo-save">{content.promoSaveLabel}</div>}
            {content.promoPct && <div className="promo-pct">{content.promoPct}</div>}
            {content.promoBtn && content.promoMapUrl && (
              <a href={content.promoMapUrl} target="_blank" rel="noopener noreferrer" className="promo-btn">
                {content.promoBtn}
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
                }
