import { Search } from "lucide-react";
import { cn } from "../../lib/cn";
import { CATEGORY_LIST } from "../../data/paintings";

const SORTS = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "Newest" },
];

export function FilterBar({ category, onCategoryChange, query, onQueryChange, sort, onSortChange }) {
    return (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
                {CATEGORY_LIST.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onCategoryChange(item)}
                        aria-pressed={category === item}
                        className={cn(
                            "rounded-full border px-4 py-2 text-sm transition-colors",
                            category === item
                                ? "border-accent bg-accent text-accent-foreground"
                                : "border-hairline text-ink-muted hover:text-ink"
                        )}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        placeholder="Search title or tag…"
                        aria-label="Search paintings"
                        className="w-full rounded-full border border-hairline bg-transparent py-2 pl-9 pr-4 text-sm outline-none placeholder:text-ink-muted focus-visible:border-accent sm:w-56"
                    />
                </div>

                <div className="hidden items-center gap-1 rounded-full border border-hairline p-1 sm:inline-flex">
                    {SORTS.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => onSortChange(id)}
                            aria-pressed={sort === id}
                            className={cn(
                                "rounded-full px-3 py-1.5 text-sm transition-colors",
                                sort === id ? "bg-accent text-accent-foreground" : "text-ink-muted hover:text-ink"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}