import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { ToastContainer } from "./components/ToastContainer";
import { AnalyticsTab } from "./components/AnalyticsTab";
import { OrdersTab } from "./components/OrdersTab";
import { ProductsTab } from "./components/ProductsTab";
import { CategoriesTab } from "./components/CategoriesTab";
import { CmsTab } from "./components/CmsTab";
import { AdminSettingsModal } from "./components/AdminSettingsModal";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// ─── Loading Screen ───────────────────────────────────────────
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-[#0B0F17] flex flex-col items-center justify-center gap-6 z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl shadow-amber-500/20 border border-slate-700">
        <img src="/assets/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
      </div>
      <div className="text-center space-y-1">
        <h1 className="text-xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
          3AL 7IT
        </h1>
        <p className="text-xs text-slate-400">Chargement du Backoffice Admin...</p>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-amber-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, delay, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);

// ─── Main Dashboard Layout ────────────────────────────────────
const MainLayout = () => {
  const { activeTab, isLoading } = useApp();
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(false);
  const [isOpenSettingsModal, setIsOpenSettingsModal] = useState(false);

  const handleOpenAddProductModal = () => setIsOpenAddProductModal(true);
  const handleOpenSettingsModal = () => setIsOpenSettingsModal(true);

  if (isLoading) return <LoadingScreen />;

  return (
    <div
      className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* Toast Notifications Overlay */}
      <ToastContainer />

      {/* Admin Settings Modal */}
      <AdminSettingsModal
        isOpen={isOpenSettingsModal}
        onClose={() => setIsOpenSettingsModal(false)}
      />

      {/* Top Navbar — sticky */}
      <Navbar
        globalSearchQuery={globalSearchQuery}
        setGlobalSearchQuery={setGlobalSearchQuery}
        onOpenAddProductModal={handleOpenAddProductModal}
        onOpenSettingsModal={handleOpenSettingsModal}
      />

      {/* Main Body: Sidebar + Content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">

        {/* Left Navigation Rail */}
        <Sidebar onOpenAddProductModal={handleOpenAddProductModal} />

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-[1400px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {activeTab === "analytics" && <AnalyticsTab />}
                {activeTab === "orders" && <OrdersTab globalSearchQuery={globalSearchQuery} />}
                {activeTab === "products" && (
                  <ProductsTab
                    globalSearchQuery={globalSearchQuery}
                    isOpenModal={isOpenAddProductModal}
                    setIsOpenModal={setIsOpenAddProductModal}
                  />
                )}
                {activeTab === "categories" && <CategoriesTab />}
                {activeTab === "cms" && <CmsTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
