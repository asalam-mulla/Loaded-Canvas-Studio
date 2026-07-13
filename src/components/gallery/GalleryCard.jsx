import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
 * ratio. `image` comes from `painting.image` — leave it unset to use the
 * generative placeholder; add it in src/data/paintings.js once a real
 * file exists and this card switches over automatically.
 *
 * Links into the fullscreen viewer at /gallery/:id, carrying the current
 * location as `state.backgroundLocation` so the viewer can render as an
 * overlay on top of this grid instead of a full page navigation (see
 * App.jsx). The media wrapper shares a layoutId with the viewer's image
 * so Framer Motion animates one smoothly into the other.
 */
export function GalleryCard({ painting, span, fill = false }) {
    const { ref, loaded } = useLazyReveal();
    const { setLabel } = useCursor();
    const location = useLocation();
    const image = painting.image;

    return (
        <Link
            ref={ref}
            to={`/gallery/${painting.id}`}
            state={{ backgroundLocation: location }}
            onMouseEnter={() => setLabel("View")}
            onMouseLeave={() => setLabel(null)}
            className={cn("group relative block overflow-hidden rounded-lg border border-hairline", span)}
        >
            <motion.div layoutId={`painting-${painting.id}`} className={cn("relative w-full", fill ? "h-full" : ASPECT_CLASS[painting.aspect])}>
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
            </motion.div>
        </Link>
    );
}
