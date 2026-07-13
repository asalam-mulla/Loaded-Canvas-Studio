// Placeholder collection — 36 works so the gallery, filters, and infinite
// scroll can all be reviewed at a realistic mid-size scale. Swap `title`,
// `medium`, `dimensions`, etc. for the real catalogue whenever it's ready;
// nothing downstream depends on these being generated.
//
// `palette` drives the generative placeholder in GenerativePainting.jsx —
// once a real image exists for a piece, add an `image` field and
// GalleryCard will use it instead (see GalleryCard.jsx).

const CATEGORIES = ["Landscapes", "Portraits", "Abstract", "Still Life", "Studies"];

const PALETTES = [
    ["var(--pigment-oxide)", "var(--pigment-ochre)", "var(--pigment-charcoal)"],
    ["var(--pigment-ochre)", "var(--pigment-stone)", "var(--pigment-linen)"],
    ["var(--pigment-charcoal)", "var(--pigment-oxide)", "var(--pigment-parchment)"],
    ["#5C6E91", "var(--pigment-ochre)", "var(--pigment-linen)"],
    ["#4B6B53", "var(--pigment-oxide)", "var(--pigment-charcoal)"],
    ["var(--pigment-oxide)", "#5C6E91", "var(--pigment-parchment)"],
];

const TITLE_WORDS = [
    "Untitled", "Quiet Interior", "Morning Light", "After the Rain", "Still Water",
    "Studio, Late", "Ochre Field", "Two Figures", "The Long Table", "North Window",
    "Winter Study", "Coastal Form", "Red Interior", "Threshold", "Low Sun",
    "Vessel Study", "The Orchard", "Blue Hour", "Fragment", "Standing Figure",
];

const ASPECTS = ["portrait", "landscape", "square"];

function pick(arr, index) {
    return arr[index % arr.length];
}

export const PAINTINGS = Array.from({ length: 36 }, (_, i) => {
    const id = i + 1;
    const category = pick(CATEGORIES, i);
    const daysAgo = i * 4 + (id % 3);

    return {
        id,
        title: `${pick(TITLE_WORDS, i)}${id % 12 === 0 ? ` No. ${Math.ceil(id / 12)}` : ""}`,
        category,
        medium: id % 3 === 0 ? "Acrylic on canvas" : id % 3 === 1 ? "Oil on canvas" : "Oil on linen",
        year: 2021 + (id % 5),
        dimensions: `${60 + (id % 5) * 10} × ${80 + (id % 4) * 10} cm`,
        tags: [category.toLowerCase(), id % 2 === 0 ? "warm" : "muted"],
        palette: pick(PALETTES, i),
        aspect: pick(ASPECTS, i),
        featured: id % 9 === 0,
        dateAdded: new Date(Date.now() - daysAgo * 86400000).toISOString(),
    };
});

export const CATEGORY_LIST = ["All", ...CATEGORIES];