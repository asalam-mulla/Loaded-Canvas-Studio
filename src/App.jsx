import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumLoader } from "./components/loader/PremiumLoader";
import { Navbar } from "./components/layout/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ComingSoon from "./pages/ComingSoon";
import StyleGuide from "./pages/StyleGuide";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

function PageTransition({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const location = useLocation();

  return (
    <>
      <a href="#main" className="skip-link focus:skip-link-visible">
        Skip to content
      </a>

      <PremiumLoader onDone={() => setReady(true)} />

      <Navbar />

      <main id="main" style={{ visibility: ready ? "visible" : "hidden" }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/gallery"
              element={
                <PageTransition>
                  <ComingSoon title="The Gallery" phase="Phase 03 — Premium Bento Gallery" />
                </PageTransition>
              }
            />
            <Route
              path="/story"
              element={
                <PageTransition>
                  <ComingSoon title="The Artist's Story" phase="Phase 05 — Artist Story" />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ComingSoon title="Get in Touch" phase="Phase 07 — Contact" />
                </PageTransition>
              }
            />
            <Route
              path="/style-guide"
              element={
                <PageTransition>
                  <StyleGuide />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}