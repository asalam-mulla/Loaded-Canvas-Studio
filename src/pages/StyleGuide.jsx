import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { Divider } from "../components/ui/Divider";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { Spotlight } from "../components/effects/Spotlight";

const SWATCHES = [
  { name: "Linen", var: "--pigment-linen", value: "#F2EEE6" },
  { name: "Charcoal", var: "--pigment-charcoal", value: "#14131A" },
  { name: "Oxide", var: "--pigment-oxide", value: "#C4462B" },
  { name: "Ochre", var: "--pigment-ochre", value: "#C9A227" },
  { name: "Stone", var: "--pigment-stone", value: "#8B8577" },
];

export default function StyleGuide() {
  return (
    <>
      <main className="pt-20">
        {/* ---------------------------------------------------------- */}
        <Section spacing="gallery" className="grain">
          <Container>
            <Badge>Phase 01 — Foundation &amp; Design System</Badge>
            <h1 className="mt-6 max-w-3xl text-balance-pretty font-display text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
              A gallery built on <em className="text-accent not-italic">pigment</em>, light, and quiet
              discipline.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">
              This page is the living design system for the site — every token, surface, and
              interaction pattern the rest of the gallery will be assembled from.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary">Enter the gallery</Button>
              <Button variant="outline">Read the artist's story</Button>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* ------------------------- Color -------------------------- */}
        <Section>
          <Container>
            <h2 className="font-display text-3xl">Pigment palette</h2>
            <p className="mt-2 max-w-lg text-ink-muted">
              Named after paint, not marketing — each color is a decision grounded in the
              subject, not a default.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {SWATCHES.map((s) => (
                <div key={s.name} className="overflow-hidden rounded-lg border border-hairline">
                  <div className="h-24" style={{ backgroundColor: s.value }} />
                  <div className="p-3">
                    <p className="font-medium">{s.name}</p>
                    <p className="font-mono text-xs text-ink-muted">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Divider />

        {/* ----------------------- Typography ------------------------ */}
        <Section>
          <Container>
            <h2 className="font-display text-3xl">Typography</h2>
            <div className="mt-10 space-y-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Display — Fraunces
                </p>
                <p className="font-display text-4xl sm:text-5xl">The quiet weight of oil on linen</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Body — Inter
                </p>
                <p className="max-w-xl text-lg text-ink">
                  Every painting carries a story that begins long before the first stroke —
                  in the light of the studio, the mixing of pigment, the discipline of return.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Mono — IBM Plex Mono (placard style)
                </p>
                <p className="font-mono text-sm text-ink-muted">
                  OIL ON CANVAS — 91 × 122 CM — 2024 — PRIVATE COLLECTION
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* -------------------- Components & motifs ------------------- */}
        <Section>
          <Container>
            <h2 className="font-display text-3xl">Components</h2>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Badge>Oil on Canvas</Badge>
              <Badge>2024</Badge>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Spotlight
                strength={1}
                className="glass-raised flex aspect-[4/5] flex-col justify-end rounded-xl p-6"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Signature motif
                </p>
                <p className="mt-1 font-display text-xl">Spotlight — hover this card</p>
              </Spotlight>

              <div className="flex aspect-[4/5] flex-col justify-end rounded-xl border border-hairline p-6 shadow-[var(--shadow-frame)]">
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Shadow — frame
                </p>
                <p className="mt-1 font-display text-xl">Museum framing shadow</p>
              </div>

              <div className="flex aspect-[4/5] flex-col justify-between rounded-xl border border-hairline p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Loading state
                </p>
                <Skeleton className="h-full w-full" />
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        <Section spacing="tight">
          <Container className="flex flex-col items-center gap-2 text-center">
            <p className="font-display text-2xl text-ink-muted">
              This page is a living reference — kept in sync as new components join the system.
            </p>
          </Container>
        </Section>
      </main>
    </>
  );
}
