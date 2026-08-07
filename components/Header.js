'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/categories';

function comingSoon(feature) {
  // Placeholder until the real feature (cart, login, search) is built.
  alert(`${feature} is coming soon.`);
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="head-left">
          <button
            className="hamburger-btn"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        <Link href="/" className="logo">Jolt</Link>

        <div className="head-actions">
          <button className="iconbtn" onClick={() => comingSoon('Search')} aria-label="Search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
          </button>
          <button className="iconbtn cart-btn" onClick={() => comingSoon('Cart')} aria-label="Cart">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-count">0</span>
          </button>
        </div>
      </header>

      {/* Overlay + slide-in drawer */}
      <div
        className={`overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />
      <div className={`nav-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <span className="logo">Jolt</span>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <div className="nav-drawer-body">
          <div className="drawer-section-label">Browse</div>
          <nav className="drawer-nav">
            <button
              type="button"
              className="drawer-nav-toggle"
              onClick={() => setCategoriesOpen((v) => !v)}
            >
              <span>Categories</span>
              <span className={`dn-chevron ${categoriesOpen ? 'rotated' : ''}`}>›</span>
            </button>
            {categoriesOpen && (
              <div className="drawer-submenu">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/?category=${encodeURIComponent(cat)}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/" onClick={() => setDrawerOpen(false)}>Store</Link>
            <button type="button" onClick={() => { setDrawerOpen(false); comingSoon('Blog'); }}>
              Blog
            </button>
          </nav>

          <div className="drawer-divider" />

          <div className="drawer-section-label">Account</div>
          <button
            className="iconbtn drawer-login-btn"
            onClick={() => { setDrawerOpen(false); comingSoon('Login / Sign up'); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
            </svg>
            <span>Login / Sign Up</span>
          </button>
        </div>
      </div>
    </>
  );
  }
