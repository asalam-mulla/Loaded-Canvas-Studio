import { cn } from "../../lib/cn";

/**
 * Styled after a museum wall label: uppercase mono caption in a hairline
 * frame. Used for artwork metadata (medium, year, dimensions) — never
 * for decorative purposes, since the mono treatment should always mean
 * "this is a fact about the piece."
 */
export function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-hairline px-2.5 py-1",
        "font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
