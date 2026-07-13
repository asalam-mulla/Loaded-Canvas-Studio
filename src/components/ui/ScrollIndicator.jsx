import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

export function ScrollIndicator({ className }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY < 80);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      aria-hidden
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Scroll</span>
      <span className="relative h-12 w-px overflow-hidden bg-hairline">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_1.8s_var(--ease-gallery)_infinite] bg-accent" />
      </span>
    </div>
  );
}
