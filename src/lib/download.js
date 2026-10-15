export function triggerDownload(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  if (filename) link.download = filename;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function staticFileExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (!response.ok) return false;
    const type = response.headers.get("content-type") || "";
    return !type.includes("text/html");
  } catch {
    return false;
  }
}
