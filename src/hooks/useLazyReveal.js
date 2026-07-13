import { useEffect, useRef, useState } from "react";

/**
 * Reveals content once it enters the viewport, then flips `loaded` a
 * moment later so callers can transition from a blurred skeleton to the
 * sharp artwork. The delay stands in for real image decode time — once
 * real <img> sources exist, swap the setTimeout for that image's actual
 * onLoad event and this hook's contract stays the same.
 */
export function useLazyReveal({ delay = 260 } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "120px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) return;
        const timer = setTimeout(() => setLoaded(true), delay);
        return () => clearTimeout(timer);
    }, [inView, delay]);

    return { ref, inView, loaded };
}