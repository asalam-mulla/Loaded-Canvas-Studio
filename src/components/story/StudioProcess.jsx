import { Reveal } from "../effects/Reveal";
import { GenerativePainting } from "../effects/GenerativePainting";
import { ARTIST } from "../../data/artist";

export function StudioProcess() {
  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">The Studio</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-3xl">Where the work happens</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-md text-ink-muted">{ARTIST.studio}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-6 overflow-hidden rounded-lg border border-hairline">
          <GenerativePainting id={202} palette={ARTIST.portraitPalette} className="aspect-[16/10] w-full" />
        </Reveal>
      </div>

      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Process</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-3xl">How a painting is built</h2>
        </Reveal>

        <ol className="mt-6 space-y-6">
          {ARTIST.process.map((step, i) => (
            <Reveal key={step.title} delay={0.15 + i * 0.08} as="li">
              <div className="flex gap-4 border-b border-hairline pb-6">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-display text-lg">{step.title}</p>
                  <p className="mt-1 text-ink-muted">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
