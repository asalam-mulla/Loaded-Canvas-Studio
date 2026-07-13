import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { Badge } from "../components/ui/Badge";

export default function ComingSoon({ title, phase }) {
  return (
    <Section spacing="gallery" className="grain flex min-h-[70vh] items-center pt-20">
      <Container className="text-center">
        <Badge>{phase}</Badge>
        <h1 className="mt-6 font-display text-5xl font-medium sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          This page is built in a later phase of the project. Navigation already routes here so the
          site never links to a dead end.
        </p>
      </Container>
    </Section>
  );
}
