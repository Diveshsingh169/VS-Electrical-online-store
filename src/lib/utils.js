// Small shared helpers used across server and client components.

/** Join class names, dropping falsy values. */
export function cx(...args) {
  return args.filter(Boolean).join(' ');
}

/** Append Unsplash sizing params to a base image URL (idempotent). */
export function unsplash(base, w = 800) {
  if (!base) return '';
  if (base.includes('?')) return base;
  return `${base}?auto=format&fit=crop&w=${w}&q=80`;
}

/** Format a number as Indian Rupees, or return null when price is absent. */
export function inr(n) {
  if (n === null || n === undefined || n === '') return null;
  const num = Number(n);
  if (Number.isNaN(num)) return null;
  return '₹' + num.toLocaleString('en-IN');
}

/** Safely parse a JSON column that may already be an object/array. */
export function parseJSON(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
