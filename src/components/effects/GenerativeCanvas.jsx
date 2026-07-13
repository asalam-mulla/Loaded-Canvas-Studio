/**
 * A generative stand-in for a "featured painting." Nothing here is a real
 * artwork — it exists so the hero composition can be reviewed before real
 * images are uploaded. Swap the <FeaturedPaintingPlaceholder> below for an
 * <img> once real paintings land in src/assets/paintings (see README).
 */
export function FeaturedPaintingPlaceholder({ className }) {
  return (
    <svg viewBox="0 0 480 600" className={className} role="img" aria-label="Placeholder featured painting">
      <rect width="480" height="600" fill="var(--pigment-linen)" />
      <path d="M0 420C90 360 150 470 240 400C330 330 380 460 480 380V600H0Z" fill="var(--pigment-oxide)" opacity="0.85" />
      <circle cx="330" cy="160" r="120" fill="var(--pigment-ochre)" opacity="0.55" />
      <path d="M-20 180C110 120 160 260 260 190C360 120 420 220 500 170V0H-20Z" fill="var(--pigment-charcoal)" opacity="0.18" />
      <path
        d="M40 520C130 470 210 560 300 500C360 460 420 500 460 470"
        stroke="var(--pigment-parchment)"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
