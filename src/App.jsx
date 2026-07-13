import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PremiumLoader } from "./components/loader/PremiumLoader";
import { Navbar } from "./components/layout/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ArtworkViewer from "./pages/ArtworkViewer";
import Story from "./pages/Story";
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
  const backgroundLocation = location.state?.backgroundLocation;
  const mainLocation = backgroundLocation || location;

  return (
    <>
      <a href="#main" className="skip-link focus:skip-link-visible">
        Skip to content
      </a>

      <PremiumLoader onDone={() => setReady(true)} />

      <Navbar />

      <main id="main" style={{ visibility: ready ? "visible" : "hidden" }}>
        <AnimatePresence mode="wait">
          <Routes location={mainLocation} key={mainLocation.pathname}>
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
                  <Gallery />
                </PageTransition>
              }
            />
            <Route
              path="/story"
              element={
                <PageTransition>
                  <Story />
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

      <AnimatePresence>
        <Routes location={location} key={/^\/gallery\/\d+/.test(location.pathname) ? "viewer" : "closed"}>
          <Route path="/gallery/:id" element={<ArtworkViewer />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
