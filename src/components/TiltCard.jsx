import { useRef, useEffect, useCallback } from "react";

/**
 * 3D tilt on hover — tracks cursor and applies perspective rotation.
 * Disabled automatically for touch devices and reduced-motion users.
 */
export default function TiltCard({ children, className = "", max = 10 }) {
  const ref = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(
        x * max
      ).toFixed(2)}deg)`;
    },
    [max]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return (
    <div ref={ref} className={`tilt-card ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}