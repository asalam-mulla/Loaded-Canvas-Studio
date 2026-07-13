import { ChevronLeft, ChevronRight } from "lucide-react";

export function ViewerNav({ onPrev, onNext }) {
    return (
        <>
            <button
                type="button"
                onClick={onPrev}
                aria-label="Previous painting"
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-surface/70 backdrop-blur hover:border-accent hover:text-accent sm:left-6"
            >
                <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
                type="button"
                onClick={onNext}
                aria-label="Next painting"
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-surface/70 backdrop-blur hover:border-accent hover:text-accent sm:right-6"
            >
                <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
        </>
    );
}
