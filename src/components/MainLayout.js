import { Outlet } from "react-router-dom";
import Footer from "./Footer";

/**
 * MainLayout
 * Used for normal public pages that should include the footer.
 */
export default function MainLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}