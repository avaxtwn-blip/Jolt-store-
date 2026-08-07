// TODO: update this once you buy your domain
const SITE_URL = 'https://your-domain-here.com';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
