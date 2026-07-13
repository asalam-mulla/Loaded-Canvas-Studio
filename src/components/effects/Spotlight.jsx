import { useRef } from "react";
import { cn } from "../../lib/cn";

/**
 * Wraps any surface (a gallery card, the hero, a story panel) with a soft
 * ochre glow that tracks the pointer — the site's one recurring signature
 * motif, meant to evoke a gallery spotlight passing over a canvas.
 *
 * Position is written straight to CSS custom properties via a ref rather
 * than React state, so the glow can track the mouse at 60fps without
 * triggering re-renders. Disabled automatically for touch/coarse pointers
 * and under prefers-reduced-motion, where it would add nothing but noise.
 */
export function Spotlight({ className, children, strength = 1, ...props }) {
  const ref = useRef(null);

  function handlePointerMove(event) {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      style={{ "--spot-opacity": strength }}
      className={cn("group/spotlight relative isolate overflow-hidden", className)}
      {...props}
    >
      {children}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500",
          "motion-safe:group-hover/spotlight:opacity-[var(--spot-opacity)]"
        )}
        style={{
          background:
            "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-spotlight) 16%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
