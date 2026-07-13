import { Badge } from "../ui/Badge";
import { Reveal } from "../effects/Reveal";
import { GenerativePainting } from "../effects/GenerativePainting";
import { ARTIST } from "../../data/artist";

export function StoryHero() {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <Reveal>
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-lg border border-hairline shadow-[var(--shadow-frame)] lg:max-w-none">
          <GenerativePainting id={101} palette={ARTIST.portraitPalette} className="aspect-[3/4] w-full" />
        </div>
      </Reveal>

      <div>
        <Reveal>
          <Badge>About the Artist</Badge>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">{ARTIST.name}</h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-3 max-w-md text-lg text-ink-muted">{ARTIST.tagline}</p>
        </Reveal>
        <div className="mt-8 space-y-4">
          {ARTIST.bio.map((paragraph, i) => (
            <Reveal key={paragraph} delay={0.2 + i * 0.08}>
              <p className="max-w-lg text-ink-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
