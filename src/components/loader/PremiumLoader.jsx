import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SESSION_KEY = "gallery-loader-seen";

/**
 * Plays once per browser session (checked via sessionStorage) so returning
 * visitors and internal navigation never see it again. Under
 * prefers-reduced-motion it resolves near-instantly with a plain fade.
 */
export function PremiumLoader({ onDone }) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(() =>
    typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY) ? "done" : "signature"
  );

  useEffect(() => {
    if (phase === "done") {
      onDone?.();
      return;
    }

    if (prefersReducedMotion) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("done");
      onDone?.();
      return;
    }

    const toReveal = setTimeout(() => setPhase("reveal"), 1400);
    return () => clearTimeout(toReveal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, prefersReducedMotion]);

  function handleRevealComplete() {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("done");
    onDone?.();
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-[999]" aria-hidden={phase === "reveal"}>
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-charcoal"
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={() => phase === "reveal" && handleRevealComplete()}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-charcoal"
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              width="120"
              height="64"
              viewBox="0 0 120 64"
              fill="none"
              initial={{ opacity: 1 }}
              animate={{ opacity: phase === "reveal" ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.path
                d="M6 44C18 12 28 12 34 32C40 52 48 20 58 20C68 20 70 46 82 46C94 46 98 18 114 18"
                stroke="var(--pigment-parchment)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.svg>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
