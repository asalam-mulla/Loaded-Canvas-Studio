import { useState } from "react";
import { X, Heart, Share2, Download, Play, Pause } from "lucide-react";
import { cn } from "../../lib/cn";

function IconButton({ label, active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            aria-pressed={active}
            className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border border-hairline transition-colors",
                active ? "border-accent text-accent" : "text-ink-muted hover:text-ink"
            )}
        >
            {children}
        </button>
    );
}

export function ViewerControls({ painting, onClose, isFavorite, onToggleFavorite, slideshow, onToggleSlideshow }) {
    const [copied, setCopied] = useState(false);
    const image = painting.image;

    async function handleShare() {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title: painting.title, url });
                return;
            }
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Share was cancelled or clipboard access was denied — no action needed.
        }
    }

    function handleDownload() {
        const filename = `${painting.title.toLowerCase().replace(/\s+/g, "-")}.${image ? "jpg" : "svg"}`;

        if (image) {
            const link = document.createElement("a");
            link.href = image;
            link.download = filename;
            link.click();
            return;
        }

        const svgNode = document.getElementById(`painting-svg-${painting.id}`);
        if (!svgNode) return;
        const markup = new XMLSerializer().serializeToString(svgNode);
        const blob = new Blob([markup], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="glass sticky top-0 z-10 flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-6">
            <IconButton label="Close viewer" onClick={onClose}>
                <X className="h-5 w-5" aria-hidden />
            </IconButton>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <IconButton label="Copy link" onClick={handleShare}>
                        <Share2 className="h-[18px] w-[18px]" aria-hidden />
                    </IconButton>
                    {copied && (
                        <span className="absolute right-0 top-12 whitespace-nowrap rounded-md bg-charcoal px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-linen">
                            Link copied
                        </span>
                    )}
                </div>
                <IconButton label="Download" onClick={handleDownload}>
                    <Download className="h-[18px] w-[18px]" aria-hidden />
                </IconButton>
                <IconButton label={isFavorite ? "Remove from favorites" : "Add to favorites"} active={isFavorite} onClick={onToggleFavorite}>
                    <Heart className="h-[18px] w-[18px]" fill={isFavorite ? "currentColor" : "none"} aria-hidden />
                </IconButton>
                <IconButton label={slideshow ? "Pause slideshow" : "Play slideshow"} active={slideshow} onClick={onToggleSlideshow}>
                    {slideshow ? <Pause className="h-[18px] w-[18px]" aria-hidden /> : <Play className="h-[18px] w-[18px]" aria-hidden />}
                </IconButton>
            </div>
        </div>
    );
}