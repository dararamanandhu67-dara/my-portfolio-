// ---------------------------------------------------------------------------
// GET /api/resume?meta=1  -> JSON: { available, filename, size, downloads }
// GET /api/resume         -> streams the resume PDF as a file download
//
// The PDF itself lives in `public/resume/` and is served by the CDN; this
// endpoint adds a proper `Content-Disposition: attachment` header, a friendly
// JSON error when the file is missing, and an optional download counter.
//
// Configuration (all optional):
//   RESUME_PATH      default "/resume/DARA_RAMANANDHU_Resume.pdf"
//   RESUME_FILENAME  name shown to the visitor, default from RESUME_PATH
//   SITE_URL         public site URL, default derived from the request host
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN  -> persistent counter
// ---------------------------------------------------------------------------

const RESUME_PATH = process.env.RESUME_PATH || "/resume/DARA_RAMANANDHU_Resume.pdf";
const RESUME_FILENAME =
  process.env.RESUME_FILENAME || RESUME_PATH.split("/").pop() || "resume.pdf";

let memoryDownloads = 0;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function baseUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const host = req.headers["x-forwarded-host"] || req.headers.host || "";
  const proto = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${proto}://${host}`;
}

async function upstash(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/${command}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.result ?? null;
  } catch {
    return null;
  }
}

async function bumpCounter() {
  const stored = await upstash("incr/portfolio:resume:downloads");
  if (stored !== null) return Number(stored);
  memoryDownloads += 1;
  return memoryDownloads;
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return send(res, 405, { ok: false, error: "Method not allowed" });
  }

  const meta = typeof req.query?.meta === "string" ? req.query.meta === "1" : false;
  const fileUrl = `${baseUrl(req)}${RESUME_PATH}`;

  let head;
  try {
    head = await fetch(fileUrl, { method: "HEAD", cache: "no-store" });
  } catch {
    head = null;
  }

  const contentType = head?.headers.get("content-type") || "";
  const available = Boolean(head?.ok) && contentType.includes("pdf");

  if (meta) {
    if (!available) {
      return send(res, 200, {
        available: false,
        filename: RESUME_FILENAME,
        message: "Resume is being updated. Please check back soon.",
      });
    }
    return send(res, 200, {
      available: true,
      filename: RESUME_FILENAME,
      size: Number(head.headers.get("content-length") || 0),
      downloads: (await upstash("get/portfolio:resume:downloads")) ?? null,
      downloadUrl: "/api/resume",
    });
  }

  if (!available) {
    return send(res, 404, {
      ok: false,
      code: "resume_missing",
      error: "Resume is not available right now. Please reach out by email.",
    });
  }

  try {
    const response = await fetch(fileUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Upstream ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", String(buffer.length));
    res.setHeader("Content-Disposition", `attachment; filename="${RESUME_FILENAME}"`);
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("X-Robots-Tag", "noindex");
    res.end(req.method === "HEAD" ? undefined : buffer);

    if (req.method === "GET") bumpCounter().catch(() => {});
  } catch (error) {
    console.error("[resume] failed to stream file:", error.message);
    return send(res, 502, {
      ok: false,
      error: "Resume download failed. Please try again in a moment.",
    });
  }
}
