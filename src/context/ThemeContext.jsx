import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "gallery-theme";

function getInitialTheme() {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    // Follow OS changes only if the user has never made an explicit choice.
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event) => {
            const hasExplicitChoice = window.localStorage.getItem(STORAGE_KEY);
            if (!hasExplicitChoice) setTheme(event.matches ? "dark" : "light");
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === "light" ? "dark" : "light"));
    }, []);

    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}