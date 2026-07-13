import { mulberry32, seededRange } from "../../lib/seededRandom";

/**
 * Stands in for a real painting image until one is uploaded (see
 * src/data/paintings.js). Every shape is derived from the painting's id,
 * so the same piece always renders the same composition. Swap this for
 * an <img src={painting.image}> as soon as real artwork exists —
 * GalleryCard.jsx already branches on that field.
 */
export function GenerativePainting({ id, palette, className }) {
    const random = mulberry32(id * 9973);
    const [base, mid, accent] = palette;

    const blob1 = {
        cx: seededRange(random, 15, 45),
        cy: seededRange(random, 20, 55),
        r: seededRange(random, 25, 45),
    };
    const blob2 = {
        cx: seededRange(random, 50, 85),
        cy: seededRange(random, 40, 80),
        r: seededRange(random, 20, 38),
    };
    const bandY = seededRange(random, 55, 85);

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} role="presentation">
            <rect width="100" height="100" fill="var(--pigment-linen)" />
            <circle cx={blob1.cx} cy={blob1.cy} r={blob1.r} fill={base} opacity="0.85" />
            <circle cx={blob2.cx} cy={blob2.cy} r={blob2.r} fill={mid} opacity="0.6" />
            <path d={`M-10 ${bandY} C 30 ${bandY - 15}, 70 ${bandY + 15}, 110 ${bandY}`} stroke={accent} strokeWidth="1.4" fill="none" opacity="0.5" />
        </svg>
    );
}