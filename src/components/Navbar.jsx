import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Globe, 
  Search, 
  Settings, 
  Bell, 
  Sparkles, 
  Coins, 
  CheckCircle2,
  ChevronDown,
  UserCheck,
  Database,
  PlusCircle
} from "lucide-react";

export const Navbar = ({ globalSearchQuery, setGlobalSearchQuery, onOpenAddProductModal, onOpenSettingsModal }) => {
  const { lang, setLang, orders, isDbConnected } = useApp();
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Total revenue sum
  const totalCA = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 px-2 py-1 bg-white rounded-xl border border-slate-700 flex items-center justify-center shadow-lg group-hover:border-amber-500/50 transition-all shrink-0 overflow-hidden">
              <img
                src="/assets/logo.png"
                alt="3AL 7IT Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg lg:text-xl tracking-tight text-white font-['Outfit',sans-serif]">
                  3AL 7IT
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full tracking-wider uppercase">
                  /admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {lang === "fr" ? "Galerie d'Art & Backoffice Luxe" : "Art Gallery & Backoffice Portal"}
              </p>
            </div>
          </div>

          {/* DNT Currency Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/20 text-xs font-semibold text-amber-300 shadow-inner">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Devise : <strong>DNT (TND - د.ت)</strong></span>
          </div>

          {/* Database Status Indicator Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold">
            <Database className={`w-3.5 h-3.5 ${isDbConnected ? "text-emerald-400" : "text-cyan-400"}`} />
            <span className="text-slate-300">
              {isDbConnected ? (
                <strong className="text-emerald-400">Supabase PostgreSQL</strong>
              ) : (
                <strong className="text-cyan-400">Zero-Cost LocalStorage Sync</strong>
              )}
            </span>
          </div>
        </div>

        {/* Center: Global Quick Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder={
              lang === "fr" 
                ? "Rechercher une commande, client, produit..." 
                : "Search order, client, product..."
            }
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
          />
          {globalSearchQuery && (
            <button
              onClick={() => setGlobalSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Actions & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs">
            <span className="text-slate-400">{lang === "fr" ? "CA Enregistré:" : "CA Revenue:"}</span>
            <span className="font-bold text-emerald-400">{totalCA.toLocaleString()} DNT</span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setLang("fr")}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                lang === "fr"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Français"
            >
              <span className="text-xs">🇫🇷</span>
              <span>FR</span>
            </button>
            <button
              onClick={() => setLang("en")}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                lang === "en"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="English"
            >
              <span className="text-xs">🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationMenu(!showNotificationMenu);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[9px] font-bold text-black flex items-center justify-center animate-pulse">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationMenu && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <h4 className="font-bold text-sm text-white">
                    {lang === "fr" ? "Notifications Commandes" : "Order Notifications"}
                  </h4>
                  <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {pendingCount} {lang === "fr" ? "En attente" : "Pending"}
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {orders
                    .filter((o) => o.status === "Pending")
                    .slice(0, 4)
                    .map((ord) => (
                      <div
                        key={ord.id}
                        className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start justify-between text-xs"
                      >
                        <div>
                          <p className="font-semibold text-white">{ord.customerName}</p>
                          <p className="text-slate-400 text-[11px]">
                            {ord.governorate} • {ord.totalAmount} DNT
                          </p>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                          {ord.id}
                        </span>
                      </div>
                    ))}
                  {pendingCount === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">
                      {lang === "fr" ? "Aucune commande en attente." : "No pending orders."}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Admin Settings Modal Trigger */}
          <button
            onClick={onOpenSettingsModal}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title={lang === "fr" ? "Paramètres Admin & Diagnostic" : "Admin Settings"}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden lg:inline">{lang === "fr" ? "Paramètres" : "Settings"}</span>
          </button>

          {/* Admin Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotificationMenu(false);
              }}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-xs shadow">
                TD
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-semibold text-slate-200 leading-tight">Admin Principal</p>
                <p className="text-[10px] text-amber-400 font-medium">3AL 7IT</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center gap-2 p-2 border-b border-slate-800 mb-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-bold text-white">Directeur Général</p>
                    <p className="text-[10px] text-slate-400">admin@3al7it.tn</p>
                  </div>
                </div>
                <div className="space-y-1 text-slate-300">
                  <button
                    onClick={() => {
                      onOpenAddProductModal();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-amber-300 flex items-center gap-2 font-semibold"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> {lang === "fr" ? "Nouveau Produit" : "New Product"}
                  </button>
                  <button
                    onClick={() => {
                      onOpenSettingsModal();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-2 font-semibold"
                  >
                    <Settings className="w-3.5 h-3.5" /> {lang === "fr" ? "Paramètres Système" : "System Settings"}
                  </button>
                  <div className="px-3 py-2 text-slate-400 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                    <span>{lang === "fr" ? "Version Portal:" : "Portal Version:"}</span>
                    <span className="font-bold text-amber-400">v2.6 Luxury</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
