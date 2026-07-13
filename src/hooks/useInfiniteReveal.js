import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 12;

/**
 * Paginates `items` client-side, appending PAGE_SIZE more whenever the
 * sentinel ref scrolls into view. Resets to one page whenever `items`
 * itself changes identity (e.g. a filter or search narrows the set) —
 * pass a new array reference from the caller to trigger that.
 */
export function useInfiniteReveal(items) {
    const [count, setCount] = useState(PAGE_SIZE);
    const sentinelRef = useRef(null);

    useEffect(() => {
        setCount(PAGE_SIZE);
    }, [items]);

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCount((current) => Math.min(current + PAGE_SIZE, items.length));
                }
            },
            { rootMargin: "400px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [items.length]);

    return {
        visibleItems: items.slice(0, count),
        hasMore: count < items.length,
        sentinelRef,
    };
}