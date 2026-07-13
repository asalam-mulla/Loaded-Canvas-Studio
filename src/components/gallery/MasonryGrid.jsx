import { GalleryCard } from "./GalleryCard";

export function MasonryGrid({ items }) {
    return (
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:_balance]">
            {items.map((painting) => (
                <div key={painting.id} className="mb-4 break-inside-avoid">
                    <GalleryCard painting={painting} />
                </div>
            ))}
        </div>
    );
}