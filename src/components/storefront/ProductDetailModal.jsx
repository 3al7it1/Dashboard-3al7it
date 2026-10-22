import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { 
  X, 
  ShoppingBag, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  Palette, 
  Layers, 
  ChevronRight,
  Maximize2
} from "lucide-react";

export const ProductDetailModal = () => {
  const { 
    lang, 
    selectedProductForPdp, 
    setSelectedProductForPdp, 
    addToCart, 
    setExpressCheckoutItem, 
    setIsExpressOrderModalOpen 
  } = useApp();

  const [selectedFinish, setSelectedFinish] = useState("Avec Cadre");
  const [selectedDimension, setSelectedDimension] = useState("A3");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Reset state when product changes
  useEffect(() => {
    if (selectedProductForPdp) {
      setSelectedFinish("Avec Cadre");
      setSelectedDimension("A3");
      setQuantity(1);
      setSelectedImageIndex(0);
    }
  }, [selectedProductForPdp]);

  if (!selectedProductForPdp) return null;

  const prod = selectedProductForPdp;

  // Resolve pricing matrix based on finish
  const pricingMatrix = selectedFinish === "Avec Cadre"
    ? (prod.pricingMatrixFramed || prod.pricingMatrix || { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 })
    : (prod.pricingMatrixPanel || { A4: 35, A3: 55, A2: 80, A1: 120, A0: 180 });

  const unitPrice = pricingMatrix[selectedDimension] || prod.basePrice || 75;
  const totalPrice = unitPrice * quantity;

  // Swap displayed gallery image in real-time between Framed mockup and Unframed panel render!
  const currentImagesList = selectedFinish === "Avec Cadre"
    ? (prod.imagesFramed && prod.imagesFramed.length > 0 ? prod.imagesFramed : prod.images || [])
    : (prod.imagesPanel && prod.imagesPanel.length > 0 ? prod.imagesPanel : prod.images || []);

  const activeMainImage = currentImagesList[selectedImageIndex] || currentImagesList[0] || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80";

  const dimensionLabels = {
    A4: { dim: "21 × 30 cm", desc: lang === "fr" ? "Idéal petit espace / bureau" : "Ideal for desk or small corner" },
    A3: { dim: "30 × 42 cm", desc: lang === "fr" ? "Format standard le plus populaire" : "Most popular standard format" },
    A2: { dim: "42 × 60 cm", desc: lang === "fr" ? "Présence murale élégante" : "Elegant wall statement" },
    A1: { dim: "60 × 84 cm", desc: lang === "fr" ? "Grand format salon ou chambre" : "Large format for living room" },
    A0: { dim: "84 × 120 cm", desc: lang === "fr" ? "Format géant monumental" : "Extra-large gallery centerpiece" }
  };

  const handleAddToCart = () => {
    addToCart(prod, selectedFinish, selectedDimension, quantity);
    setSelectedProductForPdp(null);
  };

  const handleDirectCheckout = () => {
    setExpressCheckoutItem({
      productId: prod.id,
      title: prod.title,
      finish: selectedFinish,
      dimension: selectedDimension,
      unitPrice,
      quantity,
      image: activeMainImage
    });
    setSelectedProductForPdp(null);
    setIsExpressOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-stone-200 overflow-hidden relative max-h-[92vh] flex flex-col my-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForPdp(null)}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Real-Time Dynamic Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-[3/4] bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 shadow-md group flex items-center justify-center">
                {selectedFinish === "Avec Cadre" ? (
                  <div className="w-full h-full p-4 flex items-center justify-center bg-stone-900/40">
                    <div className="relative w-full h-full border-[10px] border-[#181614] rounded shadow-2xl overflow-hidden">
                      <img
                        src={activeMainImage}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full p-6 flex items-center justify-center bg-stone-950">
                    <div className="relative w-full h-full rounded shadow-[0_15px_40px_rgba(0,0,0,0.7)] overflow-hidden border border-stone-700">
                      <img
                        src={activeMainImage}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>
                  </div>
                )}

                {/* Floating Selected Finish Label */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-stone-700 text-amber-300 text-xs font-bold shadow-lg flex items-center gap-1.5 pointer-events-none">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedFinish}</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {currentImagesList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {currentImagesList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx ? "border-amber-500 shadow-md scale-105" : "border-stone-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{lang === "fr" ? "Livraison 24-48h Tunisie" : "24-48h Nationwide Delivery"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{lang === "fr" ? "Paiement à la Réception" : "Cash on Delivery"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Unified Finish Selector, Dimension Matrix, & Triggers */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Category Breadcrumb & Title */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider">
                  <span>{prod.category}</span>
                  {prod.subcategory && <span>• {prod.subcategory}</span>}
                  {prod.nestedSport && <span>• {prod.nestedSport}</span>}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-['Outfit',sans-serif] leading-tight">
                  {prod.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* 1. FINISH SELECTOR (FINITION) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-amber-600" />
                    <span>{lang === "fr" ? "1. Choisissez la Finition" : "1. Select Finish"}</span>
                  </label>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {selectedFinish}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Option A: Avec Cadre */}
                  <div
                    onClick={() => {
                      setSelectedFinish("Avec Cadre");
                      setSelectedImageIndex(0);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedFinish === "Avec Cadre"
                        ? "border-amber-500 bg-amber-50/40 shadow-sm"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-black text-stone-900">
                        {lang === "fr" ? "Avec Cadre" : "Framed Print"}
                      </span>
                      {selectedFinish === "Avec Cadre" && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600 fill-amber-100" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {lang === "fr" 
                        ? "Châssis bois massif noble, verre acrylique haute protection et attaches murales."
                        : "Solid wood frame, anti-glare protective acrylic glass & wall brackets."}
                    </p>
                    <span className="text-[10px] font-extrabold text-amber-800 mt-2 block">
                      ★ {lang === "fr" ? "Recommandé Galerie" : "Gallery Standard"}
                    </span>
                  </div>

                  {/* Option B: Panneau Simple */}
                  <div
                    onClick={() => {
                      setSelectedFinish("Panneau Simple");
                      setSelectedImageIndex(0);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedFinish === "Panneau Simple"
                        ? "border-amber-500 bg-amber-50/40 shadow-sm"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-black text-stone-900">
                        {lang === "fr" ? "Panneau Simple" : "Sleek Panel"}
                      </span>
                      {selectedFinish === "Panneau Simple" && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600 fill-amber-100" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {lang === "fr" 
                        ? "Support rigide épuré sans bordure, impression directe haute définition satinée."
                        : "Border-free rigid panel with direct high-definition satin print."}
                    </p>
                    <span className="text-[10px] font-extrabold text-stone-700 mt-2 block">
                      ⚡ {lang === "fr" ? "Design Minimaliste" : "Minimalist Design"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. DIMENSION SELECTOR */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-amber-600" />
                    <span>{lang === "fr" ? "2. Format & Dimensions" : "2. Format & Size"}</span>
                  </label>
                  <span className="text-xs text-stone-500 font-semibold">
                    {dimensionLabels[selectedDimension]?.dim}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {["A4", "A3", "A2", "A1", "A0"].map((dim) => {
                    const priceForDim = pricingMatrix[dim] || 75;
                    const isSelected = selectedDimension === dim;
                    return (
                      <button
                        key={dim}
                        onClick={() => setSelectedDimension(dim)}
                        className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? "border-amber-500 bg-stone-900 text-white shadow-md scale-105"
                            : "border-stone-200 hover:border-stone-300 bg-white text-stone-700"
                        }`}
                      >
                        <span className={`text-xs font-black ${isSelected ? "text-amber-400" : "text-stone-900"}`}>
                          {dim}
                        </span>
                        <span className={`text-[11px] font-bold mt-0.5 ${isSelected ? "text-white" : "text-stone-500"}`}>
                          {priceForDim} DT
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-stone-400 italic">
                  💡 {dimensionLabels[selectedDimension]?.desc}
                </p>
              </div>

              {/* 3. QUANTITY & DYNAMIC TOTAL PRICE */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase block">
                    {lang === "fr" ? "Prix Réactif Total" : "Reactive Total Price"}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-stone-900 font-['Outfit',sans-serif]">
                      {totalPrice}
                    </span>
                    <span className="text-sm font-black text-amber-700">DNT (د.ت)</span>
                  </div>
                </div>

                {/* Quantity adjuster */}
                <div className="flex items-center gap-2 bg-white rounded-xl border border-stone-300 p-1 shadow-inner">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-black text-stone-800 text-sm transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-black text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-black text-stone-800 text-sm transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 4. DUAL CONVERSION TRIGGERS */}
              <div className="space-y-2.5 pt-2">
                {/* Instant 1-Click Buy */}
                <button
                  onClick={handleDirectCheckout}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>
                    {lang === "fr" 
                      ? "Commander Directement (Formulaire Express)" 
                      : "Instant Express Checkout"}
                  </span>
                </button>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === "fr" ? "Ajouter au Panier" : "Add to Cart"}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
