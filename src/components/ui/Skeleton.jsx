import { cn } from "../../lib/cn";

/**
 * Loading placeholder. Uses a slow shimmer rather than a flat pulse so it
 * reads as "gallery light moving across a wall" rather than a generic
 * spinner — matches the site's motion language even at rest.
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "relative overflow-hidden rounded-md bg-surface-sunken",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_1.8s_var(--ease-gallery)_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}
