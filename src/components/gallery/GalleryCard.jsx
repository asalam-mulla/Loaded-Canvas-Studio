import { cn } from "../../lib/cn";
import { Badge } from "../ui/Badge";
import { Skeleton } from "../ui/Skeleton";
import { GenerativePainting } from "../effects/GenerativePainting";
import { useLazyReveal } from "../../hooks/useLazyReveal";
import { useCursor } from "../../context/CursorContext";

const ASPECT_CLASS = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
};

/**
 * `span` lets the bento grid give featured pieces more room; the masonry
 * grid ignores it since column-based masonry sizes purely off aspect
 * ratio. `image` is optional — pass a real URL once one exists and this
 * card will use it in place of the generative placeholder automatically.
 */
export function GalleryCard({ painting, span, image, fill = false }) {
    const { ref, loaded } = useLazyReveal();
    const { setLabel } = useCursor();

    return (
        <article
            ref={ref}
            onMouseEnter={() => setLabel("View")}
            onMouseLeave={() => setLabel(null)}
            className={cn("group relative overflow-hidden rounded-lg border border-hairline", span)}
        >
            <div className={cn("relative w-full", fill ? "h-full" : ASPECT_CLASS[painting.aspect])}>
                {!loaded && <Skeleton className="absolute inset-0" />}

                {image ? (
                    <img
                        src={image}
                        alt={painting.title}
                        loading="lazy"
                        className={cn(
                            "h-full w-full object-cover transition-all duration-700 ease-[var(--ease-gallery)]",
                            loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md"
                        )}
                    />
                ) : (
                    <GenerativePainting
                        id={painting.id}
                        palette={painting.palette}
                        className={cn(
                            "h-full w-full transition-all duration-700 ease-[var(--ease-gallery)]",
                            loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md"
                        )}
                    />
                )}

                <div
                    className={cn(
                        "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent p-5",
                        "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    )}
                >
                    <p className="font-display text-lg text-linen">{painting.title}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-linen/70">
                        {painting.medium} — {painting.year}
                    </p>
                </div>

                {painting.featured && (
                    <Badge className="absolute left-3 top-3 border-none bg-surface-raised/90">Featured</Badge>
                )}
            </div>
        </article>
    );
}