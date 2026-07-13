# Studio — Digital Gallery Portfolio

A premium, museum-inspired portfolio for showcasing original paintings.
Built in strict phases; this is **Phase 1 — Foundation & Design System.**

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. You'll land on the Phase 1 review page — a
living style guide, not the final homepage — showing every token,
surface, and interaction pattern the rest of the site is built from.

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # eslint
```

## Tech stack

- **Vite** + **React 19** (JavaScript, not TypeScript)
- **Tailwind CSS v4.3**, CSS-first config (`@theme` in `src/index.css` —
  no `tailwind.config.js`, no `postcss.config.js`, no autoprefixer)
- **Framer Motion** (wired in from Phase 2 onward)
- **React Router** for future page routing
- **lucide-react** for iconography

## Design system

### Concept

The site is grounded in the vocabulary of painting itself: pigment
names, museum wall labels, gallery track lighting. It deliberately
avoids the current AI-generated-design defaults (warm cream + terracotta,
near-black + acid accent, broadsheet hairline grid) in favor of a palette
and type system chosen for this subject specifically.

### Palette — named pigments, not marketing colors

| Token | Light value | Role |
|---|---|---|
| `--pigment-linen` | `#F2EEE6` | Light theme surface (gallery wall) |
| `--pigment-charcoal` | `#14131A` | Dark theme surface (gallery wall, lights down) |
| `--pigment-ink` | `#1C1B22` | Primary text |
| `--pigment-oxide` | `#C4462B` | Accent — a burnt Venetian-red pigment |
| `--pigment-ochre` | `#C9A227` | Spotlight glow, focus rings, hover warmth |
| `--pigment-stone` | `#8B8577` | Muted / secondary text |

All semantic tokens (`surface`, `ink`, `accent`, `hairline`, …) are raw
CSS custom properties re-defined per `[data-theme]`, then bridged into
Tailwind's `@theme` block — so `bg-surface`, `text-ink`,
`border-hairline` etc. respond instantly to theme changes with zero
JS-driven re-renders.

### Typography

- **Fraunces** — display serif, used with restraint for headlines
- **Inter** — body text
- **IBM Plex Mono** — museum wall-label style captions (medium,
  dimensions, year) — mono is reserved for *facts about the work*,
  never used decoratively

### Signature element

`components/effects/Spotlight.jsx` — a soft ochre glow that tracks the
pointer over a surface, evoking a gallery spotlight passing over a
canvas. Used sparingly (hero, featured cards) so it stays a signature
rather than noise. Automatically disabled for touch pointers and under
`prefers-reduced-motion`.

### Radius, shadow, animation & spacing tokens

All defined in `src/index.css` under `@theme`:

- Radius: `sm` → `full`
- Shadow: warm-toned (`rgb(28 20 12 / …)` rather than pure black),
  including a `--shadow-frame` used for artwork framing
- Motion: `--ease-gallery` / `--ease-in-gallery` easing curves,
  `--duration-fast|base|slow|cinematic` durations
- Spacing: an extra-generous `--spacing-gallery` step for section
  rhythm, on top of Tailwind's default scale
- Breakpoint: `3xl` (1920px) added for ultra-wide review

### Accessibility foundation

- Visible focus rings on every interactive element (never suppressed)
- Skip-to-content link (`.skip-link` utility)
- `prefers-reduced-motion` respected globally
- Semantic HTML landmarks (`header`, `main`)
- Color contrast checked against both themes for body text and accent-on-surface pairs

### Performance foundation

- Manual chunk splitting (`vendor`, `motion`) in `vite.config.js`
- `Skeleton` loading primitive ready for async image/data states
- Font loading via `preconnect` + `display=swap`

## Folder architecture

```
src/
  components/
    ui/        reusable primitives (Button, Container, Section, Badge, …)
    effects/    signature motion/interaction pieces (Spotlight, …)
    layout/     (Phase 2+) navbar, footer, page shells
    gallery/    (Phase 3+) bento grid, cards, filters
    viewer/     (Phase 4+) fullscreen artwork viewer
  context/      ThemeContext (light/dark, persisted)
  data/         (Phase 3+) artwork/collection data
  lib/          small framework-agnostic helpers (cn.js)
  App.jsx        Phase 1 review page — replaced by the real routed
                 app shell in Phase 2
  main.jsx       entry point (Router + ThemeProvider)
  index.css      the entire design system: tokens, base layer, utilities
```

Naming: components are PascalCase files exporting a single named
component; hooks live under `context/` or a future `hooks/` folder and
are prefixed `use*`; everything else is camelCase.

## Adding your paintings

Drop image files into `src/assets/paintings/` (create the folder) —
the data layer and gallery grid for wiring these in arrive in **Phase
3**. Any image works as a placeholder in the meantime.

## Phase status

- [x] **Phase 1 — Foundation & Design System** ✅
- [ ] Phase 2 — Navigation & Cinematic Hero
- [ ] Phase 3 — Premium Bento Gallery
- [ ] Phase 4 — Artwork Viewer
- [ ] Phase 5 — Artist Story
- [ ] Phase 6 — Timeline & Statistics
- [ ] Phase 7 — Contact
- [ ] Phase 8 — Motion Design
- [ ] Phase 9 — Responsive
- [ ] Phase 10 — Performance
- [ ] Phase 11 — Production Polish
