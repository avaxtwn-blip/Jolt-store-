import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const DEFAULT_CONTENT = {
  heroImg: '',
  heroEyebrow: 'Jolt Outdoor Gear',
  heroTitle: 'Jolt Sport Project',
  heroDesc: 'Our new collection built for your everyday adventures. Bold colors and high-performance outerwear with standout design, only at Jolt.',
  heroBtn: 'Shop Now',
  promoImg: '',
  promoKicker: 'STORE LOCATOR',
  promoTitle: "Find Your Perfect Look at Jolt's Stylish New Store",
  promoDesc: "Jolt's new outlet has opened. Stop by our stylish, trend-forward store and browse the latest fashion collection in person.",
  promoSaveLabel: 'Enjoy a Special Discount!',
  promoPct: '50%',
  promoBtn: 'See On Maps',
  promoMapUrl: ''
};

export async function getSiteContent() {
  try {
    const snap = await getDoc(doc(db, 'jolt_settings', 'content'));
    return { ...DEFAULT_CONTENT, ...(snap.exists() ? snap.data() : {}) };
  } catch (err) {
    return DEFAULT_CONTENT;
  }
}
