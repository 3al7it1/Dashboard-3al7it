import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES_TREE } from "../../data/mockData";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Layers, 
  Flame, 
  ShieldCheck, 
  Truck, 
  Globe,
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";

export const StorefrontHeader = () => {
  const { 
    lang, 
    setLang, 
    cart, 
    setIsCartOpen,
    setStorefrontCategory,
    setStorefrontSubcategory,
    setStorefrontSport,
    setStorefrontSearch,
    setIsCustomStudioOpen,
    products,
    setSelectedProductForPdp
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  const cartItemCount = cart.reduce((acc, curr) => acc + (curr.quantity || 1), 0);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.title?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.discipline?.toLowerCase().includes(q) ||
          p.nestedSport?.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleSelectCategory = (catName, subcat = null, sport = null) => {
    setStorefrontCategory(catName);
    setStorefrontSubcategory(subcat);
    setStorefrontSport(sport);
    setStorefrontSearch("");
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);

    // Smooth scroll to catalog
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenPacks = () => {
    setStorefrontCategory("Packs");
    setStorefrontSubcategory("Pack en 3");
    setStorefrontSport(null);
    setStorefrontSearch("");
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);

    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBestSellers = () => {
    setStorefrontCategory("Best Sellers");
    setStorefrontSubcategory(null);
    setStorefrontSport(null);
    setStorefrontSearch("");
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);

    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCustomStudio = () => {
    setIsCustomStudioOpen(true);
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setStorefrontSearch(searchQuery);
    setIsSearchFocused(false);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sportsList = ["Football", "Basketball", "MMA", "Boxing", "Motorsport"];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {lang === "fr" 
                ? "Galerie d'Art Mural & Tableaux Décoratifs en Tunisie — Finitions Avec Cadre & Panneaux Simples" 
                : "Premium Decorative Wall Art Gallery in Tunisia — Framed & Sleek Unframed Panels"}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-stone-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              {lang === "fr" ? "Livraison Rapide 24 Gouvernorats" : "Fast Shipping Across 24 Governorates"}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {lang === "fr" ? "Paiement à la Livraison" : "Cash on Delivery"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleSelectCategory("Tous")}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="h-12 w-12 rounded-xl bg-stone-900 p-1 flex items-center justify-center border border-stone-800 shadow-md group-hover:border-amber-500 transition-colors">
              <img
                src="/assets/logo.png"
                alt="Tableaux Décoratifs Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 font-['Outfit',sans-serif] block leading-tight">
                Tableaux Décoratifs
              </span>
              <span className="text-[11px] text-stone-500 tracking-wider uppercase font-semibold block">
                {lang === "fr" ? "Galerie d'Art & Panneaux Muraux" : "Art Gallery & Custom Prints"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            
            {/* Nos Tableaux (Mega-Menu Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                onClick={() => handleSelectCategory("Nos Tableaux")}
                className="flex items-center gap-1.5 text-sm font-bold text-stone-800 hover:text-amber-600 transition-colors py-2"
              >
                <span>{lang === "fr" ? "Nos Tableaux" : "Our Art"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180 text-amber-600" : "text-stone-400"}`} />
              </button>

              {/* Mega-menu dropdown panel */}
              {isMegaMenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-[540px] z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 grid grid-cols-2 gap-6 animate-fadeIn">
                    <div>
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                        {lang === "fr" ? "Univers Décoratifs" : "Art Themes"}
                      </h4>
                      <ul className="space-y-2">
                        {[
                          { name: "Music", slug: "music" },
                          { name: "Films & Séries", slug: "films-series" },
                          { name: "Automobile", slug: "automobile" },
                          { name: "Art & Design", slug: "art-design" },
                          { name: "Motivation", slug: "motivation" }
                        ].map((sub) => (
                          <li key={sub.slug}>
                            <button
                              onClick={() => handleSelectCategory("Nos Tableaux", sub.name)}
                              className="text-sm font-medium text-stone-700 hover:text-amber-600 hover:translate-x-1 transition-all flex items-center justify-between w-full py-1 text-left"
                            >
                              <span>{sub.name}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-l border-stone-100 pl-6">
                      <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Sports</span>
                      </h4>
                      <ul className="space-y-2">
                        {sportsList.map((sport) => (
                          <li key={sport}>
                            <button
                              onClick={() => handleSelectCategory("Nos Tableaux", "Sports", sport)}
                              className="text-sm font-medium text-stone-700 hover:text-amber-600 hover:translate-x-1 transition-all flex items-center justify-between w-full py-1 text-left"
                            >
                              <span>{sport}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-span-2 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 bg-stone-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <span>🎨 {lang === "fr" ? "Finition au choix : Avec Cadre ou Panneau Simple" : "Choice of finish: Framed or Sleek Panel"}</span>
                      <button
                        onClick={() => handleSelectCategory("Nos Tableaux")}
                        className="font-bold text-amber-700 hover:underline"
                      >
                        {lang === "fr" ? "Voir toute la collection →" : "View entire collection →"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Packs (Pack en 3) */}
            <button
              onClick={handleOpenPacks}
              className="flex items-center gap-1.5 text-sm font-bold text-stone-800 hover:text-amber-600 transition-colors relative py-2 group"
            >
              <Layers className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              <span>{lang === "fr" ? "Packs (Pack en 3)" : "Packs (3-Piece)"}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-500/15 text-amber-700 rounded-full border border-amber-500/30">
                -25%
              </span>
            </button>

            {/* Personnalisé (Custom Studio) */}
            <button
              onClick={handleOpenCustomStudio}
              className="flex items-center gap-1.5 text-sm font-bold text-stone-800 hover:text-amber-600 transition-colors py-2 group"
            >
              <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
              <span>{lang === "fr" ? "Personnalisé" : "Custom Studio"}</span>
            </button>

            {/* Best Sellers */}
            <button
              onClick={handleOpenBestSellers}
              className="flex items-center gap-1.5 text-sm font-bold text-stone-800 hover:text-amber-600 transition-colors py-2 group"
            >
              <Flame className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
              <span>{lang === "fr" ? "Best Sellers" : "Best Sellers"}</span>
            </button>
          </nav>

          {/* Right Actions: Search + Language + Cart */}
          <div className="flex items-center gap-3">
            
            {/* Quick Search Bar */}
            <div ref={searchContainerRef} className="relative hidden md:block w-56 lg:w-72">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={lang === "fr" ? "Rechercher tableau, sport..." : "Search wall art..."}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 hover:bg-stone-50 border border-stone-200 rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </form>

              {/* Instant Search Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-2 border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3">
                    {lang === "fr" ? "Suggestions directes" : "Quick matches"}
                  </div>
                  <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setSelectedProductForPdp(prod);
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="p-3 flex items-center gap-3 hover:bg-amber-50/50 cursor-pointer transition-colors"
                      >
                        <img
                          src={prod.imagesFramed?.[0] || prod.images?.[0]}
                          alt={prod.title}
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-stone-900 truncate">{prod.title}</p>
                          <p className="text-[11px] text-amber-700 font-semibold">
                            {lang === "fr" ? "Dès" : "From"} {prod.pricingMatrixPanel?.A4 || 35} DNT
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2 bg-stone-50 hover:bg-stone-100 text-center text-xs font-bold text-amber-700 border-t border-stone-200"
                  >
                    {lang === "fr" ? `Voir tous les résultats pour "${searchQuery}"` : `View all results for "${searchQuery}"`}
                  </button>
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center bg-stone-100 rounded-full p-1 border border-stone-200">
              <button
                onClick={() => setLang("fr")}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === "fr" ? "bg-stone-900 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                  lang === "en" ? "bg-stone-900 text-white shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-stone-900 text-white hover:bg-amber-600 transition-colors shadow-md flex items-center justify-center group"
              title={lang === "fr" ? "Voir le panier" : "View cart"}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[116px] z-50 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-b border-stone-200 p-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "fr" ? "Rechercher tableau, sport..." : "Search wall art..."}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-100 border border-stone-200 rounded-xl"
              />
            </form>

            {/* Mobile Navigation List */}
            <div className="space-y-3 font-semibold text-stone-800">
              <button
                onClick={() => handleSelectCategory("Tous")}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-stone-100 text-base"
              >
                🏠 {lang === "fr" ? "Tous les Tableaux" : "All Wall Art"}
              </button>
              
              <div className="pt-2 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider px-3 mb-2">
                  {lang === "fr" ? "Nos Tableaux par Univers" : "Art Themes"}
                </p>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {["Music", "Films & Séries", "Automobile", "Art & Design", "Motivation"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSelectCategory("Nos Tableaux", sub)}
                      className="text-left py-1.5 px-2.5 rounded-lg text-sm hover:bg-amber-50 hover:text-amber-700"
                    >
                      • {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider px-3 mb-2">
                  ⚽ Sports
                </p>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {sportsList.map((sport) => (
                    <button
                      key={sport}
                      onClick={() => handleSelectCategory("Nos Tableaux", "Sports", sport)}
                      className="text-left py-1.5 px-2.5 rounded-lg text-sm hover:bg-amber-50 hover:text-amber-700"
                    >
                      • {sport}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 space-y-2">
                <button
                  onClick={handleOpenPacks}
                  className="w-full text-left py-2.5 px-3 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-between font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    {lang === "fr" ? "Packs (Pack en 3)" : "Packs (3-Piece)"}
                  </span>
                  <span className="text-xs bg-amber-500 text-stone-900 px-2 py-0.5 rounded-full font-black">
                    -25%
                  </span>
                </button>

                <button
                  onClick={handleOpenCustomStudio}
                  className="w-full text-left py-2.5 px-3 rounded-xl bg-stone-900 text-white flex items-center gap-2 font-bold"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {lang === "fr" ? "Personnalisé (Studio & Visualiseur)" : "Custom Studio & Live Wall"}
                </button>

                <button
                  onClick={handleOpenBestSellers}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-stone-100 flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-rose-500" />
                  {lang === "fr" ? "Best Sellers" : "Best Sellers"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
