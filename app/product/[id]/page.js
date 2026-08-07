import { getAllProducts, getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';

export const revalidate = 60; // regenerate each product page at most once a minute

// Tells Next.js which product pages to build in advance, so every product
// gets a real, pre-rendered HTML page at build time — this is the part that
// fixes the original SPA problem.
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

// Per-product <title>, meta description, and Open Graph tags — this is what
// makes each product distinguishable to Google and to link previews.
export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);
  if (!product) return {};

  return {
    title: product.name,
    description: product.desc,
    openGraph: {
      title: product.name,
      description: product.desc,
      images: product.images?.length ? [product.images[0]] : []
    }
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  // Structured data (schema.org Product) — helps Google show price/
  // availability directly in search results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.desc,
    image: product.images?.length ? product.images : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: product.price,
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <main className="container">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="product-detail">
        <div className="product-detail__image">
          {product.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <span style={{ color: 'var(--mute)' }}>{product.cat}</span>
          )}
        </div>

        <div>
          {product.badge ? <span className="badge">{product.badge}</span> : null}
          <h1>{product.name}</h1>
          <p className="product-detail__price">৳{product.price}</p>
          <p className="product-detail__desc">{product.desc}</p>

          {product.colors?.length ? (
            <div className="swatches">
              {product.colors.map((c) => (
                <span key={c} className="swatch" style={{ background: c }} />
              ))}
            </div>
          ) : null}

          {product.sizes?.length ? (
            <div className="sizes">
              {product.sizes.map((s) => (
                <span key={s} className="size-pill">{s}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
