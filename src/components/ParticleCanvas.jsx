import { useEffect, useRef } from "react";

/**
 * Lightweight "data network" canvas — drifting particles connected by lines.
 * Renders nothing when prefers-reduced-motion is set (static frame only).
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let rafId = null;
    let particles = [];

    const colors = ["#22d3ee", "#818cf8", "#a78bfa"];

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(60, Math.max(24, Math.floor((width * height) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      // connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(129,140,248,${0.16 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // particle dots
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      rafId = requestAnimationFrame(step);
    };

    const handleResize = () => {
      init();
      if (reduceMotion) draw();
    };

    init();
    if (reduceMotion) {
      draw();
    } else {
      rafId = requestAnimationFrame(step);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 opacity-70 pointer-events-none">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}