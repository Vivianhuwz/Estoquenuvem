const { Pool } = require("pg");

let pool;

function getPool() {
  if (pool) return pool;
  const connectionString = process.env.NEON_DATABASE_URL;
  if (!connectionString) {
    throw new Error("NEON_DATABASE_URL is not set");
  }
  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });
  return pool;
}

function json(statusCode, body, extraHeaders) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(extraHeaders || {}),
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { ok: false, error: "METHOD_NOT_ALLOWED" }, { Allow: "POST" });
    }

    const requiredToken = process.env.SYNC_TOKEN;
    if (requiredToken) {
      const token =
        event.headers["x-sync-token"] ||
        event.headers["X-Sync-Token"] ||
        event.headers["x-sync-token".toLowerCase()];
      if (token !== requiredToken) {
        return json(401, { ok: false, error: "UNAUTHORIZED" });
      }
    }

    const payload = event.body ? JSON.parse(event.body) : null;
    const data = payload && Object.prototype.hasOwnProperty.call(payload, "data") ? payload.data : undefined;
    if (typeof data === "undefined") {
      return json(400, { ok: false, error: "INVALID_BODY" });
    }

    const client = await getPool().connect();
    try {
      const now = new Date().toISOString();
      await client.query(
        "INSERT INTO inventory_data (id, data, created_at, updated_at) VALUES (1, $1::jsonb, $2, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at",
        [JSON.stringify(data), now]
      );
      return json(200, { ok: true, updatedAt: now });
    } finally {
      client.release();
    }
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    const code = error && error.code ? error.code : null;
    if (code === "42P01") {
      return json(400, { ok: false, error: "TABLE_NOT_FOUND", message });
    }
    return json(500, { ok: false, error: "SERVER_ERROR", message });
  }
};

