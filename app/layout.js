import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Jolt Store',
    template: '%s | Jolt Store'
  },
  description: 'Stylish, durable gear built for every activity.',
  metadataBase: new URL('https://your-domain-here.com') // TODO: update once you buy the domain
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
