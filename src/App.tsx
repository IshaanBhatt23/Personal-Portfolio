import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import "./index.css";

/** Scroll to top on route change and focus the main region (better on mobile + a11y) */
function ScrollToTopAndFocus() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Avoid janky smooth scroll on route changes for users with reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReduced ? "auto" : "auto" });
    const main = document.getElementById("main");
    if (main) main.focus();
  }, [pathname]);
  return null;
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen-mobile flex flex-col">
      {/* Skip link becomes visible on keyboard focus */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:px-3 focus:py-2 focus:bg-secondary focus:text-secondary-foreground"
      >
        Skip to content
      </a>

      {/* Responsive page padding; adjust if your pages add their own container */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <ScrollToTopAndFocus />
      <AppShell>
        {/* Make the main region programmatically focusable */}
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes>
            {/* The main path "/" renders your entire single-page portfolio */}
            <Route path="/" element={<Index />} />

            {/* Catch-all for unmatched URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AppShell>
    </Router>
  );
};

export default App;
