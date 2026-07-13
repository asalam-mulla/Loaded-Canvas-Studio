import { useState } from "react";
import { motion } from "framer-motion";
import { GenerativePainting } from "../effects/GenerativePainting";

const SWIPE_THRESHOLD = 80;

export function ViewerStage({ painting, onNext, onPrev }) {
    const [zoomed, setZoomed] = useState(false);
    const image = painting.image;

    function handleDragEnd(_event, info) {
        if (zoomed) return; // panning while zoomed shouldn't also trigger navigation
        if (info.offset.x < -SWIPE_THRESHOLD) onNext();
        else if (info.offset.x > SWIPE_THRESHOLD) onPrev();
    }

    return (
        <motion.div
            layoutId={`painting-${painting.id}`}
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
        >
            <motion.div
                drag
                dragElastic={zoomed ? 0.15 : 0.5}
                dragConstraints={zoomed ? { left: -200, right: 200, top: -200, bottom: 200 } : { left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                onDoubleClick={() => setZoomed((z) => !z)}
                animate={{ scale: zoomed ? 1.8 : 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[78vh] w-full max-w-3xl cursor-zoom-in touch-none select-none px-6"
                style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
            >
                {image ? (
                    <img src={image} alt={painting.title} className="h-full w-full rounded-md object-contain shadow-[var(--shadow-lg)]" draggable={false} />
                ) : (
                    <GenerativePainting
                        id={painting.id}
                        domId={`painting-svg-${painting.id}`}
                        palette={painting.palette}
                        className="aspect-[3/4] w-full rounded-md shadow-[var(--shadow-lg)]"
                    />
                )}
            </motion.div>

            <p className="absolute bottom-4 font-mono text-[10px] uppercase tracking-widest text-ink-muted/70">
                Double-click to zoom · Swipe or use arrow keys to browse
            </p>
        </motion.div>
    );
}