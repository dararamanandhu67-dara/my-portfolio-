import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button, appears after scrolling down.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-7 right-7 z-[800] flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-purple/30 bg-deep-space/70 text-accent-purple backdrop-blur-md transition-all duration-300 hover:bg-accent-purple hover:text-white ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}