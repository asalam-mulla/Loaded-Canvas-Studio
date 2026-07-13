import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ScrollIndicator } from "../ui/ScrollIndicator";
import { Parallax } from "../effects/Parallax";
import { Spotlight } from "../effects/Spotlight";
import { FeaturedPaintingPlaceholder } from "../effects/GenerativeCanvas";

const headline = ["Painting is", "a slow argument", "with silence."];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const line = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Ambient background: mesh gradient + drifting blobs, paper grain over the top */}
      <div className="mesh-gradient grain absolute inset-0 -z-10" aria-hidden>
        <span className="blob h-72 w-72 bg-oxide" style={{ top: "8%", left: "6%" }} />
        <span className="blob h-96 w-96 animate-[drift_28s_var(--ease-gallery)_infinite_alternate-reverse] bg-ochre" style={{ bottom: "0%", right: "4%" }} />
      </div>

      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
        {/* Cinematic typography */}
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <Badge>Original works · Est. studio practice</Badge>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-6 font-display text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {headline.map((words) => (
              <span key={words} className="block overflow-hidden">
                <motion.span variants={line} className="block text-balance-pretty">
                  {words}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-lg text-ink-muted"
          >
            A collection of original paintings — built in oil, pigment, and patience.
            Explore the current body of work, or read the story behind it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button as={Link} to="/gallery" variant="primary">
              Enter the gallery
            </Button>
            <Button as={Link} to="/story" variant="outline">
              Read the story
            </Button>
          </motion.div>
        </div>

        {/* Featured painting, with parallax + the spotlight signature motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <Parallax depth={14}>
            <Spotlight strength={0.8} className="overflow-hidden rounded-lg shadow-[var(--shadow-frame)]">
              <FeaturedPaintingPlaceholder className="aspect-[4/5] w-full" />
            </Spotlight>
          </Parallax>
          <Badge className="absolute -bottom-4 left-4 bg-surface-raised">Featured — Untitled No. 1</Badge>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <ScrollIndicator />
      </div>
    </section>
  );
}
