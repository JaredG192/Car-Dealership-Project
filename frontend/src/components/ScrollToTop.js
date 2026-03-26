import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 *
 * Forces the page to scroll to the top
 * whenever the route changes.
 *
 * Prevents browser scroll restoration
 * so navigation always feels consistent.
 */
export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Disable browser auto scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to top on every route change
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash]);

  // This component renders nothing
  return null;
}