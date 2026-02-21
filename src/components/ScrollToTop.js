import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Prevent the browser from restoring the old scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Jump to top immediately on every navigation
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash]);

  return null;
}