import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Sparkles, Layers, ArrowRight, ShieldCheck, Truck, Award, Palette, CheckCircle2 } from "lucide-react";

export const StorefrontHero = () => {
  const { lang, cmsConfig, setStorefrontCategory, setStorefrontSubcategory, setIsCustomStudioOpen } = useApp();
  const [activePreviewFinish, setActivePreviewFinish] = useState("Avec Cadre");

  const headline = cmsConfig?.headline || (lang === "fr" ? "L'Art Mural d'Exception Pour Votre Intérieur" : "Exquisite Wall Art For Modern Spaces");
  const subheadline = cmsConfig?.subheadline || (lang === "fr" 
    ? "Tableaux décoratifs haute définition, triptyques packs en 3 et créations personnalisées sur mesure. Finitions haut de gamme Avec Cadre ou Panneau Simple épuré." 
    : "High-definition decorative wall art, 3-panel bundles, and custom creations. Choose between framed luxury or sleek unframed panels.");

  const handleExplore = () => {
    setStorefrontCategory("Tous");
    setStorefrontSubcategory(null);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePacks = () => {
    setStorefrontCategory("Packs");
    setStorefrontSubcategory("Pack en 3");
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{lang === "fr" ? "Nouvelle Collection 2026 — Finitions Doubles" : "New 2026 Collection — Dual Finish"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight font-['Outfit',sans-serif] leading-[1.15]">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="px-6 py-3.5 rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                <span>{lang === "fr" ? "Découvrir la Galerie" : "Explore Gallery"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handlePacks}
                className="px-6 py-3.5 rounded-xl bg-white text-stone-800 font-bold text-sm border border-stone-300 hover:border-amber-500 hover:text-amber-700 transition-all shadow-sm flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>{lang === "fr" ? "Packs en 3 Triptyques (-25%)" : "3-Piece Packs (-25%)"}</span>
              </button>

              <button
                onClick={() => setIsCustomStudioOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-amber-50 text-amber-900 font-bold text-sm border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-amber-700" />
                <span>{lang === "fr" ? "Tableau Personnalisé" : "Custom Studio"}</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg font-black text-stone-900">100%</span>
                <span className="text-xs text-stone-500">{lang === "fr" ? "Châssis Bois Noble" : "Solid Wood Frames"}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg font-black text-stone-900">24-48h</span>
                <span className="text-xs text-stone-500">{lang === "fr" ? "Livraison Tunisie" : "Fast Delivery"}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg font-black text-stone-900">A4 → A0</span>
                <span className="text-xs text-stone-500">{lang === "fr" ? "5 Formats au Choix" : "5 Standard Sizes"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dual Finish Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Finish Switcher Floating Pill */}
              <div className="flex items-center justify-center gap-2 mb-4 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200 shadow-md">
                <button
                  onClick={() => setActivePreviewFinish("Avec Cadre")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                    activePreviewFinish === "Avec Cadre"
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === "fr" ? "Finition Avec Cadre" : "Framed Edition"}</span>
                </button>

                <button
                  onClick={() => setActivePreviewFinish("Panneau Simple")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                    activePreviewFinish === "Panneau Simple"
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === "fr" ? "Panneau Simple" : "Sleek Panel"}</span>
                </button>
              </div>

              {/* Showcase Frame with Shadow */}
              <div className="bg-stone-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-stone-800 text-white relative group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-950 flex items-center justify-center border-4 border-stone-800 shadow-inner">
                  
                  {activePreviewFinish === "Avec Cadre" ? (
                    <div className="relative w-full h-full p-4 flex items-center justify-center bg-stone-900/60">
                      {/* Simulated Luxury Wood Frame */}
                      <div className="relative w-full h-full border-[10px] border-[#1a1815] rounded-lg shadow-2xl overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
                          alt="Framed Wall Art Showcase"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full p-6 flex items-center justify-center bg-stone-950">
                      {/* Simulated Frameless Flush Panel */}
                      <div className="relative w-full h-full rounded shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden border border-stone-700">
                        <img
                          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80"
                          alt="Sleek Unframed Panel Showcase"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/5 pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {/* Dynamic Badge */}
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-stone-700 text-amber-300 text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activePreviewFinish}</span>
                  </div>

                  <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black shadow-lg">
                    {lang === "fr" ? "Dès 35 DNT" : "From 35 DNT"}
                  </div>
                </div>

                {/* Footer caption */}
                <div className="mt-4 flex items-center justify-between text-xs text-stone-400 px-1">
                  <span>{lang === "fr" ? "Verre acrylique incassable & impression HD" : "High-resolution print & premium coating"}</span>
                  <span className="font-semibold text-amber-400">Qualité Musée</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
