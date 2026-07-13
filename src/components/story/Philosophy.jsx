import { Reveal } from "../effects/Reveal";
import { SignatureDraw } from "../effects/SignatureDraw";
import { ARTIST } from "../../data/artist";

export function Philosophy() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Philosophy</p>
      </Reveal>
      <Reveal delay={0.1} as="blockquote">
        <p className="mt-6 text-balance-pretty font-display text-3xl leading-snug sm:text-4xl">
          “{ARTIST.philosophyQuote}”
        </p>
      </Reveal>
      <Reveal delay={0.2} className="mt-8 flex justify-center">
        <SignatureDraw />
      </Reveal>
    </div>
  );
}
