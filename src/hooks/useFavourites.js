import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "gallery-favorites";

function readFavorites() {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
}

export function useFavorites() {
    const [favorites, setFavorites] = useState(readFavorites);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

    const toggleFavorite = useCallback((id) => {
        setFavorites((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id]));
    }, []);

    return { favorites, isFavorite, toggleFavorite };
}
