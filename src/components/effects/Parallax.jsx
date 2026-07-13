import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Wraps a hero element and nudges it a few pixels opposite the pointer,
 * creating a subtle sense of depth. `depth` controls how far it travels;
 * larger depth = closer to the "camera". Springs smooth out raw pointer
 * jitter so the motion reads as weight, not lag.
 */
export function Parallax({ depth = 20, className, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 });
  const translateX = useTransform(springX, (v) => v * depth);
  const translateY = useTransform(springY, (v) => v * depth);

  function handlePointerMove(event) {
    if (event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * -1);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * -1);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div ref={ref} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className={className}>
      <motion.div style={{ x: translateX, y: translateY }}>{children}</motion.div>
    </div>
  );
}
