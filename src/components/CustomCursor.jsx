import { useEffect, useState } from "react";

/**
 * Custom cursor for desktop only (pointer: fine). A glowing dot +
 * trail ring, hidden on touch devices and reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    // Set root cursor style
    document.documentElement.style.cursor = "none";
    // Keep it visible inside our custom elements
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      html.custom-active, html.custom-active body { cursor: none !important; }
      html.custom-active a, html.custom-active button, html.custom-active input,
      html.custom-active textarea, html.custom-active [role="button"] { cursor: none !important; }
    `;
    document.documentElement.classList.add("custom-active");
    document.head.appendChild(styleEl);
    setEnabled(true);

    return () => {
      document.documentElement.style.cursor = "";
      document.documentElement.classList.remove("custom-active");
      styleEl.remove();
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = document.createElement("div");
    const trail = document.createElement("div");
    const glow = document.createElement("div");
    const style = `position:fixed;pointer-events:none;top:0;left:0;z-index:999999;transform:translate(-50%,-50%);`;
    dot.style.cssText = `${style}width:10px;height:10px;border-radius:50%;background:#fff;mix-blend-mode:difference;`;
    trail.style.cssText = `${style}width:36px;height:36px;border-radius:50%;border:1.5px solid rgba(139,92,246,0.5);transition:width .2s,height .2s;`;
    glow.style.cssText = `${style}width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%);`;
    document.body.appendChild(dot);
    document.body.appendChild(trail);
    document.body.appendChild(glow);

    let mx = 0, my = 0, tx = 0, ty = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      glow.style.left = `${mx}px`;
      glow.style.top = `${my}px`;
      const target = e.target.closest("a,button,input,textarea,[role='button']");
      const scale = target ? 1.6 : 1;
      dot.style.transition = `transform .15s ease`;
      dot.style.transform = `translate(-50%,-50%) scale(${scale})`;
      trail.style.width = target ? "52px" : "36px";
      trail.style.height = target ? "52px" : "36px";
    };

    const lerp = () => {
      tx += (mx - tx) * 0.16;
      ty += (my - ty) * 0.16;
      trail.style.left = `${tx}px`;
      trail.style.top = `${ty}px`;
      raf = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      dot.remove();
      trail.remove();
      glow.remove();
    };
  }, [enabled]);

  return null;
}