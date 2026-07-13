import { forwardRef } from "react";
import { cn } from "../../lib/cn";

const VARIANTS = {
  primary:
    "bg-accent text-accent-foreground hover:brightness-110 active:brightness-95 shadow-sm",
  outline:
    "border border-hairline text-ink hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-ink hover:text-accent bg-transparent",
};

const SIZES = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

/**
 * The single button primitive for the whole site. New visual variants
 * should be added here, never as one-off classes on a call site, so the
 * gallery's interaction language stays consistent phase to phase.
 */
export const Button = forwardRef(function Button(
  { as: Tag = "button", variant = "primary", size = "md", className, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide",
        "transition-all duration-[var(--duration-fast)] ease-[var(--ease-gallery)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-spotlight)]",
        "disabled:opacity-40 disabled:pointer-events-none",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
});
