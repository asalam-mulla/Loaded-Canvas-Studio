import { useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../../context/CursorContext";

/**
 * Renders once per gallery page (inside a CursorProvider). Position is
 * driven by motion values updated directly from a window listener, so
 * tracking the pointer never triggers a React re-render — only the
 * label text itself is real state, and it changes rarely.
 */
export function CustomCursor() {
    const { label } = useCursor();
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });

    useEffect(() => {
        function handleMove(event) {
            if (event.pointerType !== "mouse") return;
            x.set(event.clientX);
            y.set(event.clientY);
        }
        window.addEventListener("pointermove", handleMove);
        return () => window.removeEventListener("pointermove", handleMove);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[80] hidden -translate-x-1/2 -translate-y-1/2 md:block"
            style={{ x: springX, y: springY }}
        >
            <AnimatePresence>
                {label && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal font-mono text-[11px] uppercase tracking-widest text-linen"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
