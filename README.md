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

| Token                | Light value | Role                                           |
| -------------------- | ----------- | ---------------------------------------------- |
| `--pigment-linen`    | `#F2EEE6`   | Light theme surface (gallery wall)             |
| `--pigment-charcoal` | `#14131A`   | Dark theme surface (gallery wall, lights down) |
| `--pigment-ink`      | `#1C1B22`   | Primary text                                   |
| `--pigment-oxide`    | `#C4462B`   | Accent — a burnt Venetian-red pigment          |
| `--pigment-ochre`    | `#C9A227`   | Spotlight glow, focus rings, hover warmth      |
| `--pigment-stone`    | `#8B8577`   | Muted / secondary text                         |

All semantic tokens (`surface`, `ink`, `accent`, `hairline`, …) are raw
CSS custom properties re-defined per `[data-theme]`, then bridged into
Tailwind's `@theme` block — so `bg-surface`, `text-ink`,
`border-hairline` etc. respond instantly to theme changes with zero
JS-driven re-renders.

### Typography

- **Fraunces** — display serif, used with restraint for headlines
- **Inter** — body text
- **IBM Plex Mono** — museum wall-label style captions (medium,
  dimensions, year) — mono is reserved for _facts about the work_,
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
    effects/    signature motion pieces (Spotlight, Parallax, GenerativeCanvas)
    layout/     Navbar, MobileMenu (footer arrives Phase 7)
    loader/     PremiumLoader (entrance unveiling animation)
    hero/       Hero (cinematic homepage hero)
    gallery/    bento grid, masonry grid, gallery card, filter bar,
                grid switcher, artwork of the day
    story/       StoryHero, Philosophy, StudioProcess, CareerTimeline
    viewer/      ViewerStage, ViewerControls, ViewerDetails, ViewerNav
  context/      ThemeContext (light/dark), CursorContext (gallery hover cursor)
  data/         navigation.js, paintings.js (36-piece catalogue), artist.js (bio content)
  hooks/        useLazyReveal, useInfiniteReveal, useFavorites, useKeyboardNav
  lib/          small framework-agnostic helpers (cn.js, seededRandom.js)
  pages/        Home, Gallery, ArtworkViewer, Story, ComingSoon, StyleGuide
  App.jsx        root shell: loader → navbar → routed pages with transitions
  main.jsx       entry point (Router + ThemeProvider)
  index.css      the entire design system: tokens, base layer, utilities
```

Naming: components are PascalCase files exporting a single named
component; hooks live under `context/` or a future `hooks/` folder and
are prefixed `use*`; everything else is camelCase.

## Adding your paintings

Edit `src/data/paintings.js`. Each entry can take an `image` field (a
path into `src/assets/paintings/` or an imported URL) — as soon as one
is present, `GalleryCard` and the hero automatically render that image
instead of the generative placeholder. Until then every piece uses
`components/effects/GenerativePainting.jsx`, a seeded abstract stand-in
so the layout, filters, and grids are all reviewable now.

## Phase 2 — Navigation & Cinematic Hero

- **`PremiumLoader`** — plays once per browser session (`sessionStorage`
  gated). A hand-drawn signature strokes itself in via SVG `pathLength`,
  then two charcoal panels part like gallery curtains at an unveiling.
  Resolves instantly under `prefers-reduced-motion`.
- **`Navbar`** — transparent over the hero, gains a glass background and
  hairline border after ~24px of scroll. Collapses to a hamburger below
  `md`, opening `MobileMenu`, a full-screen glass overlay with staggered
  link reveal, `Escape`-to-close, and scroll lock.
- **`Hero`** — mesh gradient + two slow-drifting pigment blobs behind a
  paper-grain overlay; headline reveals line-by-line via clipped
  `translateY` stagger; the featured painting sits inside `Parallax`
  (spring-smoothed pointer tracking, mouse-only) and the `Spotlight`
  signature motif; `ScrollIndicator` fades once the visitor scrolls.
- **Routing** — real `react-router` routes now exist for `/`, `/gallery`,
  `/story`, `/contact`, and `/style-guide` (the Phase 1 reference page,
  preserved and kept in sync going forward). `/gallery`, `/story`, and
  `/contact` render `ComingSoon` stubs — styled, on-brand, and labeled
  with the phase that will complete them — so the nav never points at a
  dead end. Route changes animate with a shared `PageTransition` fade.

## Phase 3 — Premium Bento Gallery

- **Data** — `src/data/paintings.js` generates 36 placeholder works with
  full metadata (title, category, medium, year, dimensions, tags,
  featured flag, dateAdded). Nothing downstream depends on these being
  generated — add an `image` field per piece and `GalleryCard` will use
  a real `<img>` automatically instead of the generative placeholder.
- **`GenerativePainting`** — seeded-per-id abstract composition standing
  in for real artwork so every card looks distinct rather than repeating
  one placeholder 36 times.
- **`ArtworkOfTheDay`** — a deterministic daily pick (by day-of-year),
  shown as a large banner above the grid.
- **`FilterBar`** — category pills (the collections), a live search over
  title/tags, and a Featured/Newest sort toggle.
- **`GridSwitcher` + `BentoGrid` / `MasonryGrid`** — bento uses a dense
  CSS grid where featured pieces claim a 2×2 cell; masonry uses CSS
  columns so natural aspect ratios stagger the layout. Switching is
  instant and preserves the current filter/search/sort state.
- **`useInfiniteReveal`** — paginates the filtered set 12 at a time via
  an `IntersectionObserver` sentinel; resets automatically whenever the
  filtered set changes identity.
- **`useLazyReveal`** — each card blurs up from a `Skeleton` once it
  scrolls into view, standing in for real image decode time until real
  `<img>` sources exist.
- **Custom cursor** — `CursorContext` + `CustomCursor` render a small
  "View" label that spring-follows the pointer while hovering any card
  (desktop/mouse only; untouched on touch devices).
- **Empty state** — filtering/searching down to zero results shows a
  dedicated message rather than a blank grid.

## Phase 4 — Artwork Viewer

- **Overlay routing** — clicking a card navigates to `/gallery/:id` while
  carrying `state.backgroundLocation`, so the viewer renders as a
  fullscreen overlay on top of the still-mounted gallery grid rather than
  a full page swap. The URL is real and shareable; direct visits to
  `/gallery/:id` (no background state) still open the viewer correctly,
  just without a grid visible behind it. Closing calls `navigate(-1)`,
  returning to the exact scroll position in the grid.
- **Shared transition** — `GalleryCard` and `ViewerStage` share a Framer
  Motion `layoutId` per painting, so the clicked card visually grows into
  the fullscreen image instead of a hard cut.
- **`ViewerStage`** — double-click/tap to zoom (1.8×) with drag-to-pan
  while zoomed; drag left/right when not zoomed to swipe between pieces.
- **Keyboard** — `useViewerKeyboard` binds `←`/`→` to prev/next and `Esc`
  to close.
- **`ViewerDetails`** — story, inspiration, medium, dimensions, year,
  collection, and tags, all pulled from `src/data/paintings.js`.
- **`ViewerControls`** — share (native share sheet if available, else
  copy-link with a confirmation toast), download (real image if
  `painting.image` is set, otherwise the generative SVG is serialized
  and downloaded directly), favorite (persisted via `useFavorites` /
  `localStorage`), and a slideshow toggle that auto-advances every 4s.
- Background scroll is locked while the viewer is open; it releases
  automatically on close.

## Phase 5 — Artist Story

- **Content** — `src/data/artist.js` holds all of it: bio paragraphs,
  philosophy quote, studio description, process steps, career timeline,
  and awards. Edit that one file to replace the placeholder text; no
  component changes needed.
- **`StoryHero`** — portrait placeholder + name, tagline, and opening
  bio, each line revealing on scroll via the shared `Reveal` wrapper.
- **`Philosophy`** — a centered pull-quote followed by `SignatureDraw`,
  the same hand-drawn-signature motif from the Phase 2 loader, reused
  here and triggered on scroll into view instead of on page load.
- **`StudioProcess`** — studio description + placeholder photo alongside
  a numbered process list.
- **`CareerTimeline`** — a vertical experience timeline plus a separate
  awards list. (A more detailed, statistics-driven exhibition timeline
  arrives in Phase 6 — this one stays intentionally simple.)
- **`Reveal`** — the scroll-triggered fade/slide wrapper used across all
  of the above; reusable for any future section that wants the same
  on-scroll entrance.

## Phase 6 — Timeline & Statistics

Appended to the Story page, below the Phase 5 sections. Content lives in
`src/data/recognition.js`.

- **`AnimatedCounters`** — four stats that count up from zero once
  scrolled into view (`useCountUp`, an eased `requestAnimationFrame`
  loop gated by `IntersectionObserver` — no extra dependency needed).
- **`ExhibitionTimeline`** — a more detailed, alternating left/right
  timeline (venue, city, exhibition type) — deliberately richer than
  Phase 5's simple career timeline, which stays as the at-a-glance
  version.
- **`CollectorTestimonials`** — one quote at a time, auto-rotating every
  6s with manual dot navigation and a crossfade between quotes.
- **`Publications`** — a simple press-mentions list (outlet, year, title).

## Phase status

- [x] **Phase 1 — Foundation & Design System** ✅
- [x] **Phase 2 — Navigation & Cinematic Hero** ✅
- [x] **Phase 3 — Premium Bento Gallery** ✅
- [x] **Phase 4 — Artwork Viewer** ✅
- [x] **Phase 5 — Artist Story** ✅
- [x] **Phase 6 — Timeline & Statistics** ✅
- [ ] Phase 7 — Contact
- [ ] Phase 4 — Artwork Viewer
- [ ] Phase 5 — Artist Story
- [ ] Phase 6 — Timeline & Statistics
- [ ] Phase 7 — Contact
- [ ] Phase 8 — Motion Design
- [ ] Phase 9 — Responsive
- [ ] Phase 10 — Performance
- [ ] Phase 11 — Production Polish
