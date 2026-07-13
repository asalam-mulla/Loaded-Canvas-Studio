import { LayoutGrid, Columns3 } from "lucide-react";
import { cn } from "../../lib/cn";

const OPTIONS = [
    { id: "bento", label: "Bento view", icon: LayoutGrid },
    { id: "masonry", label: "Masonry view", icon: Columns3 },
];

export function GridSwitcher({ value, onChange }) {
    return (
        <div className="inline-flex items-center gap-1 rounded-full border border-hairline p-1">
            {OPTIONS.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    type="button"
                    aria-pressed={value === id}
                    onClick={() => onChange(id)}
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                        value === id ? "bg-accent text-accent-foreground" : "text-ink-muted hover:text-ink"
                    )}
                >
                    <span className="sr-only">{label}</span>
                    <Icon className="h-4 w-4" aria-hidden />
                </button>
            ))}
        </div>
    );
}