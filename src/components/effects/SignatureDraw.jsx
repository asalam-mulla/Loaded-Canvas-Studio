import { motion } from "framer-motion";

export function SignatureDraw({ className }) {
  return (
    <motion.svg
      width="160"
      height="72"
      viewBox="0 0 120 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Artist's signature"
    >
      <motion.path
        d="M6 44C18 12 28 12 34 32C40 52 48 20 58 20C68 20 70 46 82 46C94 46 98 18 114 18"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.svg>
  );
}
