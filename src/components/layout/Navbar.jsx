import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "../../lib/cn";
import { NAV_LINKS } from "../../data/navigation";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[var(--duration-base)] ease-[var(--ease-gallery)]",
          scrolled ? "glass border-b border-hairline" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link to="/" className="font-display text-lg tracking-tight">
            Studio
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "text-sm tracking-wide text-ink-muted transition-colors hover:text-ink",
                    isActive && "text-accent hover:text-accent"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:flex" />
            <Button as={Link} to="/gallery" variant="outline" size="sm" className="hidden sm:inline-flex">
              View collection
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline md:hidden"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
