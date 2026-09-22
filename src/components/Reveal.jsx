import useReveal from "../hooks/useReveal";

/**
 * Wraps content and fades/slides it in when it enters the viewport.
 * Optional `delay` (ms) staggers animations within a group.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}