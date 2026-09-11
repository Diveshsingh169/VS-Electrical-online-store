import { query } from './db';
import { parseJSON } from './utils';

function mapProduct(row) {
  return {
    ...row,
    price: row.price === null || row.price === undefined ? null : Number(row.price),
    rating: row.rating === null || row.rating === undefined ? null : Number(row.rating),
    is_featured: !!row.is_featured,
    is_new: !!row.is_new,
    gallery: parseJSON(row.gallery, []),
    features: parseJSON(row.features, []),
    specifications: parseJSON(row.specifications, {}),
  };
}

export async function getCategories() {
  const rows = await query(
    `SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count
     FROM categories c ORDER BY c.sort_order ASC, c.name ASC`
  );
  return rows;
}

export async function getCategoryBySlug(slug) {
  const rows = await query(`SELECT * FROM categories WHERE slug = ? LIMIT 1`, [slug]);
  return rows[0] || null;
}

const SORTS = {
  featured: 'p.is_featured DESC, p.rating DESC, p.created_at DESC',
  newest: 'p.created_at DESC',
  'name-asc': 'p.name ASC',
  'name-desc': 'p.name DESC',
  'price-asc': 'p.price ASC',
  'price-desc': 'p.price DESC',
  rating: 'p.rating DESC',
};

export async function getProducts({ category, q, sort, featured, limit } = {}) {
  const where = [];
  const params = [];

  if (category) {
    where.push('c.slug = ?');
    params.push(category);
  }
  if (q) {
    where.push('(p.name LIKE ? OR p.short_description LIKE ? OR c.name LIKE ?)');
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (featured) {
    where.push('p.is_featured = 1');
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const orderSql = `ORDER BY ${SORTS[sort] || SORTS.featured}`;
  const limitSql = limit ? `LIMIT ${Math.max(1, Math.min(60, parseInt(limit, 10) || 12))}` : '';

  const rows = await query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon
     FROM products p
     JOIN categories c ON c.id = p.category_id
     ${whereSql} ${orderSql} ${limitSql}`,
    params
  );
  return rows.map(mapProduct);
}

export async function getFeaturedProducts(limit = 8) {
  return getProducts({ featured: true, limit });
}

export async function getProductBySlug(slug) {
  const rows = await query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon
     FROM products p
     JOIN categories c ON c.id = p.category_id
     WHERE p.slug = ? LIMIT 1`,
    [slug]
  );
  return rows[0] ? mapProduct(rows[0]) : null;
}

export async function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const rows = await query(
    `SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.icon AS category_icon
     FROM products p
     JOIN categories c ON c.id = p.category_id
     WHERE p.category_id = ? AND p.id <> ?
     ORDER BY p.is_featured DESC, p.rating DESC
     LIMIT ${Math.max(1, Math.min(12, parseInt(limit, 10) || 4))}`,
    [product.category_id, product.id]
  );
  return rows.map(mapProduct);
}

export async function getProductSlugs() {
  const rows = await query(`SELECT slug FROM products`);
  return rows.map((r) => r.slug);
}
