import { getAllProducts } from '@/lib/products';

// TODO: update this once you buy your domain
const SITE_URL = 'https://your-domain-here.com';

export default async function sitemap() {
  const products = await getAllProducts();

  const productUrls = products.map((p) => ({
    url: `${SITE_URL}/product/${p.id}`,
    lastModified: new Date()
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...productUrls
  ];
}
