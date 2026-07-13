import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../lib/cn";

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-full border border-hairline",
        "text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent hover:text-accent",
        className
      )}
    >
      <span className="sr-only">Switch to {isDark ? "light" : "dark"} theme</span>
      {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden /> : <Moon className="h-[18px] w-[18px]" aria-hidden />}
    </button>
  );
}
