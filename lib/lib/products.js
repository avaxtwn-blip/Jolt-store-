import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

// Fetches every product from Firestore. Used at build time (SSG) so each
// product gets its own real, crawlable HTML page.
export async function getAllProducts() {
  const q = query(collection(db, 'jolt_products'), orderBy('createdAt', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find((p) => p.id === id) || null;
}

// Turns a Firestore Timestamp (or anything else) into a plain serializable
// value, since Next.js page props must be JSON-serializable.
export function serializeProduct(p) {
  return {
    ...p,
    createdAt: p.createdAt?.toDate ? p.createdAt.toDate().toISOString() : null
  };
}
