import { useRef, useState } from "react";
import { AlertCircle, Check, Download, Loader2 } from "lucide-react";
import { getResumeMeta } from "../lib/api";
import { staticFileExists, triggerDownload } from "../lib/download";
import { personal, socials } from "../data/portfolio";

/**
 * ResumeButton — downloads the resume through the backend.
 *
 * 1. Asks `/api/resume?meta=1` whether the PDF exists.
 * 2. Streams it from `/api/resume` (correct filename + attachment headers).
 * 3. Falls back to the static `/resume/...` file when the API is not running
 *    (e.g. plain `npm run dev` without `vercel dev`), and shows a clear
 *    message instead of a broken 404 download.
 */
export default function ResumeButton({
  className = "btn-resume",
  iconSize = 16,
  label = "Resume",
  busyLabel = "Preparing…",
  doneLabel = "Downloaded",
}) {
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState(null);
  const resetTimer = useRef(null);
  const toastTimer = useRef(null);

  const scheduleReset = () => {
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 2600);
  };

  const showToast = (message, tone) => {
    window.clearTimeout(toastTimer.current);
    setToast({ message, tone });
    toastTimer.current = window.setTimeout(() => setToast(null), 7000);
  };

  const handleClick = async () => {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const meta = await getResumeMeta();

      if (meta.available) {
        triggerDownload(meta.downloadUrl || "/api/resume", meta.filename);
        setStatus("done");
        scheduleReset();
        showToast("Your download has started — thanks for your interest!", "success");
        return;
      }

      setStatus("error");
      scheduleReset();
      showToast(
        meta.message || `Resume is being updated. Email me at ${socials.email} and I'll send it.`,
        "error"
      );
    } catch {
      // Backend unreachable (local `vite dev`) — use the static file if present.
      const fallbackName = personal.resumeUrl.split("/").pop();
      if (await staticFileExists(personal.resumeUrl)) {
        triggerDownload(personal.resumeUrl, fallbackName);
        setStatus("done");
        scheduleReset();
        showToast("Your download has started — thanks for your interest!", "success");
      } else {
        setStatus("error");
        scheduleReset();
        showToast(
          `Resume isn't available yet. Email me at ${socials.email} and I'll share it right away.`,
          "error"
        );
      }
    }
  };

  const icon =
    status === "loading" ? (
      <Loader2 size={iconSize} className="animate-spin" aria-hidden="true" />
    ) : status === "done" ? (
      <Check size={iconSize} aria-hidden="true" />
    ) : status === "error" ? (
      <AlertCircle size={iconSize} aria-hidden="true" />
    ) : (
      <Download size={iconSize} aria-hidden="true" />
    );

  const text = status === "loading" ? busyLabel : status === "done" ? doneLabel : label;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`${className} cursor-pointer disabled:cursor-wait`}
        aria-label="Download resume (PDF)"
        aria-busy={status === "loading"}
        disabled={status === "loading"}
      >
        {icon}
        {text}
      </button>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[70] max-w-xs rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl ${
            toast.tone === "success"
              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
              : "border-amber-400/30 bg-amber-500/10 text-amber-100"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </>
  );
}
