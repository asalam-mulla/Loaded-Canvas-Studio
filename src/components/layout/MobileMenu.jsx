import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { NAV_LINKS } from "../../data/navigation";

const panel = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const link = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="glass fixed inset-0 z-[90] flex flex-col bg-surface/95 md:hidden"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={panel}
        >
          <div className="flex h-20 items-center justify-between px-6">
            <span className="font-display text-lg">Studio</span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline"
            >
              <span className="sr-only">Close menu</span>
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {NAV_LINKS.map(({ label, to }) => (
              <motion.div key={to} variants={link}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className="block border-b border-hairline py-5 font-display text-4xl"
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
