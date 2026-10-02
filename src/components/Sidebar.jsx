import React from "react";
import { useApp } from "../context/AppContext";
import { 
  BarChart3, 
  ShoppingBag, 
  Layers, 
  FolderTree, 
  LayoutTemplate, 
  PlusCircle, 
  Coins,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export const Sidebar = ({ onOpenAddProductModal }) => {
  const { activeTab, setActiveTab, lang, orders, products } = useApp();

  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;
  const activeProductsCount = products.filter((p) => p.status === "Active").length;

  const navItems = [
    {
      id: "analytics",
      labelFr: "BI Analytics & ROAS",
      labelEn: "BI Analytics & ROAS",
      icon: BarChart3,
      badge: "LIVE",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
    },
    {
      id: "orders",
      labelFr: "Commandes (OMS)",
      labelEn: "Orders (OMS)",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : null,
      badgeColor: "bg-amber-500 text-slate-950 font-extrabold"
    },
    {
      id: "products",
      labelFr: "Catalogue Produits",
      labelEn: "Product Catalog",
      icon: Layers,
      badge: `${activeProductsCount}`,
      badgeColor: "bg-slate-800 text-slate-300 border-slate-700"
    },
    {
      id: "categories",
      labelFr: "Gestion Catégories",
      labelEn: "Category Management",
      icon: FolderTree,
      badge: null
    },
    {
      id: "cms",
      labelFr: "CMS & Bannières Hero",
      labelEn: "CMS & Hero Banners",
      icon: LayoutTemplate,
      badge: "PROMO",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30"
    }
  ];

  return (
    <aside className="w-full lg:w-64 xl:w-72 bg-[#0B0F17] border-b lg:border-b-0 lg:border-r border-slate-800/80 p-4 shrink-0 flex flex-col justify-between">
      
      <div className="space-y-6">
        
        {/* Navigation Header Title with Logo */}
        <div className="px-3 pt-2 space-y-3">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-700">
            <img src="/assets/logo.png" alt="3AL 7IT Logo" className="h-7 w-auto object-contain" />
            <span className="text-[9px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              GALERIE D'ART
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {lang === "fr" ? "Navigation Principale" : "Main Navigation"}
          </p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const label = lang === "fr" ? item.labelFr : item.labelEn;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-slate-900 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-500/5"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-amber-400 to-amber-600"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-amber-400" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span className="truncate">{label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Action Button */}
        <div className="pt-2 px-1">
          <button
            onClick={onOpenAddProductModal}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all cursor-pointer group"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>{lang === "fr" ? "Ajouter un Tableau" : "Add New Panel"}</span>
          </button>
        </div>
      </div>

      {/* Footer Info Widget */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 space-y-3">
        
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{lang === "fr" ? "Devise Actives" : "Active Currency"}</span>
            <span className="font-extrabold text-amber-400">DNT (د.ت)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{lang === "fr" ? "Gouvernorats" : "Governorates"}</span>
            <span className="font-bold text-slate-200">24 Tunisie</span>
          </div>
          <div className="pt-1.5 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Reload Client State</span>
          </div>
        </div>

        <p className="text-[10px] text-center text-slate-600">
          © 2026 Tableaux Décoratifs Admin v2.6
        </p>
      </div>
    </aside>
  );
};
