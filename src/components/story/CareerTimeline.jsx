import { Reveal } from "../effects/Reveal";
import { Badge } from "../ui/Badge";
import { ARTIST } from "../../data/artist";

export function CareerTimeline() {
  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Experience</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-3xl">A short timeline</h2>
        </Reveal>

        <div className="mt-8 border-l border-hairline pl-6">
          {ARTIST.timeline.map((entry, i) => (
            <Reveal key={entry.year + entry.title} delay={0.15 + i * 0.08} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">{entry.year}</p>
              <p className="mt-1 font-display text-xl">{entry.title}</p>
              <p className="mt-1 max-w-md text-ink-muted">{entry.description}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Awards</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-3xl">Recognition</h2>
        </Reveal>

        <ul className="mt-8 space-y-4">
          {ARTIST.awards.map((award, i) => (
            <Reveal key={award.title} delay={0.15 + i * 0.08} as="li">
              <div className="rounded-lg border border-hairline p-5">
                <Badge>{award.year}</Badge>
                <p className="mt-3 font-display text-lg">{award.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{award.org}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
