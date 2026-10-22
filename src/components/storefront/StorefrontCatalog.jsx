import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Sparkles, 
  Layers, 
  Flame, 
  Search, 
  SlidersHorizontal, 
  Check, 
  Eye, 
  Zap, 
  ArrowRight,
  Filter,
  CheckCircle2
} from "lucide-react";

export const StorefrontCatalog = () => {
  const { 
    lang, 
    products, 
    storefrontCategory, 
    setStorefrontCategory,
    storefrontSubcategory, 
    setStorefrontSubcategory,
    storefrontSport, 
    setStorefrontSport,
    storefrontSearch, 
    setStorefrontSearch,
    setSelectedProductForPdp,
    setExpressCheckoutItem,
    setIsExpressOrderModalOpen
  } = useApp();

  const [sortBy, setSortBy] = useState("default");
  const [activeFinishHover, setActiveFinishHover] = useState({}); // productId -> finish

  const sportsList = ["Football", "Basketball", "MMA", "Boxing", "Motorsport"];
  const subcategoriesList = ["Music", "Films & Séries", "Automobile", "Art & Design", "Motivation", "Sports"];

  // Filter products reactively
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Must be active (or not Draft)
      if (p.status === "Draft") return false;

      // Search match
      if (storefrontSearch.trim()) {
        const q = storefrontSearch.toLowerCase();
        const matches = 
          p.title?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.discipline?.toLowerCase().includes(q) ||
          p.nestedSport?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category matching
      if (storefrontCategory === "Tous") return true;

      if (storefrontCategory === "Best Sellers") {
        return (p.salesCount && p.salesCount >= 80) || p.category === "Best Sellers";
      }

      if (storefrontCategory === "Packs") {
        const isPack = 
          p.category === "Packs" || 
          p.subcategory === "Pack en 3" || 
          p.title?.toLowerCase().includes("pack") || 
          p.title?.toLowerCase().includes("triptyque");
        if (!isPack) return false;

        if (storefrontSubcategory && storefrontSubcategory !== "Tous") {
          return p.subcategory === storefrontSubcategory || p.title?.toLowerCase().includes("pack en 3");
        }
        return true;
      }

      if (storefrontCategory === "Nos Tableaux") {
        if (storefrontSubcategory) {
          if (storefrontSubcategory === "Sports") {
            const isSport = p.subcategory === "Sports" || p.discipline || p.nestedSport;
            if (!isSport) return false;
            if (storefrontSport) {
              const spLower = storefrontSport.toLowerCase();
              return (
                p.nestedSport?.toLowerCase() === spLower ||
                p.discipline?.toLowerCase() === spLower ||
                p.title?.toLowerCase().includes(spLower)
              );
            }
            return true;
          }
          return p.subcategory?.toLowerCase() === storefrontSubcategory.toLowerCase();
        }
        return p.category === "Nos Tableaux" || !p.category?.includes("Pack");
      }

      return p.category === storefrontCategory;
    });
  }, [products, storefrontCategory, storefrontSubcategory, storefrontSport, storefrontSearch]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.pricingMatrixPanel?.A4 || a.basePrice || 0) - (b.pricingMatrixPanel?.A4 || b.basePrice || 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.pricingMatrixFramed?.A0 || b.basePrice || 0) - (a.pricingMatrixFramed?.A0 || a.basePrice || 0));
    } else if (sortBy === "sales") {
      list.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const handleQuickExpressBuy = (e, prod) => {
    e.stopPropagation();
    const finish = "Avec Cadre";
    const dimension = "A3";
    const matrix = prod.pricingMatrixFramed || prod.pricingMatrix || { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 };
    const unitPrice = matrix[dimension] || prod.basePrice || 75;

    setExpressCheckoutItem({
      productId: prod.id,
      title: prod.title,
      finish,
      dimension,
      unitPrice,
      quantity: 1,
      image: prod.imagesFramed?.[0] || prod.images?.[0]
    });
    setIsExpressOrderModalOpen(true);
  };

  return (
    <section id="catalog-section" className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-6 bg-amber-500 rounded-full"></span>
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest">
                {lang === "fr" ? "Catalogue Galerie" : "Gallery Catalog"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight font-['Outfit',sans-serif]">
              {storefrontCategory === "Tous" && (lang === "fr" ? "Toutes Nos Créations Murales" : "All Wall Art Prints")}
              {storefrontCategory === "Nos Tableaux" && `${storefrontSubcategory || "Nos Tableaux"} ${storefrontSport ? `• ${storefrontSport}` : ""}`}
              {storefrontCategory === "Packs" && (lang === "fr" ? "Packs en 3 Panneaux (Triptyques)" : "3-Piece Wall Art Packs")}
              {storefrontCategory === "Best Sellers" && (lang === "fr" ? "Nos Plus Grands Succès (Best Sellers)" : "Our Top Best Sellers")}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {lang === "fr" 
                ? "Chaque tableau est personnalisable : sélectionnez votre finition (Avec Cadre ou Panneau Simple) et votre dimension (A4 à A0)."
                : "Every piece is customizable: pick your finish (Framed or Sleek Panel) and size (A4 to A0)."}
            </p>
          </div>

          {/* Sort selector & Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-400">
              {sortedProducts.length} {lang === "fr" ? "tableaux" : "pieces"}
            </span>
            <div className="flex items-center bg-stone-100 rounded-xl px-3 py-2 border border-stone-200 text-xs font-bold text-stone-700">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-2 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">{lang === "fr" ? "Tri : Recommandés" : "Sort: Featured"}</option>
                <option value="sales">{lang === "fr" ? "Plus Populaires" : "Best Selling"}</option>
                <option value="price-asc">{lang === "fr" ? "Prix : Croissant" : "Price: Low to High"}</option>
                <option value="price-desc">{lang === "fr" ? "Prix : Décroissant" : "Price: High to Low"}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Filter Tabs Bar */}
        <div className="py-6 flex flex-wrap items-center gap-2">
          
          {/* Tous */}
          <button
            onClick={() => {
              setStorefrontCategory("Tous");
              setStorefrontSubcategory(null);
              setStorefrontSport(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              storefrontCategory === "Tous"
                ? "bg-stone-900 text-white shadow-md"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {lang === "fr" ? "Tous les Tableaux" : "All Art"}
          </button>

          {/* Packs en 3 */}
          <button
            onClick={() => {
              setStorefrontCategory("Packs");
              setStorefrontSubcategory("Pack en 3");
              setStorefrontSport(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              storefrontCategory === "Packs"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === "fr" ? "Pack en 3 (Triptyques)" : "Pack en 3 (Bundles)"}</span>
            <span className="text-[10px] bg-amber-500 text-stone-900 px-1.5 py-0.2 rounded font-black ml-1">
              -25%
            </span>
          </button>

          {/* Nos Tableaux */}
          <button
            onClick={() => {
              setStorefrontCategory("Nos Tableaux");
              setStorefrontSubcategory(null);
              setStorefrontSport(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              storefrontCategory === "Nos Tableaux" && !storefrontSubcategory
                ? "bg-stone-900 text-white shadow-md"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {lang === "fr" ? "Nos Tableaux Solo" : "Solo Art Prints"}
          </button>

          {/* Best Sellers */}
          <button
            onClick={() => {
              setStorefrontCategory("Best Sellers");
              setStorefrontSubcategory(null);
              setStorefrontSport(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              storefrontCategory === "Best Sellers"
                ? "bg-rose-600 text-white shadow-md"
                : "bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>{lang === "fr" ? "Best Sellers" : "Best Sellers"}</span>
          </button>

          {/* Search Indicator Clear Pill */}
          {storefrontSearch && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <span>{lang === "fr" ? `Recherche : "${storefrontSearch}"` : `Search: "${storefrontSearch}"`}</span>
              <button
                onClick={() => setStorefrontSearch("")}
                className="w-4 h-4 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center text-[10px]"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Secondary Subcategory Pills for "Nos Tableaux" */}
        {storefrontCategory === "Nos Tableaux" && (
          <div className="pb-6 flex flex-wrap items-center gap-2 border-b border-stone-100 animate-fadeIn">
            <span className="text-xs font-bold text-stone-400 mr-2">
              {lang === "fr" ? "Univers :" : "Theme :"}
            </span>
            {subcategoriesList.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setStorefrontSubcategory(sub);
                  setStorefrontSport(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  storefrontSubcategory === sub
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Nested Sports Pills when Sports is selected */}
        {storefrontCategory === "Nos Tableaux" && storefrontSubcategory === "Sports" && (
          <div className="pt-3 pb-6 flex flex-wrap items-center gap-2 animate-fadeIn">
            <span className="text-xs font-bold text-amber-600 mr-2">
              {lang === "fr" ? "Discipline Sportive :" : "Sport Discipline :"}
            </span>
            <button
              onClick={() => setStorefrontSport(null)}
              className={`px-3 py-1 rounded-md text-xs font-bold ${
                !storefrontSport ? "bg-amber-500 text-stone-900" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {lang === "fr" ? "Tous les Sports" : "All Sports"}
            </button>
            {sportsList.map((sp) => (
              <button
                key={sp}
                onClick={() => setStorefrontSport(sp)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  storefrontSport === sp
                    ? "bg-amber-500 text-stone-900 font-black shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-800">
              {lang === "fr" ? "Aucun tableau ne correspond à votre filtre" : "No wall art matched your filter"}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {lang === "fr" ? "Essayez de changer de catégorie ou de réinitialiser la recherche." : "Try changing the category or clearing the search."}
            </p>
            <button
              onClick={() => {
                setStorefrontCategory("Tous");
                setStorefrontSubcategory(null);
                setStorefrontSport(null);
                setStorefrontSearch("");
              }}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
            >
              {lang === "fr" ? "Afficher tous les tableaux" : "Show all products"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
            {sortedProducts.map((prod) => {
              const currentHoverFinish = activeFinishHover[prod.id] || "Avec Cadre";
              const isPack = prod.category === "Packs" || prod.subcategory === "Pack en 3" || prod.title?.toLowerCase().includes("pack");
              const isBestSeller = prod.salesCount && prod.salesCount >= 80;

              // Image for hover preview
              const displayedImage = currentHoverFinish === "Avec Cadre"
                ? (prod.imagesFramed?.[0] || prod.images?.[0])
                : (prod.imagesPanel?.[0] || prod.images?.[0]);

              // Starting price (Panel A4 or Framed A4)
              const startingPrice = prod.pricingMatrixPanel?.A4 || prod.pricingMatrixFramed?.A4 || prod.basePrice || 35;

              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProductForPdp(prod)}
                  className="group bg-white rounded-2xl border border-stone-200/90 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                    <img
                      src={displayedImage}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {isPack && (
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-amber-500 text-stone-950 shadow-md">
                          PACK EN 3
                        </span>
                      )}
                      {isBestSeller && (
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-rose-600 text-white shadow-md flex items-center gap-1">
                          <Flame className="w-3 h-3" /> BEST SELLER
                        </span>
                      )}
                    </div>

                    {/* Quick Finish Toggle Pill on image */}
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-3 left-3 right-3 bg-stone-900/80 backdrop-blur-md p-1 rounded-xl flex items-center justify-between text-[10px] font-bold text-white z-10 opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        onClick={() => setActiveFinishHover((prev) => ({ ...prev, [prod.id]: "Avec Cadre" }))}
                        className={`flex-1 py-1 rounded-lg text-center transition-all ${
                          currentHoverFinish === "Avec Cadre" ? "bg-amber-500 text-stone-950 font-black" : "text-stone-300 hover:text-white"
                        }`}
                      >
                        {lang === "fr" ? "Avec Cadre" : "Framed"}
                      </button>
                      <button
                        onClick={() => setActiveFinishHover((prev) => ({ ...prev, [prod.id]: "Panneau Simple" }))}
                        className={`flex-1 py-1 rounded-lg text-center transition-all ${
                          currentHoverFinish === "Panneau Simple" ? "bg-amber-500 text-stone-950 font-black" : "text-stone-300 hover:text-white"
                        }`}
                      >
                        {lang === "fr" ? "Panneau Simple" : "Panel"}
                      </button>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 font-semibold mb-1">
                        <span>{prod.subcategory || prod.category || "Tableau"}</span>
                        {prod.nestedSport && <span className="text-amber-600 font-bold">• {prod.nestedSport}</span>}
                      </div>

                      <h3 className="text-sm font-extrabold text-stone-900 line-clamp-2 group-hover:text-amber-700 transition-colors leading-snug">
                        {prod.title}
                      </h3>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                          {lang === "fr" ? "Prix dès" : "Starts at"}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-black text-stone-900">{startingPrice}</span>
                          <span className="text-xs font-bold text-amber-700">DNT</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => handleQuickExpressBuy(e, prod)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-extrabold shadow-sm transition-all flex items-center gap-1"
                          title={lang === "fr" ? "Commander Express" : "Instant Buy"}
                        >
                          <Zap className="w-3 h-3 fill-current" />
                          <span className="hidden sm:inline">{lang === "fr" ? "Express" : "Buy"}</span>
                        </button>
                        <button
                          onClick={() => setSelectedProductForPdp(prod)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          title={lang === "fr" ? "Personnaliser" : "Customize"}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
