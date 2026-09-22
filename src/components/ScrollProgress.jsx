import { useEffect, useState } from "react";

/**
 * Thin gradient progress bar fixed to the top of the viewport.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #d946ef)",
          boxShadow: "0 0 10px rgba(139,92,246,0.5), 0 0 20px rgba(6,182,212,0.3)",
        }}
      />
    </div>
  );
}