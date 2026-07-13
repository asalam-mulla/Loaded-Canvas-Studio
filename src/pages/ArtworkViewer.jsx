import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PAINTINGS } from "../data/paintings";
import { ViewerControls } from "../components/viewer/ViewerControls";
import { ViewerStage } from "../components/viewer/ViewerStage";
import { ViewerDetails } from "../components/viewer/ViewerDetails";
import { ViewerNav } from "../components/viewer/ViewerNav";
import { useFavorites } from "../hooks/useFavorites";
import { useViewerKeyboard } from "../hooks/useKeyboardNav";

const SLIDESHOW_INTERVAL = 4000;

export default function ArtworkViewer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [slideshow, setSlideshow] = useState(false);

    const backgroundLocation = location.state?.backgroundLocation;
    const index = PAINTINGS.findIndex((p) => p.id === Number(id));
    const painting = PAINTINGS[index];

    const nextId = PAINTINGS[(index + 1) % PAINTINGS.length]?.id;
    const prevId = PAINTINGS[(index - 1 + PAINTINGS.length) % PAINTINGS.length]?.id;

    function goTo(nextPaintingId) {
        navigate(`/gallery/${nextPaintingId}`, { replace: true, state: { backgroundLocation } });
    }

    function handleClose() {
        if (backgroundLocation) navigate(-1);
        else navigate("/gallery");
    }

    useViewerKeyboard({
        onNext: () => goTo(nextId),
        onPrev: () => goTo(prevId),
        onClose: handleClose,
    });

    // Lock background scroll while the viewer is open.
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (!slideshow) return;
        const timer = setInterval(() => goTo(nextId), SLIDESHOW_INTERVAL);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideshow, nextId]);

    useEffect(() => {
        if (!painting) handleClose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [painting]);

    if (!painting) return null;

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${painting.title} — fullscreen viewer`}
            className="fixed inset-0 z-[95] flex flex-col bg-surface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <ViewerControls
                painting={painting}
                onClose={handleClose}
                isFavorite={isFavorite(painting.id)}
                onToggleFavorite={() => toggleFavorite(painting.id)}
                slideshow={slideshow}
                onToggleSlideshow={() => setSlideshow((s) => !s)}
            />

            <div className="relative grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_380px]">
                <div className="relative flex items-center justify-center overflow-hidden">
                    <ViewerNav onPrev={() => goTo(prevId)} onNext={() => goTo(nextId)} />
                    <ViewerStage painting={painting} onNext={() => goTo(nextId)} onPrev={() => goTo(prevId)} />
                </div>

                <div className="border-t border-hairline lg:border-l lg:border-t-0">
                    <ViewerDetails painting={painting} />
                </div>
            </div>
        </motion.div>
    );
}
