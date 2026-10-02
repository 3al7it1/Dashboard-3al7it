import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  LayoutTemplate, 
  Video, 
  Sliders, 
  Sparkles, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Eye, 
  Check, 
  Plus, 
  Trash2,
  Megaphone,
  Layers,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export const CmsTab = () => {
  const { lang, cmsConfig, updateCmsConfig, addToast } = useApp();

  const [heroMode, setHeroMode] = useState(cmsConfig.heroMode || "video");
  const [videoUrl, setVideoUrl] = useState(cmsConfig.videoUrl || "");
  const [carouselImages, setCarouselImages] = useState(cmsConfig.carouselImages || []);
  const [newCarouselInput, setNewCarouselInput] = useState("");

  const [headline, setHeadline] = useState(cmsConfig.headline || "");
  const [subtitle, setSubtitle] = useState(cmsConfig.subtitle || "");
  const [ctaText, setCtaText] = useState(cmsConfig.ctaText || "");
  const [ctaTargetUrl, setCtaTargetUrl] = useState(cmsConfig.ctaTargetUrl || "");
  const [badgeText, setBadgeText] = useState(cmsConfig.badgeText || "");

  const [announcementText, setAnnouncementText] = useState(cmsConfig.announcementText || "");
  const [announcementActive, setAnnouncementActive] = useState(cmsConfig.announcementActive !== false);

  const [activePreviewSlide, setActivePreviewSlide] = useState(0);

  const handleAddCarouselImage = () => {
    if (!newCarouselInput.trim()) return;
    setCarouselImages((prev) => [...prev, newCarouselInput.trim()]);
    setNewCarouselInput("");
  };

  const handleRemoveCarouselImage = (index) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveCmsSettings = () => {
    updateCmsConfig({
      heroMode,
      videoUrl,
      carouselImages,
      headline,
      subtitle,
      ctaText,
      ctaTargetUrl,
      badgeText,
      announcementText,
      announcementActive
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {lang === "fr" ? "Configurateur CMS & Hero Bannières" : "CMS & Hero Banner Configurator"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              STOREFRONT LIVE PREVIEW
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === "fr"
              ? "Basculez entre vidéo MP4 en boucle et slider carrousel, et personnalisez les textes de vente."
              : "Toggle video background vs multi-image slider, update overlays and announcement bar."}
          </p>
        </div>

        <button
          onClick={handleSaveCmsSettings}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>{lang === "fr" ? "Enregistrer les Changements CMS" : "Save CMS Settings"}</span>
        </button>
      </div>

      {/* EXPLICIT ASSET GUIDANCE OVERLAY BADGE */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-amber-300 uppercase tracking-wider">
              ASSET GUIDANCE & SPÉCIFICATIONS RECOMMANDÉES :
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Pour un affichage rétina fluide sans ralentissement du storefront :
            </p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-xs font-mono text-amber-300 font-bold whitespace-nowrap">
          Hero Banner: 1920 x 1080px (Aspect Ratio 16:9)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: CMS Config Forms */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Top Announcement Bar Config */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-purple-400" />
                {lang === "fr" ? "Barre d'Annonce Supérieure" : "Top Announcement Bar"}
              </h3>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
                <span>Actif</span>
              </label>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-300">Message de la Bannière Haute</label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="ex: ✨ Livraison offerte sur toute la Tunisie..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          {/* Hero Mode Selector: Video vs Slider */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                {lang === "fr" ? "Configuration du Mode Hero Storefront" : "Hero Mode Selector"}
              </h3>
              <p className="text-xs text-slate-400">
                Choisissez entre une boucle vidéo immersive ou un carrousel d'images slider.
              </p>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHeroMode("video")}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                  heroMode === "video"
                    ? "bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Video className="w-5 h-5 text-amber-400" />
                <span>1. Vidéo MP4 en Boucle</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroMode("carousel")}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                  heroMode === "carousel"
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-5 h-5 text-cyan-400" />
                <span>2. Carrousel Slider Multi-Images</span>
              </button>
            </div>

            {/* Video Input Mode */}
            {heroMode === "video" && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <label className="font-semibold text-amber-300 flex items-center gap-2">
                  <span>URL du fichier Vidéo (Format MP4 HD)</span>
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://.../video.mp4"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>
            )}

            {/* Carousel Images Manager Mode */}
            {heroMode === "carousel" && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <label className="font-semibold text-cyan-300 block">
                  Images du Carrousel (Ratio 16:9 - 1920x1080)
                </label>
                
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newCarouselInput}
                    onChange={(e) => setNewCarouselInput(e.target.value)}
                    placeholder="https://.../hero-slide.jpg"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddCarouselImage}
                    className="px-3 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                  >
                    + Ajouter Slide
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  {carouselImages.map((img, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="flex items-center gap-2 truncate">
                        <img src={img} className="w-10 h-6 object-cover rounded border border-slate-700" alt="" />
                        <span className="font-mono text-[10px] text-slate-300 truncate">{img}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCarouselImage(idx)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Text Overlays & CTA targets */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                {lang === "fr" ? "Superpositions Textes & Boutons CTA" : "Text Overlays & CTA Config"}
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Badge Supérieur (Tag Promo)</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="ex: NOUVELLE COLLECTION 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Titre Principal H1 (Headline)</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="ex: L'Élégance des Tableaux & Panneaux..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Sous-titre (Subtitle)</label>
              <textarea
                rows="2"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="ex: Collection exclusive faite à la main en Tunisie..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Intitulé du Bouton (CTA)</label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="ex: Découvrir le Catalog"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Cible du Lien (Target URL)</label>
                <input
                  type="text"
                  value={ctaTargetUrl}
                  onChange={(e) => setCtaTargetUrl(e.target.value)}
                  placeholder="ex: /catalog"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: LIVE STOREFRONT HERO PREVIEW CARD */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              {lang === "fr" ? "Aperçu Storefront en Temps Réel" : "Storefront Live Preview"}
            </h3>
            <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Client Rendering: 16:9 Aspect
            </span>
          </div>

          {/* Interactive Hero Box Card */}
          <div className="rounded-3xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-2xl relative group">
            
            {/* Announcement Top Bar preview */}
            {announcementActive && (
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 text-[11px] font-extrabold py-1.5 px-4 text-center truncate">
                {announcementText || "✨ Offre Spéciale Tableaux Décoratifs"}
              </div>
            )}

            {/* Hero Main Media Area (16:9 Ratio) */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900 flex items-center justify-center">
              
              {/* VIDEO MODE MEDIA */}
              {heroMode === "video" && (
                <video
                  src={videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-modern-art-gallery-exhibition-41562-large.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}

              {/* CAROUSEL MODE MEDIA */}
              {heroMode === "carousel" && carouselImages.length > 0 && (
                <img
                  src={carouselImages[activePreviewSlide % carouselImages.length]}
                  alt="Hero slide"
                  className="w-full h-full object-cover transition-all duration-700"
                />
              )}

              {/* Dark Luxury Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/50 to-transparent" />

              {/* Text Overlays Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-left space-y-3 z-10">
                
                {badgeText && (
                  <div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                      {badgeText}
                    </span>
                  </div>
                )}

                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight max-w-lg font-['Outfit',sans-serif]">
                  {headline || "Titre de la Bannière Storefront"}
                </h2>

                <p className="text-xs text-slate-300 max-w-md line-clamp-2">
                  {subtitle || "Sous-titre descriptif de la collection..."}
                </p>

                <div className="pt-2">
                  <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30">
                    <span>{ctaText || "Découvrir"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Carousel Slide Switcher Controls */}
              {heroMode === "carousel" && carouselImages.length > 1 && (
                <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePreviewSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activePreviewSlide === i ? "w-6 bg-amber-400" : "bg-slate-500"
                      }`}
                    />
                  ))}
                </div>
              )}

            </div>

            {/* Storefront Footer Bar preview */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Rendu visuel exact sur www.tableauxdecoratifs.tn</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                ● Status: Synchro React State
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
