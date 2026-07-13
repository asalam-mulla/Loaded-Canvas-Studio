import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { Divider } from "../components/ui/Divider";
import { StoryHero } from "../components/story/StoryHero";
import { Philosophy } from "../components/story/Philosophy";
import { StudioProcess } from "../components/story/StudioProcess";
import { CareerTimeline } from "../components/story/CareerTimeline";

export default function Story() {
  return (
    <>
      <Section spacing="gallery" className="grain !pt-32">
        <Container>
          <StoryHero />
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <Philosophy />
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <StudioProcess />
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <CareerTimeline />
        </Container>
      </Section>
    </>
  );
}
