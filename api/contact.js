// ---------------------------------------------------------------------------
// POST /api/contact
// Serverless contact endpoint (Vercel Node.js function).
//
// Accepts: { name, email, subject?, message, company? }  (company = honeypot)
// Sends the message to CONTACT_TO_EMAIL using the first provider that is
// configured via environment variables:
//   1. RESEND_API_KEY      -> https://resend.com  (recommended)
//   2. CONTACT_WEBHOOK_URL -> any JSON webhook (Formspree, Make, Zapier, ...)
//
// If no provider is configured the endpoint answers 503 and the frontend
// falls back to a "mail me directly" message.
// ---------------------------------------------------------------------------

const LIMITS = { name: 80, email: 160, subject: 140, message: 5000 };

const RATE = {
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // requests per IP per window
};

// Best-effort in-memory rate limit (per warm instance).
const hits = new Map();

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function getIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > RATE.windowMs) {
    hits.set(ip, { start: now, count: 1 });
    if (hits.size > 5000) hits.clear();
    return false;
  }
  entry.count += 1;
  return entry.count > RATE.max;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || ""));
}

function clean(value, max) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 100 * 1024) reject(new Error("Payload too large"));
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

async function sendWithResend({ name, email, subject, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "dararamanandhu67@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  const html = `
    <h2 style="font-family:sans-serif">New portfolio message</h2>
    <p style="font-family:sans-serif"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="font-family:sans-serif"><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p style="font-family:sans-serif"><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>
    <hr />
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend error ${response.status}: ${detail.slice(0, 300)}`);
  }
  return { provider: "resend" };
}

async function sendWithWebhook({ name, email, subject, message }) {
  const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      subject: subject || "",
      message,
      source: "ramanandhu.vercel.app",
      sentAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook error ${response.status}`);
  }
  return { provider: "webhook" };
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return send(res, 204, {});
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return send(res, 405, { ok: false, error: "Method not allowed" });
  }

  if (isRateLimited(getIp(req))) {
    return send(res, 429, {
      ok: false,
      error: "Too many messages sent. Please try again in a few minutes.",
    });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return send(res, 400, { ok: false, error: error.message });
  }

  // Honeypot: real users never fill this field.
  if (clean(body.company, 100)) {
    return send(res, 200, { ok: true, delivered: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const subject = clean(body.subject, LIMITS.subject);
  const message = String(body.message ?? "").trim().slice(0, LIMITS.message);

  const errors = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Message is too short.";

  if (Object.keys(errors).length) {
    return send(res, 422, { ok: false, error: "Please check the form.", errors });
  }

  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasWebhook = Boolean(process.env.CONTACT_WEBHOOK_URL);

  if (!hasResend && !hasWebhook) {
    console.warn("[contact] No email provider configured (RESEND_API_KEY / CONTACT_WEBHOOK_URL).");
    return send(res, 503, {
      ok: false,
      code: "not_configured",
      error: "The contact form is not configured yet.",
      fallbackEmail: process.env.CONTACT_TO_EMAIL || "dararamanandhu67@gmail.com",
    });
  }

  try {
    const result = hasResend
      ? await sendWithResend({ name, email, subject, message })
      : await sendWithWebhook({ name, email, subject, message });

    return send(res, 200, { ok: true, delivered: true, provider: result.provider });
  } catch (error) {
    console.error("[contact] delivery failed:", error.message);
    return send(res, 502, {
      ok: false,
      error: "Message could not be delivered right now. Please email me directly.",
      fallbackEmail: process.env.CONTACT_TO_EMAIL || "dararamanandhu67@gmail.com",
    });
  }
}
