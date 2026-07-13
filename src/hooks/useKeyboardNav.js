import { useEffect } from "react";

export function useViewerKeyboard({ onNext, onPrev, onClose }) {
    useEffect(() => {
        function handleKey(event) {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowRight") onNext();
            if (event.key === "ArrowLeft") onPrev();
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onNext, onPrev, onClose]);
}
