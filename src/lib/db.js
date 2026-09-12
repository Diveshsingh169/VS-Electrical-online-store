import mysql from 'mysql2/promise';

// Reuse a single pool across hot-reloads / requests (module singleton).
let pool = globalThis.__vsePool;

function getSslConfig() {
  // Aiven requires TLS. In production, paste its CA certificate into the
  // DB_SSL_CA environment variable (Vercel accepts multiline secret values).
  // Vercel can also store newlines as literal "\\n", so normalize them here.
  const ca = process.env.DB_SSL_CA?.replaceAll("\\n", "\n");
  const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false";

  if (!process.env.DB_HOST || process.env.DB_SSL === "false") return undefined;

  return ca ? { ca, rejectUnauthorized } : { rejectUnauthorized };
}

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "vs_electricals",

      ssl: getSslConfig(),
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
