import { motion } from "framer-motion";

export function Reveal({ as: Tag = "div", delay = 0, className, children }) {
  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
