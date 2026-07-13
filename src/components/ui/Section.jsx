import { cn } from "../../lib/cn";

const SPACING = {
  default: "py-24 sm:py-32 lg:py-40",
  gallery: "py-[var(--spacing-gallery-sm)] lg:py-[var(--spacing-gallery)]",
  tight: "py-16 sm:py-20",
};

/**
 * Applies the site's generous, gallery-like vertical spacing. Using this
 * everywhere (instead of ad-hoc py- utilities) is what keeps "breathing
 * room" consistent as more sections are added in later phases.
 */
export function Section({ as: Tag = "section", spacing = "default", className, children, ...props }) {
  return (
    <Tag className={cn(SPACING[spacing], className)} {...props}>
      {children}
    </Tag>
  );
}
