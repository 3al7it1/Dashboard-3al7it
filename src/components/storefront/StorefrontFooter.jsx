import React from "react";
import { useApp } from "../../context/AppContext";
import { 
  Truck, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  Layers,
  Sparkles
} from "lucide-react";

export const StorefrontFooter = () => {
  const { lang, setStorefrontCategory, setStorefrontSubcategory, setIsCustomStudioOpen } = useApp();

  const handleNavCategory = (cat, sub = null) => {
    setStorefrontCategory(cat);
    setStorefrontSubcategory(sub);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Top Value Propositions */}
      <div className="border-b border-stone-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">
                  {lang === "fr" ? "Livraison Partout en Tunisie" : "Nationwide Delivery"}
                </h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {lang === "fr" 
                    ? "Expédition rapide 24 à 48 heures dans les 24 gouvernorats avec suivi SMS et WhatsApp." 
                    : "Fast 24-48h delivery to all 24 governorates with real-time updates."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">
                  {lang === "fr" ? "Paiement à la Livraison (COD)" : "Cash on Delivery"}
                </h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {lang === "fr" 
                    ? "Réglez en espèces directement auprès du livreur après vérification complète de votre colis." 
                    : "Pay safely in cash upon arrival after verifying your package integrity."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">
                  {lang === "fr" ? "Finitions Haut de Gamme" : "Premium Art Finishes"}
                </h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {lang === "fr" 
                    ? "Choix exclusif entre Châssis Bois noble (Avec Cadre) ou Panneau épuré sans bordure." 
                    : "Exclusive choice between luxury solid wood frames or flush minimalist panels."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white p-1 flex items-center justify-center">
                <img src="/assets/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
              </div>
              <span className="font-extrabold text-xl text-white font-['Outfit',sans-serif]">
                Tableaux Décoratifs
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {lang === "fr"
                ? "Atelier d'art mural et d'impression fine en Tunisie. Nous transformons vos espaces de vie et bureaux avec des tableaux d'exception, triptyques packs en 3 et impressions personnalisées."
                : "Artisan wall decor studio based in Tunisia. Elevate your living and work spaces with framed prints, 3-panel bundles, and bespoke creations."}
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-900 hover:bg-amber-600 hover:text-white flex items-center justify-center transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-900 hover:bg-amber-600 hover:text-white flex items-center justify-center transition-colors" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-white">
              {lang === "fr" ? "Univers Décoratifs" : "Collections"}
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNavCategory("Nos Tableaux", "Music")} className="hover:text-amber-400 transition-colors">
                  Music & Hip-Hop
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Nos Tableaux", "Films & Séries")} className="hover:text-amber-400 transition-colors">
                  Films & Séries Cultes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Nos Tableaux", "Automobile")} className="hover:text-amber-400 transition-colors">
                  Automobile Supercars
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Nos Tableaux", "Art & Design")} className="hover:text-amber-400 transition-colors">
                  Art Abstrait & Design
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Nos Tableaux", "Motivation")} className="hover:text-amber-400 transition-colors">
                  Motivation & Mindset
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Nos Tableaux", "Sports")} className="hover:text-amber-400 transition-colors">
                  Sports (Football, Basket, MMA)
                </button>
              </li>
            </ul>
          </div>

          {/* Formats & Packs */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-white">
              {lang === "fr" ? "Nos Offres" : "Offers"}
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNavCategory("Packs", "Pack en 3")} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-bold text-amber-300">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Packs en 3 Triptyques (-25%)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setIsCustomStudioOpen(true)} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-bold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tableau Personnalisé HD</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Best Sellers")} className="hover:text-amber-400 transition-colors">
                  Meilleures Ventes (Best Sellers)
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Tous")} className="hover:text-amber-400 transition-colors">
                  Finition Avec Cadre Bois
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory("Tous")} className="hover:text-amber-400 transition-colors">
                  Finition Panneau Simple
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-white">
              {lang === "fr" ? "Service Client" : "Customer Support"}
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Tunis, Tunisie (Livraison 24 Gov)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+216 50 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>contact@tableauxdecoratifs.tn</span>
              </li>
              <li className="pt-2 text-[11px] text-stone-500">
                Horaires : Lundi - Samedi (9h - 19h)
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar — No admin link */}
      <div className="border-t border-stone-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Tableaux Décoratifs. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            <span>Créé avec passion en Tunisie</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
