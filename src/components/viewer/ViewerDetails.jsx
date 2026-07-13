import { Badge } from "../ui/Badge";

export function ViewerDetails({ painting }) {
    return (
        <div className="flex h-full flex-col gap-8 overflow-y-auto p-6 sm:p-8">
            <div>
                <Badge>{painting.category}</Badge>
                <h1 className="mt-4 font-display text-3xl">{painting.title}</h1>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {painting.medium} — {painting.dimensions} — {painting.year}
                </p>
            </div>

            <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Story</p>
                <p className="mt-2 text-ink">{painting.story}</p>
            </div>

            <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Inspiration</p>
                <p className="mt-2 text-ink">{painting.inspiration}</p>
            </div>

            <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {painting.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}