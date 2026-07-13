import { cn } from "../../lib/cn";

const WIDTHS = {
  default: "max-w-[1440px]",
  narrow: "max-w-[880px]",
  wide: "max-w-[1800px]", // for the 3xl / ultra-wide gallery grid
};

/**
 * Every top-level section should wrap its content in a Container instead
 * of hand-rolling max-width/padding — this is what keeps the gallery's
 * horizontal rhythm identical across every phase.
 */
export function Container({ as: Tag = "div", width = "default", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full px-6 sm:px-10 lg:px-16", WIDTHS[width], className)} {...props}>
      {children}
    </Tag>
  );
}
