import mysql from 'mysql2/promise';

// Reuse a single pool across hot-reloads / requests (module singleton).
let pool = globalThis.__vsePool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "vs_electricals",

      ssl: process.env.DB_HOST ? { rejectUnauthorized: true } : undefined,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      dateStrings: true,
    });
    globalThis.__vsePool = pool;
  }
  return pool;
}

/**
 * Run a query. Returns rows. On any DB error we log and return an empty array,
 * so the site still renders (empty state) before MySQL is configured/seeded.
 */
export async function query(sql, params = []) {
  try {
    const [rows] = await getPool().execute(sql, params);
    return rows;
  } catch (err) {
    console.warn(
      '\n[VS Electricals] Database query failed — is MySQL running and .env.local configured, ' +
        'and has database/schema.sql been imported?\n  ' +
        err.code +
        ': ' +
        err.message +
        '\n'
    );
    return [];
  }
}
