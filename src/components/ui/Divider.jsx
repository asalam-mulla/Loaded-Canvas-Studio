import { cn } from "../../lib/cn";

export function Divider({ className, ...props }) {
  return <hr className={cn("border-t border-hairline", className)} {...props} />;
}
