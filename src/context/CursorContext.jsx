import { createContext, useContext, useMemo, useState } from "react";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
    const [label, setLabel] = useState(null);
    const value = useMemo(() => ({ label, setLabel }), [label]);
    return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) throw new Error("useCursor must be used within a CursorProvider");
    return context;
}