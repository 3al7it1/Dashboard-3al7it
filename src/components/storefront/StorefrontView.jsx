import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { StorefrontHeader } from "./StorefrontHeader";
import { StorefrontHero } from "./StorefrontHero";
import { StorefrontCatalog } from "./StorefrontCatalog";
import { ProductDetailModal } from "./ProductDetailModal";
import { CustomStudioModal } from "./CustomStudioModal";
import { CartDrawer } from "./CartDrawer";
import { ExpressCheckoutModal } from "./ExpressCheckoutModal";
import { StorefrontFooter } from "./StorefrontFooter";
import { ToastContainer } from "../ToastContainer";

export const StorefrontView = () => {
  const { navigateToView } = useApp();

  // Secret admin shortcut for store manager: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        navigateToView("admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToView]);

  return (
    <div 
      className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-500 selection:text-stone-950"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Main Navigation Bar */}
      <StorefrontHeader />

      {/* Hero Showcase */}
      <StorefrontHero />

      {/* Dynamic Catalog & Category Filtering */}
      <main className="flex-1">
        <StorefrontCatalog />
      </main>

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CustomStudioModal />
      <CartDrawer />
      <ExpressCheckoutModal />

      {/* Footer */}
      <StorefrontFooter />
    </div>
  );
};
