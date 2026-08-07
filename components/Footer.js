import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <div className="logo">Jolt</div>
          <p>Enjoy the great outdoors with style. Shop Jolt now for your next adventure.</p>
        </div>

        <div>
          <h4>Categories</h4>
          <ul>
            <li><Link href="/">Anime Custom Apparel</Link></li>
            <li><Link href="/">Men&apos;s T-Shirts &amp; Shirts</Link></li>
            <li><Link href="/">Winter Collection (Hoodies &amp; Jackets)</Link></li>
            <li><Link href="/">Casual Bottoms &amp; Pants</Link></li>
            <li><Link href="/">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4>Customer Care</h4>
          <ul>
            <li><Link href="/">FAQ</Link></li>
            <li><Link href="/">Shipping</Link></li>
            <li><Link href="/">Order Status</Link></li>
            <li><Link href="/">Return &amp; Refund Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link href="/">About Us</Link></li>
            <li><Link href="/">Privacy</Link></li>
            <li><Link href="/">Terms of Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="foot-bottom">
        <span>© 2026 Jolt Studio, Inc — All Rights Reserved</span>
        <span>BDT ৳ | English</span>
      </div>
    </footer>
  );
    }
