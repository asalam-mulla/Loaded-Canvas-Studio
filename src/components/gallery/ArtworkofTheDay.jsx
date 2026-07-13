import { Badge } from "../ui/Badge";
import { Spotlight } from "../effects/Spotlight";
import { GenerativePainting } from "../effects/GenerativePainting";
import { PAINTINGS } from "../../data/paintings";

function dayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    return Math.floor(diff / 86400000);
}

export function ArtworkOfTheDay() {
    const painting = PAINTINGS[dayOfYear() % PAINTINGS.length];

    return (
        <Spotlight strength={0.6} className="grid grid-cols-1 gap-6 overflow-hidden rounded-xl border border-hairline sm:grid-cols-[1fr_1.4fr]">
            <div className="aspect-[4/3] sm:aspect-auto">
                <GenerativePainting id={painting.id} palette={painting.palette} className="h-full w-full" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
                <Badge className="w-fit">Artwork of the Day</Badge>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl">{painting.title}</h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {painting.medium} — {painting.dimensions} — {painting.year}
                </p>
                <p className="mt-4 max-w-md text-ink-muted">
                    Part of the {painting.category} collection — one piece drawn to the front each day.
                </p>
            </div>
        </Spotlight>
    );
}