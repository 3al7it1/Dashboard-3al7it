import React, { useState, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { 
  X, 
  Upload, 
  Sparkles, 
  Ruler, 
  Palette, 
  Zap, 
  ShoppingBag, 
  CheckCircle2, 
  Image as ImageIcon,
  Layers,
  Eye,
  Sliders,
  ShieldCheck
} from "lucide-react";

export const CustomStudioModal = () => {
  const { 
    lang, 
    isCustomStudioOpen, 
    setIsCustomStudioOpen, 
    addToCart, 
    setExpressCheckoutItem, 
    setIsExpressOrderModalOpen 
  } = useApp();

  const [uploadedImage, setUploadedImage] = useState(
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80"
  );
  const [selectedFinish, setSelectedFinish] = useState("Avec Cadre");
  const [selectedDimension, setSelectedDimension] = useState("A2");
  const [frameColor, setFrameColor] = useState("black"); // black, oak, gold
  const [wallColor, setWallColor] = useState("#EAE7E1"); // cream, charcoal, deep navy, sage
  const [quantity, setQuantity] = useState(1);
  const fileInputRef = useRef(null);

  if (!isCustomStudioOpen) return null;

  const customPricingMatrixFramed = { A4: 55, A3: 85, A2: 125, A1: 185, A0: 275 };
  const customPricingMatrixPanel  = { A4: 40, A3: 65, A2: 95, A1: 145, A0: 215 };

  const activeMatrix = selectedFinish === "Avec Cadre" ? customPricingMatrixFramed : customPricingMatrixPanel;
  const unitPrice = activeMatrix[selectedDimension] || 125;
  const totalPrice = unitPrice * quantity;

  // Visualizer scale mapping
  const scaleByDimension = {
    A4: "w-28 sm:w-36 aspect-[3/4]",
    A3: "w-36 sm:w-48 aspect-[3/4]",
    A2: "w-44 sm:w-60 aspect-[3/4]",
    A1: "w-52 sm:w-72 aspect-[3/4]",
    A0: "w-64 sm:w-88 aspect-[3/4]"
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    const customProduct = {
      id: `CUSTOM-${Date.now()}`,
      title: `Tableau Personnalisé sur Mesure (${selectedFinish} • ${selectedDimension})`,
      category: "Personnalisé",
      subcategory: "Photo sur Mesure",
      basePrice: unitPrice,
      imagesFramed: [uploadedImage],
      imagesPanel: [uploadedImage]
    };
    addToCart(customProduct, selectedFinish, selectedDimension, quantity, uploadedImage);
    setIsCustomStudioOpen(false);
  };

  const handleDirectCheckout = () => {
    setExpressCheckoutItem({
      productId: `CUSTOM-${Date.now()}`,
      title: `Tableau Personnalisé sur Mesure (${selectedFinish} • ${selectedDimension})`,
      finish: selectedFinish,
      dimension: selectedDimension,
      unitPrice,
      quantity,
      image: uploadedImage,
      customImage: uploadedImage
    });
    setIsCustomStudioOpen(false);
    setIsExpressOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-stone-200 overflow-hidden relative max-h-[94vh] flex flex-col my-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-stone-900 font-['Outfit',sans-serif]">
                {lang === "fr" ? "Studio de Création & Visualiseur Mural Live" : "Custom Art Studio & Live Wall Visualizer"}
              </h3>
              <p className="text-xs text-stone-500">
                {lang === "fr" 
                  ? "Importez votre photo HD, visualisez-la instantanément dans votre salon et configurez sa finition." 
                  : "Upload your HD artwork and preview it live on a realistic wall."}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomStudioOpen(false)}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Workspace */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left: Interactive Room Wall Visualizer */}
            <div className="lg:col-span-7 space-y-4">
              <div 
                className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-stone-300 shadow-xl flex items-center justify-center p-6 transition-colors duration-500 select-none"
                style={{ backgroundColor: wallColor }}
              >
                {/* Room Floor / Sofa graphic backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-stone-900/15 border-t border-black/5" />
                
                {/* Wall Sofa Silhouette Mockup */}
                <div className="absolute bottom-4 w-4/5 h-20 bg-stone-800/85 rounded-t-2xl shadow-2xl border-t border-stone-700/60 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-widest">
                    Canapé de référence (2.10m)
                  </span>
                </div>

                {/* Mounted Custom Artwork */}
                <div 
                  className={`relative transition-all duration-300 z-10 -translate-y-8 ${scaleByDimension[selectedDimension] || "w-44 aspect-[3/4]"}`}
                >
                  {selectedFinish === "Avec Cadre" ? (
                    <div 
                      className={`w-full h-full p-2.5 rounded shadow-[0_25px_50px_rgba(0,0,0,0.6)] flex items-center justify-center ${
                        frameColor === "black" ? "bg-[#141414] border-[7px] border-black" :
                        frameColor === "oak" ? "bg-[#8D5B3A] border-[7px] border-[#684126]" :
                        "bg-[#C5A059] border-[7px] border-[#9E7B36]"
                      }`}
                    >
                      <div className="w-full h-full overflow-hidden bg-white shadow-inner">
                        <img
                          src={uploadedImage}
                          alt="Custom Art Visualizer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded shadow-[0_20px_45px_rgba(0,0,0,0.5)] overflow-hidden border border-black/20">
                      <img
                        src={uploadedImage}
                        alt="Custom Art Visualizer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Format tag badge */}
                  <div className="absolute -bottom-6 inset-x-0 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-md text-[10px] font-black text-amber-300 shadow">
                      {selectedDimension} • {selectedFinish}
                    </span>
                  </div>
                </div>

                {/* Live Wall Color Switcher floating bar */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200 shadow-md flex items-center gap-1.5 z-20">
                  <span className="text-[10px] font-bold text-stone-600 px-1">Mur :</span>
                  {[
                    { color: "#EAE7E1", name: "Crème" },
                    { color: "#32353A", name: "Anthracite" },
                    { color: "#1E2A3A", name: "Bleu Nuit" },
                    { color: "#8E9A8E", name: "Sauge" }
                  ].map((w) => (
                    <button
                      key={w.color}
                      onClick={() => setWallColor(w.color)}
                      style={{ backgroundColor: w.color }}
                      className={`w-5 h-5 rounded-full border transition-transform ${
                        wallColor === w.color ? "scale-125 border-stone-900 shadow-sm" : "border-stone-300"
                      }`}
                      title={w.name}
                    />
                  ))}
                </div>
              </div>

              {/* Upload trigger bar */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={uploadedImage}
                    alt="Thumbnail"
                    className="w-12 h-14 rounded-lg object-cover bg-stone-200 border border-stone-300 shrink-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      {lang === "fr" ? "Image Haute Définition Active" : "Active High-Res Asset"}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {lang === "fr" ? "Formats acceptés : JPG, PNG, WEBP jusqu'à 50 Mo" : "JPG, PNG, WEBP up to 50MB"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === "fr" ? "Changer l'image" : "Upload Image"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Studio Controls (Finish, Dimension, Frame Colors, Price, Submit) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 1. Finition */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-600" />
                  <span>{lang === "fr" ? "1. Finition Souhaitée" : "1. Choose Finish"}</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedFinish("Avec Cadre")}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedFinish === "Avec Cadre"
                        ? "border-amber-500 bg-amber-50/50 shadow-sm"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <span className="text-xs font-black text-stone-900 block">
                      {lang === "fr" ? "Avec Cadre" : "Framed Print"}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5 block">
                      Châssis noble & vitre de protection
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedFinish("Panneau Simple")}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedFinish === "Panneau Simple"
                        ? "border-amber-500 bg-amber-50/50 shadow-sm"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <span className="text-xs font-black text-stone-900 block">
                      {lang === "fr" ? "Panneau Simple" : "Sleek Panel"}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5 block">
                      Support rigide épuré sans bordure
                    </span>
                  </div>
                </div>

                {/* Frame Color when Avec Cadre is selected */}
                {selectedFinish === "Avec Cadre" && (
                  <div className="pt-1 flex items-center gap-3">
                    <span className="text-[11px] font-bold text-stone-500">
                      {lang === "fr" ? "Couleur du cadre :" : "Frame color :"}
                    </span>
                    {[
                      { id: "black", label: "Noir Mat", bg: "bg-black" },
                      { id: "oak", label: "Chêne Naturel", bg: "bg-[#8D5B3A]" },
                      { id: "gold", label: "Or Royal", bg: "bg-[#C5A059]" }
                    ].map((fc) => (
                      <button
                        key={fc.id}
                        onClick={() => setFrameColor(fc.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1.5 ${
                          frameColor === fc.id
                            ? "border-stone-900 bg-stone-100 text-stone-900 shadow-sm"
                            : "border-stone-200 text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${fc.bg}`} />
                        <span>{fc.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Format & Dimension */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-amber-600" />
                  <span>{lang === "fr" ? "2. Format sur Mesure" : "2. Choose Dimensions"}</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {["A4", "A3", "A2", "A1", "A0"].map((dim) => {
                    const price = activeMatrix[dim] || 125;
                    const isSelected = selectedDimension === dim;
                    return (
                      <button
                        key={dim}
                        onClick={() => setSelectedDimension(dim)}
                        className={`p-2 rounded-xl border-2 text-center transition-all ${
                          isSelected
                            ? "border-amber-500 bg-stone-900 text-white shadow-md scale-105"
                            : "border-stone-200 bg-white hover:border-stone-300 text-stone-700"
                        }`}
                      >
                        <span className={`text-xs font-black block ${isSelected ? "text-amber-400" : "text-stone-900"}`}>
                          {dim}
                        </span>
                        <span className={`text-[10px] font-bold mt-0.5 block ${isSelected ? "text-white" : "text-stone-500"}`}>
                          {price} DT
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase block">
                    {lang === "fr" ? "Prix Personnalisé" : "Custom Art Total"}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-stone-900 font-['Outfit',sans-serif]">
                      {totalPrice}
                    </span>
                    <span className="text-sm font-black text-amber-700">DNT</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-xl border border-stone-300 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-black text-stone-800 text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-black text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-black text-stone-800 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dual Conversion CTA */}
              <div className="space-y-2.5">
                <button
                  onClick={handleDirectCheckout}
                  className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>
                    {lang === "fr" ? "Commander Directement ce Tableau" : "Instant Custom Checkout"}
                  </span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === "fr" ? "Ajouter au Panier" : "Add to Cart"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>{lang === "fr" ? "Vérification manuelle de la résolution avant impression" : "Manual resolution check prior to print"}</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
