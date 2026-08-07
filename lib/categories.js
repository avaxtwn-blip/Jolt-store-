export const CATEGORIES = [
  'Anime Custom Apparel',
  "Men's T-Shirts & Shirts",
  'Winter Collection (Hoodies & Jackets)',
  'Casual Bottoms & Pants',
  'Accessories'
];

// Same keyword fallback as the original site: a product matches a category
// either by an exact "cat" field match, or by one of these keywords being
// present in its "cat" field. This lets loosely-tagged products (e.g.
// cat: "T shirt") still show up under "Men's T-Shirts & Shirts".
const CATEGORY_KEYWORDS = {
  'Anime Custom Apparel': ['anime', 'custom apparel'],
  "Men's T-Shirts & Shirts": ['t-shirt', 'tshirt', 't shirt', 'shirt'],
  'Winter Collection (Hoodies & Jackets)': ['hoodie', 'jacket', 'winter', 'sweater', 'fleece'],
  'Casual Bottoms & Pants': ['pant', 'bottom', 'trouser'],
  Accessories: ['accessor']
};

export function productMatchesCategory(product, label) {
  const cat = (product.cat || '').toLowerCase().trim();
  if (cat === label.toLowerCase()) return true;
  const keywords = CATEGORY_KEYWORDS[label] || [];
  return keywords.some((k) => cat.includes(k));
}
