import { useMemo, useState } from "react";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { Badge } from "../components/ui/Badge";
import { ArtworkOfTheDay } from "../components/gallery/ArtworkOfTheDay";
import { FilterBar } from "../components/gallery/FilterBar";
import { GridSwitcher } from "../components/gallery/GridSwitcher";
import { BentoGrid } from "../components/gallery/BentoGrid";
import { MasonryGrid } from "../components/gallery/MasonryGrid";
import { CustomCursor } from "../components/effects/CustomCursor";
import { CursorProvider } from "../context/CursorContext";
import { useInfiniteReveal } from "../hooks/useInfiniteReveal";
import { PAINTINGS } from "../data/paintings";

export default function Gallery() {
    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("featured");
    const [layout, setLayout] = useState("bento");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        const results = PAINTINGS.filter((p) => {
            const matchesCategory = category === "All" || p.category === category;
            const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q));
            return matchesCategory && matchesQuery;
        });

        return [...results].sort((a, b) => {
            if (sort === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
            return Number(b.featured) - Number(a.featured) || a.id - b.id;
        });
    }, [category, query, sort]);

    const { visibleItems, hasMore, sentinelRef } = useInfiniteReveal(filtered);

    return (
        <CursorProvider>
            <CustomCursor />

            <Section spacing="tight" className="!pt-32">
                <Container>
                    <Badge>The Collection</Badge>
                    <h1 className="mt-4 font-display text-4xl sm:text-5xl">{PAINTINGS.length} works, in progress</h1>
                    <p className="mt-3 max-w-lg text-ink-muted">
                        Filter by collection, search by title, and switch between a bento or masonry view.
                    </p>

                    <div className="mt-10">
                        <ArtworkOfTheDay />
                    </div>
                </Container>
            </Section>

            <Section spacing="tight" className="!pt-0">
                <Container>
                    <div className="flex flex-col gap-6 border-y border-hairline py-6 lg:flex-row lg:items-center lg:justify-between">
                        <FilterBar
                            category={category}
                            onCategoryChange={setCategory}
                            query={query}
                            onQueryChange={setQuery}
                            sort={sort}
                            onSortChange={setSort}
                        />
                        <GridSwitcher value={layout} onChange={setLayout} />
                    </div>

                    <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-muted">
                        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
                    </p>

                    <div className="mt-6">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-hairline py-24 text-center">
                                <p className="font-display text-2xl">Nothing matches yet</p>
                                <p className="text-ink-muted">Try a different collection or search term.</p>
                            </div>
                        ) : layout === "bento" ? (
                            <BentoGrid items={visibleItems} />
                        ) : (
                            <MasonryGrid items={visibleItems} />
                        )}
                    </div>

                    {hasMore && <div ref={sentinelRef} className="h-px w-full" aria-hidden />}
                </Container>
            </Section>
        </CursorProvider>
    );
}