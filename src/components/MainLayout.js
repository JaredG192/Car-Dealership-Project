import { Outlet } from "react-router-dom";
import Footer from "./Footer";

/**
 * MainLayout
 *
 * Wraps public pages that should include the footer.
 * The <Outlet /> renders the current route's page.
 * Footer is always shown below it.
 */
export default function MainLayout() {
  return (
    <>
      {/* Page content */}
      <Outlet />

      {/* Global footer */}
      <Footer />
    </>
  );
}