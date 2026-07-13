import { Hero } from "../components/hero/Hero";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { Divider } from "../components/ui/Divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <Section spacing="tight">
        <Container className="flex flex-col items-center gap-2 text-center">
          <p className="font-display text-2xl text-ink-muted">
            Phase 02 complete — the bento gallery arrives next.
          </p>
        </Container>
      </Section>
    </>
  );
}
