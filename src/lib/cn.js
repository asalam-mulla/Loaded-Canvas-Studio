import { clsx } from "clsx";

/**
 * Merge conditional classnames. A thin wrapper around clsx so every
 * component imports from one place — makes it trivial to swap in
 * tailwind-merge later if class conflicts ever become an issue.
 */
export function cn(...inputs) {
  return clsx(inputs);
}
