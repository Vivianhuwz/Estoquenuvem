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

    const client = await getPool().connect();
    try {
      const result = await client.query(
        "SELECT data, updated_at FROM inventory_data WHERE id = 1 LIMIT 1"
      );
      if (!result.rows.length) {
        return json(200, { ok: true, data: null, updatedAt: null });
      }
      const row = result.rows[0];
      return json(200, { ok: true, data: row.data, updatedAt: row.updated_at });
    } finally {
      client.release();
    }
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    const code = error && error.code ? error.code : null;
    if (code === "42P01") {
      return json(400, {
        ok: false,
        error: "TABLE_NOT_FOUND",
        message,
      });
    }
    return json(500, { ok: false, error: "SERVER_ERROR", message });
  }
};

