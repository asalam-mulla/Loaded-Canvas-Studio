import { useEffect, useRef, useState } from "react";

function easeOutGallery(t) {
    return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(target, { duration = 1200 } = {}) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                const start = performance.now();
                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    setValue(Math.round(target * easeOutGallery(progress)));
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            },
            { threshold: 0.6 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [target, duration]);

    return { ref, value };
}
