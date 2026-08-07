'use client';

import { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// Same admin check as the original site: only this email can manage
// products. Update this if your admin account is different.
const ADMIN_EMAIL = 'arhanshaid6@gmail.com';

const EMPTY_FORM = {
  name: '',
  price: '',
  desc: '',
  cat: '',
  badge: '',
  images: '', // comma-separated URLs, kept simple for now
  colors: '', // comma-separated hex codes, e.g. #111111,#ffffff
  sizes: '' // comma-separated, e.g. S,M,L,XL
};

export default function AdminPage() {
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const isAdmin = user && user.email === ADMIN_EMAIL;

  useEffect(() => {
    if (isAdmin) loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  async function loadProducts() {
    setLoadingProducts(true);
    try {
      const q = query(collection(db, 'jolt_products'), orderBy('createdAt', 'asc'));
      const snap = await getDocs(q);
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setStatusMsg('Failed to load products: ' + err.message);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (cred.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setLoginError('This account is not authorized for admin access.');
      }
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name || '',
      price: p.price ?? '',
      desc: p.desc || '',
      cat: p.cat || '',
      badge: p.badge || '',
      images: (p.images || []).join(', '),
      colors: (p.colors || []).join(', '),
      sizes: (p.sizes || []).join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setStatusMsg('');

    const payload = {
      name: form.name.trim(),
      price: Number(form.price) || 0,
      desc: form.desc.trim(),
      cat: form.cat.trim(),
      badge: form.badge.trim() || null,
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map((s) => s.trim()).filter(Boolean),
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'jolt_products', editingId), payload);
        setStatusMsg('Product updated. It will appear on the live site within about a minute.');
      } else {
        await addDoc(collection(db, 'jolt_products'), {
          ...payload,
          createdAt: serverTimestamp()
        });
        setStatusMsg('Product added. It will appear on the live site within about a minute.');
      }
      resetForm();
      await loadProducts();
    } catch (err) {
      setStatusMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'jolt_products', id));
      setStatusMsg('Product deleted.');
      await loadProducts();
    } catch (err) {
      setStatusMsg('Error: ' + err.message);
    }
  }

  // ---- Not logged in yet ----
  if (user === undefined) {
    return <main className="container admin-wrap"><p>Loading…</p></main>;
  }

  if (!isAdmin) {
    return (
      <main className="container admin-wrap">
        <h1>Admin Login</h1>
        <form className="admin-login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit" className="admin-btn-primary">Log in</button>
          {loginError && <p className="admin-error">{loginError}</p>}
        </form>
      </main>
    );
  }

  // ---- Logged in as admin ----
  return (
    <main className="container admin-wrap">
      <div className="admin-top">
        <h1>Admin — Products</h1>
        <button className="admin-btn-secondary" onClick={() => signOut(auth)}>Log out</button>
      </div>

      {statusMsg && <p className="admin-status">{statusMsg}</p>}

      <form className="admin-product-form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Edit product' : 'Add new product'}</h2>

        <label>Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

        <label>Price (৳)</label>
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />

        <label>Category</label>
        <input value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} placeholder="e.g. Accessories" />

        <label>Badge (optional)</label>
        <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Limited, New arrival" />

        <label>Description</label>
        <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={4} required />

        <label>Image URLs (comma-separated)</label>
        <input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="https://..., https://..." />

        <label>Colors (comma-separated hex codes)</label>
        <input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="#111111, #ffffff" />

        <label>Sizes (comma-separated)</label>
        <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="S, M, L, XL" />

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : editingId ? 'Update product' : 'Add product'}
          </button>
          {editingId && (
            <button type="button" className="admin-btn-secondary" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <h2 style={{ marginTop: 40 }}>All products ({products.length})</h2>
      {loadingProducts ? (
        <p>Loading products…</p>
      ) : (
        <div className="admin-product-list">
          {products.map((p) => (
            <div key={p.id} className="admin-product-row">
              <div className="admin-product-thumb">
                {p.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.name} />
                ) : (
                  <span>{p.cat}</span>
                )}
              </div>
              <div className="admin-product-info">
                <strong>{p.name}</strong>
                <span>৳{p.price} · {p.cat}</span>
              </div>
              <div className="admin-product-actions">
                <button className="admin-btn-secondary" onClick={() => startEdit(p)}>Edit</button>
                <button className="admin-btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
