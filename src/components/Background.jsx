/**
 * Global fixed background: 4 floating cosmic orbs (blurred), subtle grid,
 * vignette. Pure CSS + pointer-events: none.
 */
export default function Background() {
  const orbs = [
    {
      className: "bg-accent-purple",
      style: { width: "65vw", height: "65vw", top: "-20%", right: "-15%" },
      duration: "20s",
      delay: "0s",
    },
    {
      className: "bg-accent-cyan",
      style: { width: "55vw", height: "55vw", bottom: "-20%", left: "-15%" },
      duration: "28s",
      delay: "-5s",
    },
    {
      className: "bg-accent-pink",
      style: { width: "45vw", height: "45vw", top: "35%", left: "45%" },
      duration: "25s",
      delay: "-10s",
      opacity: 0.1,
    },
    {
      className: "bg-accent-blue",
      style: { width: "50vw", height: "50vw", top: "-15%", left: "-10%" },
      duration: "32s",
      delay: "-15s",
      opacity: 0.08,
    },
  ];

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-cosmic to-cosmic" />

      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-orb-float ${orb.className}`}
          style={{
            ...orb.style,
            filter: "blur(140px)",
            opacity: orb.opacity ?? 0.18,
            animationDuration: orb.duration,
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(3,2,11,0.75)_100%)]" />
    </div>
  );
}