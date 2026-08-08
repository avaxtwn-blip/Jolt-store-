import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <main className="container not-found">
      <h1>404</h1>
      <p>We couldn&apos;t find the page you were looking for.</p>
      <Link href="/" className="hero-btn not-found-btn">Back to Store</Link>
    </main>
  );
}
