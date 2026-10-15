// ---------------------------------------------------------------------------
// Small client for the portfolio backend (Vercel functions in /api).
// In production the API lives on the same origin; set VITE_API_BASE only if
// the backend is deployed somewhere else.
// ---------------------------------------------------------------------------

const API_BASE = String(import.meta.env.VITE_API_BASE ?? "").replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, { code, status, fallbackEmail, errors } = {}) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.fallbackEmail = fallbackEmail;
    this.errors = errors;
  }
}

async function postJson(path, payload) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError("Network error — please check your connection and try again.");
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || data.ok === false) {
    throw new ApiError(data.error || "Something went wrong. Please try again.", {
      code: data.code,
      status: response.status,
      fallbackEmail: data.fallbackEmail,
      errors: data.errors,
    });
  }

  return data;
}

export function sendContactMessage(payload) {
  return postJson("/api/contact", payload);
}

export async function getResumeMeta() {
  let response;
  try {
    response = await fetch(`${API_BASE}/api/resume?meta=1`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
  } catch {
    throw new ApiError("unreachable", { code: "unreachable" });
  }

  if (!response.ok) {
    throw new ApiError("unreachable", { code: "unreachable", status: response.status });
  }

  return response.json();
}
