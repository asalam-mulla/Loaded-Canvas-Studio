import { GalleryCard } from "./GalleryCard";

export function BentoGrid({ items }) {
    return (
        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4 [grid-auto-flow:dense]">
            {items.map((painting) => (
                <GalleryCard
                    key={painting.id}
                    painting={painting}
                    fill
                    span={painting.featured ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}
                />
            ))}
        </div>
    );
}