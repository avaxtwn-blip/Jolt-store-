import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// TODO: change this to your real domain once you buy one, e.g.
// new URL('https://joltstore.com'). Every canonical/OG URL is built from
// this value, so it must always match wherever the site is actually live.
const SITE_URL = 'https://jolt-store.netlify.app';

export const metadata = {
  title: {
    default: 'Jolt Store',
    template: '%s | Jolt Store'
  },
  description: 'Stylish, durable gear built for every activity.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    siteName: 'Jolt Store',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Jolt Store',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
