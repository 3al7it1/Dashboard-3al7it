import React, { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "../context/AppContext";
import {
  Layers,
  Search,
  PlusCircle,
  Edit,
  Trash2,
  UploadCloud,
  Video,
  Sparkles,
  Check,
  X,
  Image as ImageIcon,
  DollarSign,
  Link as LinkIcon,
  FileImage,
  AlertCircle,
  Eye,
  Package,
  Frame,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Tag,
  ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAIN_CATEGORIES = ["Nos Tableaux", "Packs (Pack en 3)", "Best Sellers"];

const SUBCATEGORIES_MAP = {
  "Nos Tableaux": ["Art & Design", "Motivation", "Music", "Films & Séries", "Automobile", "Sports"],
  "Best Sellers": ["Art & Design", "Motivation", "Music", "Films & Séries", "Automobile", "Sports"],
  "Packs (Pack en 3)": ["Pack en 3", "Gallerie Murale", "Duo Harmonieux"]
};

const SPORTS_SUBCATEGORIES = ["Football", "Basketball", "MMA", "Boxing", "Motorsport"];

const DEFAULT_CADRE_PRICES = { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 };
const DEFAULT_SIMPLE_PRICES = { A4: 35, A3: 55, A2: 85, A1: 130, A0: 190 };

const DEFAULT_FORM_STATE = {
  title: "",
  description: "",
  category: "Nos Tableaux",
  subcategory: "Art & Design",
  nestedSport: null,
  discipline: null,
  status: "Active",
  basePrice: 55,
  pricingMatrixCadre: { ...DEFAULT_CADRE_PRICES },
  pricingMatrixSimple: { ...DEFAULT_SIMPLE_PRICES },
  imagesCadre: [],
  imagesPanneau: [],
  images: [],
  videoUrl: "",
  stock: 25
};

// ──────────────────────────────────────────────────────────────────────
// DUAL ASSET UPLOADER COMPONENT (Framed renders vs Panneau simple renders)
// ──────────────────────────────────────────────────────────────────────
const AssetUploadSlot = ({
  title,
  subtitle,
  badgeText,
  images,
  onImagesChange,
  accentColor = "amber"
}) => {
  const [urlInput, setUrlInput] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlError, setUrlError] = useState("");
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const fileArr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!fileArr.length) return;
    fileArr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImagesChange([...images, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [images]);

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+/.test(trimmed)) {
      setUrlError("URL invalide. Doit commencer par http:// ou https://");
      return;
    }
    setUrlError("");
    onImagesChange([...images, trimmed]);
    setUrlInput("");
  };

  const handleRemove = (idx) => {
    onImagesChange(images.filter((_, i) => i !== idx));
  };

  const borderClass = accentColor === "amber"
    ? (isDragOver ? "border-amber-400 bg-amber-500/10" : "border-slate-800 hover:border-amber-500/40")
    : (isDragOver ? "border-cyan-400 bg-cyan-500/10" : "border-slate-800 hover:border-cyan-500/40");

  const badgeClass = accentColor === "amber"
    ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
    : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";

  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-xs text-white flex items-center gap-2">
            <ImageIcon className={`w-3.5 h-3.5 ${accentColor === "amber" ? "text-amber-400" : "text-cyan-400"}`} />
            <span>{title}</span>
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeClass}`}>
          {badgeText}
        </span>
      </div>

      {/* Drag & Drop Card */}
      <div
        className={`relative rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all bg-slate-950/70 ${borderClass}`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
          <UploadCloud className={`w-6 h-6 ${accentColor === "amber" ? "text-amber-400" : "text-cyan-400"}`} />
          <p className="text-xs font-semibold text-slate-300">
            Glisser vos rendus ici ou <span className={accentColor === "amber" ? "text-amber-400 font-bold" : "text-cyan-400 font-bold"}>parcourir</span>
          </p>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span>JPG, PNG, WEBP</span>
            <span>•</span>
            <span className="font-mono text-slate-400">1200 × 1600px (3:4 HD)</span>
          </div>
        </div>
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => { setUrlInput(e.target.value); setUrlError(""); }}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUrl())}
          placeholder="https://images.unsplash.com/photo-xxx.jpg"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-amber-500/50 font-mono placeholder-slate-600"
        />
        <button
          type="button"
          onClick={handleAddUrl}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all shrink-0 border border-slate-700"
        >
          + Ajouter
        </button>
      </div>
      {urlError && (
        <p className="text-[10px] text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {urlError}
        </p>
      )}

      {/* Preview thumbs strip */}
      {images.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 pt-1">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shadow"
            >
              <img src={img} alt={`Render ${idx + 1}`} className="w-full h-full object-cover" />
              {idx === 0 && (
                <span className="absolute bottom-0 inset-x-0 text-center text-[8px] bg-amber-500 font-extrabold text-slate-950 py-0.5">
                  PRINCIPALE
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 p-1 rounded-full bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[10px] text-slate-500 italic text-center py-1">
          Aucun visuel chargé dans cet emplacement.
        </p>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────
// DUAL PRICING MATRIX INPUTS COMPONENT (Avec Cadre vs Panneau Simple in DNT)
// ──────────────────────────────────────────────────────────────────────
const DualPricingInputs = ({ matrixCadre, matrixSimple, onChangeCadre, onChangeSimple }) => {
  const SIZES = ["A4", "A3", "A2", "A1", "A0"];
  const DIM_LABELS = {
    A4: "21×29.7 cm",
    A3: "30×42 cm",
    A2: "42×59.4 cm",
    A1: "59.4×84.1 cm",
    A0: "84.1×118.9 cm"
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <h4 className="font-bold text-xs uppercase tracking-wider text-white">
            Matrice Tarifaire Duale (Finitions & Formats en DNT)
          </h4>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          Devise : DNT (د.ت)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CARD 1: Prices Avec Cadre */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/5 to-slate-900/60 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Frame className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs text-amber-300">Finition "Avec Cadre"</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Encadrement Premium</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {SIZES.map((size) => (
              <div key={size} className="space-y-1 text-center">
                <span className="block text-[11px] font-mono font-bold text-amber-400">{size}</span>
                <span className="block text-[9px] text-slate-500 leading-tight">{DIM_LABELS[size]}</span>
                <div className="relative mt-1">
                  <input
                    type="number"
                    min="1"
                    value={matrixCadre[size] ?? ""}
                    onChange={(e) => onChangeCadre(size, Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/60 rounded-xl py-1.5 px-1 text-center font-mono font-extrabold text-xs text-white focus:outline-none"
                  />
                  <span className="block text-[8px] text-slate-500 mt-0.5">DNT</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: Prices Panneau Simple */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-slate-900/60 border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-xs text-cyan-300">Finition "Panneau Simple"</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Sans-Cadre Flottant</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {SIZES.map((size) => (
              <div key={size} className="space-y-1 text-center">
                <span className="block text-[11px] font-mono font-bold text-cyan-400">{size}</span>
                <span className="block text-[9px] text-slate-500 leading-tight">{DIM_LABELS[size]}</span>
                <div className="relative mt-1">
                  <input
                    type="number"
                    min="1"
                    value={matrixSimple[size] ?? ""}
                    onChange={(e) => onChangeSimple(size, Number(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/60 rounded-xl py-1.5 px-1 text-center font-mono font-extrabold text-xs text-white focus:outline-none"
                  />
                  <span className="block text-[8px] text-slate-500 mt-0.5">DNT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────
// PRODUCT DETAIL QUICK-VIEW MODAL
// ──────────────────────────────────────────────────────────────────────
const ProductDetailModal = ({ product, onClose, onEdit }) => {
  const [activeFinishTab, setActiveFinishTab] = useState("cadre");
  if (!product) return null;

  const framedImages = product.imagesCadre && product.imagesCadre.length > 0 ? product.imagesCadre : product.images || [];
  const simpleImages = product.imagesPanneau && product.imagesPanneau.length > 0 ? product.imagesPanneau : product.images || [];
  const displayImages = activeFinishTab === "cadre" ? framedImages : simpleImages;

  const minPrice = Math.min(
    ...(product.pricingMatrixSimple ? Object.values(product.pricingMatrixSimple) : [35]),
    ...(product.pricingMatrixCadre ? Object.values(product.pricingMatrixCadre) : [50])
  );
  const maxPrice = Math.max(
    ...(product.pricingMatrixCadre ? Object.values(product.pricingMatrixCadre) : [240]),
    ...(product.pricingMatrixSimple ? Object.values(product.pricingMatrixSimple) : [190])
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-[#0F172A] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="shrink-0 p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {product.id}
                </span>
                <span className="text-xs text-slate-400">{product.category} / {product.subcategory}</span>
                {product.nestedSport && (
                  <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded font-bold border border-cyan-500/20">
                    {product.nestedSport}
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-base text-white font-['Outfit',sans-serif] mt-0.5">
                {product.title}
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Dual Finish Switcher & Images */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Visuels & Rendus Rétina HD (1200x1600px)
              </span>
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveFinishTab("cadre")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeFinishTab === "cadre"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Avec Cadre ({framedImages.length})
                </button>
                <button
                  onClick={() => setActiveFinishTab("simple")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeFinishTab === "simple"
                      ? "bg-cyan-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Panneau Simple ({simpleImages.length})
                </button>
              </div>
            </div>

            {displayImages.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {displayImages.map((img, i) => (
                  <div key={i} className="shrink-0 w-36 h-48 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-lg">
                    <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-950 text-center text-xs text-slate-500">
                Aucun visuel enregistré pour cette finition.
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {product.description}
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px] mb-1">Fourchette de Prix</span>
              <span className="font-extrabold text-amber-400 font-mono text-sm">
                {minPrice} - {maxPrice} DNT
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px] mb-1">Statut Catalogue</span>
              <span className={`font-bold ${product.status === "Active" ? "text-emerald-400" : "text-slate-400"}`}>
                {product.status === "Active" ? "● En Vente (Actif)" : "○ Brouillon (Masqué)"}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px] mb-1">Stock Disponible</span>
              <span className="font-extrabold text-white font-mono text-sm">{product.stock ?? 25} unités</span>
            </div>
          </div>

          {/* Dual Pricing Matrix Table */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center justify-between">
              <span>Grille Tarifaire Complète (DNT)</span>
              <span className="text-[10px] text-slate-400 font-mono">5 Tailles Disponibles</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase">
                    <th className="py-2 text-left">Finition</th>
                    <th className="py-2 text-center font-mono">A4 (21×29.7)</th>
                    <th className="py-2 text-center font-mono">A3 (30×42)</th>
                    <th className="py-2 text-center font-mono">A2 (42×59.4)</th>
                    <th className="py-2 text-center font-mono">A1 (59.4×84.1)</th>
                    <th className="py-2 text-center font-mono">A0 (84.1×118.9)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-2.5 font-bold text-amber-300 flex items-center gap-1.5">
                      <Frame className="w-3.5 h-3.5 text-amber-400" /> Avec Cadre
                    </td>
                    {["A4", "A3", "A2", "A1", "A0"].map((sz) => (
                      <td key={sz} className="py-2.5 text-center font-bold text-white">
                        {product.pricingMatrixCadre?.[sz] ?? product.pricingMatrix?.[sz] ?? "-"} <span className="text-[9px] text-slate-500 font-normal">DNT</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-cyan-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" /> Panneau Simple
                    </td>
                    {["A4", "A3", "A2", "A1", "A0"].map((sz) => (
                      <td key={sz} className="py-2.5 text-center font-bold text-white">
                        {product.pricingMatrixSimple?.[sz] ?? "-"} <span className="text-[9px] text-slate-500 font-normal">DNT</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-2.5">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer">
            Fermer
          </button>
          <button
            onClick={() => { onClose(); onEdit(product); }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Edit className="w-3.5 h-3.5" /> Modifier ce Produit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────
// MAIN PRODUCTS TAB COMPONENT
// ──────────────────────────────────────────────────────────────────────
export const ProductsTab = ({ globalSearchQuery, isOpenModal, setIsOpenModal }) => {
  const { lang, products, addProduct, updateProduct, deleteProduct, toggleProductStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMainCat, setSelectedMainCat] = useState("All");
  const [selectedSubCat, setSelectedSubCat] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const activeSearch = globalSearchQuery || searchQuery;

  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);

  useEffect(() => {
    if (isOpenModal && !editingProduct) {
      setFormData(DEFAULT_FORM_STATE);
    }
  }, [isOpenModal, editingProduct]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData(DEFAULT_FORM_STATE);
    setIsOpenModal(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      category: product.category || "Nos Tableaux",
      subcategory: product.subcategory || "Art & Design",
      nestedSport: product.nestedSport || product.discipline || null,
      discipline: product.nestedSport || product.discipline || null,
      status: product.status || "Active",
      basePrice: product.basePrice || 55,
      pricingMatrixCadre: product.pricingMatrixCadre || product.pricingMatrix || { ...DEFAULT_CADRE_PRICES },
      pricingMatrixSimple: product.pricingMatrixSimple || { ...DEFAULT_SIMPLE_PRICES },
      imagesCadre: product.imagesCadre && product.imagesCadre.length > 0 ? [...product.imagesCadre] : (product.images || []),
      imagesPanneau: product.imagesPanneau && product.imagesPanneau.length > 0 ? [...product.imagesPanneau] : [],
      images: product.images && product.images.length > 0 ? [...product.images] : [],
      videoUrl: product.videoUrl || "",
      stock: product.stock ?? 25
    });
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setEditingProduct(null);
    setFormData(DEFAULT_FORM_STATE);
  };

  // Category Selector handlers
  const handleMainCategoryChange = (newCat) => {
    const validSubs = SUBCATEGORIES_MAP[newCat] || ["Art & Design"];
    const nextSub = validSubs.includes(formData.subcategory) ? formData.subcategory : validSubs[0];
    setFormData({
      ...formData,
      category: newCat,
      subcategory: nextSub,
      nestedSport: nextSub === "Sports" ? (formData.nestedSport || "Football") : null,
      discipline: nextSub === "Sports" ? (formData.nestedSport || "Football") : null
    });
  };

  const handleSubcategoryChange = (newSub) => {
    setFormData({
      ...formData,
      subcategory: newSub,
      nestedSport: newSub === "Sports" ? (formData.nestedSport || "Football") : null,
      discipline: newSub === "Sports" ? (formData.nestedSport || "Football") : null
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const title = formData.title.trim();
    if (!title) {
      alert(lang === "fr" ? "Veuillez indiquer le titre du produit." : "Please enter a product title.");
      return;
    }

    setIsSaving(true);
    try {
      // STRICT FIX: Preserve category and subcategory without overriding to Football
      const finalCategory = formData.category || "Nos Tableaux";
      const finalSubcategory = formData.subcategory || "Art & Design";
      const finalNestedSport = finalSubcategory === "Sports" ? (formData.nestedSport || "Football") : null;

      const mergedImages = [
        ...(formData.imagesCadre || []),
        ...(formData.imagesPanneau || [])
      ];

      const payload = {
        title,
        description: formData.description.trim(),
        category: finalCategory,
        subcategory: finalSubcategory,
        nestedSport: finalNestedSport,
        discipline: finalNestedSport,
        status: formData.status || "Active",
        basePrice: Number(formData.pricingMatrixCadre?.A3 || formData.pricingMatrixSimple?.A3 || 55),
        pricingMatrixCadre: formData.pricingMatrixCadre,
        pricingMatrixSimple: formData.pricingMatrixSimple,
        pricingMatrix: formData.pricingMatrixCadre,
        imagesCadre: formData.imagesCadre,
        imagesPanneau: formData.imagesPanneau,
        images: mergedImages.length > 0 ? mergedImages : (formData.images || []),
        videoUrl: formData.videoUrl.trim(),
        stock: Number(formData.stock) || 20
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await addProduct(payload);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Save product error:", err);
      alert("Erreur lors de la sauvegarde du produit.");
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !activeSearch ||
      p.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(activeSearch.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(activeSearch.toLowerCase())) ||
      (p.nestedSport && p.nestedSport.toLowerCase().includes(activeSearch.toLowerCase()));

    const matchesMain = selectedMainCat === "All" || p.category === selectedMainCat;
    const matchesSub = selectedSubCat === "All" || p.subcategory === selectedSubCat || p.nestedSport === selectedSubCat;

    return matchesSearch && matchesMain && matchesSub;
  });

  const activeCount = products.filter((p) => p.status === "Active").length;
  const draftCount = products.length - activeCount;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Quick View Inspector Modal */}
      {viewingProduct && (
        <ProductDetailModal
          product={viewingProduct}
          onClose={() => setViewingProduct(null)}
          onEdit={(p) => handleOpenEditModal(p)}
        />
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {lang === "fr" ? "Catalogue & Modèle Produit Unifié" : "Unified Product Catalog & Matrix"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {products.length} {lang === "fr" ? "Tableaux" : "Artworks"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {lang === "fr"
              ? "Modèle unifié avec double finition (Avec Cadre vs Panneau Simple), double matrice tarifaire A4-A0 et préservation stricte des sous-catégories."
              : "Unified catalog model with dual finish renders (Framed vs Panneau Simple), dual pricing matrix A4-A0 in DNT, and strict category mapping."}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === "fr" ? "Ajouter un Tableau" : "Add Product"}</span>
        </button>
      </div>

      {/* Search, Category Filters & Status Summary Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "fr" ? "Rechercher par titre, référence (PRD-xxx), sport..." : "Search title, ID, category..."}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Quick Status Stats Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              {activeCount} {lang === "fr" ? "Actifs" : "Active"}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-bold">
              {draftCount} {lang === "fr" ? "Brouillons" : "Drafts"}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            {lang === "fr" ? "Rayon :" : "Section :"}
          </span>
          {["All", ...MAIN_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedMainCat(cat); setSelectedSubCat("All"); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedMainCat === cat
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat === "All" ? (lang === "fr" ? "Tous les Tableaux" : "All Artworks") : cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/40 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Visuel & Finition</th>
                <th className="py-3.5 px-4">Titre & Réf</th>
                <th className="py-3.5 px-4">Arborescence Catégorie</th>
                <th className="py-3.5 px-4">Fourchette Prix (DNT)</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredProducts.map((p) => {
                const cadreCount = (p.imagesCadre || []).length;
                const simpleCount = (p.imagesPanneau || []).length;
                const thumb = (p.imagesCadre && p.imagesCadre[0]) || (p.images && p.images[0]) || (p.imagesPanneau && p.imagesPanneau[0]) || "";

                const pSimple = p.pricingMatrixSimple || { A4: 35, A0: 190 };
                const pCadre = p.pricingMatrixCadre || p.pricingMatrix || { A4: 50, A0: 240 };
                const minPrice = Math.min(...Object.values(pSimple));
                const maxPrice = Math.max(...Object.values(pCadre));

                return (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors group">
                    {/* Visual Thumb */}
                    <td className="py-3 px-4">
                      <div
                        onClick={() => setViewingProduct(p)}
                        className="relative w-12 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer shadow group-hover:border-amber-500/50 transition-colors"
                      >
                        {thumb ? (
                          <img src={thumb} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-center text-amber-300 font-mono py-0.5">
                          HD
                        </span>
                      </div>
                    </td>

                    {/* Title & Ref */}
                    <td className="py-3 px-4 max-w-xs">
                      <span className="font-mono text-[10px] text-amber-400 font-bold block mb-0.5">
                        {p.id}
                      </span>
                      <p
                        onClick={() => setViewingProduct(p)}
                        className="font-bold text-white text-xs hover:text-amber-300 cursor-pointer transition-colors line-clamp-2"
                      >
                        {p.title}
                      </p>
                      {p.salesCount > 0 && (
                        <span className="text-[10px] text-slate-500">
                          {p.salesCount} {lang === "fr" ? "ventes" : "sales"}
                        </span>
                      )}
                    </td>

                    {/* Category Hierarchy */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-700">
                          {p.category}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {p.subcategory}
                          </span>
                          {p.nestedSport && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              {p.nestedSport}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Price Range in DNT */}
                    <td className="py-3 px-4 font-mono">
                      <div className="font-extrabold text-white text-xs">
                        {minPrice} - {maxPrice} <span className="text-[10px] text-amber-400 font-normal">DNT</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Frame className="w-3 h-3 text-amber-400" /> {pCadre.A3 || 75} DNT (A3)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-cyan-400" /> {pSimple.A3 || 55} DNT (A3)
                        </span>
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4 font-mono">
                      <span className={`font-bold ${p.stock < 10 ? "text-rose-400" : "text-slate-200"}`}>
                        {p.stock}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-1">unités</span>
                    </td>

                    {/* Status Pill Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleProductStatus(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          p.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                        }`}
                        title="Cliquer pour basculer Actif / Brouillon"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Active" ? "bg-emerald-400" : "bg-slate-400"}`} />
                        <span>{p.status === "Active" ? (lang === "fr" ? "Actif" : "Active") : (lang === "fr" ? "Brouillon" : "Draft")}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Aperçu Rapide"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                          title="Modifier"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(lang === "fr" ? `Supprimer "${p.title}" ?` : `Delete "${p.title}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Supprimer / Archiver"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">Aucun tableau trouvé pour cette recherche.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* ADD / EDIT PRODUCT MODAL (Unified Finish & Pricing Matrix)    */}
      {/* ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-[#0F172A] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh]"
            >
              {/* Modal Top Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white font-['Outfit',sans-serif]">
                      {editingProduct
                        ? (lang === "fr" ? `Modifier le Tableau : ${editingProduct.id}` : `Edit Product : ${editingProduct.id}`)
                        : (lang === "fr" ? "Nouveau Tableau (Catalogue Unifié)" : "New Product (Unified Catalog)")}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Modèle produit universel avec double finition et matrice tarifaire A4-A0 en DNT
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 1. Titre & Description */}
                <div className="space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-slate-300 flex items-center gap-1.5">
                      <span>Titre du Tableau</span>
                      <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="ex: Tableau Premium Lionel Messi World Cup Gold Edition"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-slate-300">
                      Description Détaillée & Caractéristiques Techniques
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Impression numérique ultra-HD sur toile canvas avec protection anti-UV..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-amber-500/50 leading-relaxed"
                    />
                  </div>
                </div>

                {/* 2. Arborescence Catégorie Multi-Niveaux & FIX Mapping */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Tag className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                      Arborescence Catégories & Taxonomie
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    {/* Main Category */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Rayon Principal</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleMainCategoryChange(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer"
                      >
                        {MAIN_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Subcategory */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Sous-Catégorie</label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => handleSubcategoryChange(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer"
                      >
                        {(SUBCATEGORIES_MAP[formData.category] || ["Art & Design"]).map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    {/* Deep Sports Subcategory (ONLY visible when subcategory === 'Sports') */}
                    {formData.subcategory === "Sports" ? (
                      <div className="space-y-1.5 animate-fadeIn">
                        <label className="font-semibold text-cyan-400 flex items-center gap-1.5">
                          <span>Discipline Sportive</span>
                          <span className="text-[10px] bg-cyan-500/15 text-cyan-300 px-1.5 py-0.2 rounded font-mono">Requis</span>
                        </label>
                        <select
                          value={formData.nestedSport || "Football"}
                          onChange={(e) => setFormData({ ...formData, nestedSport: e.target.value, discipline: e.target.value })}
                          className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer font-bold"
                        >
                          {SPORTS_SUBCATEGORIES.map((sp) => (
                            <option key={sp} value={sp}>{sp}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-1.5 opacity-40 pointer-events-none">
                        <label className="font-semibold text-slate-500">Discipline Sportive</label>
                        <div className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-600 text-xs">
                          Non applicable ({formData.subcategory})
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. DUAL ASSET UPLOADER (Framed vs Panneau Simple) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-purple-400" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                        Dual Asset Uploader (Rendus HD 1200x1600px)
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      Ratio 3:4 Recommandé
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Slot 1: Images Avec Cadre */}
                    <AssetUploadSlot
                      title='Images "Avec Cadre" (Encadré)'
                      subtitle="Rendus du tableau dans son cadre aluminium / bois noir"
                      badgeText="AVEC CADRE"
                      images={formData.imagesCadre}
                      onImagesChange={(imgs) => setFormData({ ...formData, imagesCadre: imgs })}
                      accentColor="amber"
                    />

                    {/* Slot 2: Images Panneau Simple / Sans-Cadre */}
                    <AssetUploadSlot
                      title='Images "Panneau Simple / Sans-Cadre"'
                      subtitle="Rendus du visuel flottant sur panneau MDF plat sans moulure"
                      badgeText="PANNEAU SIMPLE"
                      images={formData.imagesPanneau}
                      onImagesChange={(imgs) => setFormData({ ...formData, imagesPanneau: imgs })}
                      accentColor="cyan"
                    />
                  </div>
                </div>

                {/* 4. DUAL DIMENSION PRICING MATRIX (in DNT) */}
                <DualPricingInputs
                  matrixCadre={formData.pricingMatrixCadre}
                  matrixSimple={formData.pricingMatrixSimple}
                  onChangeCadre={(size, price) => {
                    setFormData({
                      ...formData,
                      pricingMatrixCadre: { ...formData.pricingMatrixCadre, [size]: price }
                    });
                  }}
                  onChangeSimple={(size, price) => {
                    setFormData({
                      ...formData,
                      pricingMatrixSimple: { ...formData.pricingMatrixSimple, [size]: price }
                    });
                  }}
                />

                {/* 5. Stock, Statut & Vidéo Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Stock Initial Disponible</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Statut de Publication</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer font-bold"
                    >
                      <option value="Active">● Actif (En Vente Immédiate)</option>
                      <option value="Draft">○ Brouillon (Non Visible)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-purple-400" />
                      <span>URL Vidéo MP4 (Optionnel)</span>
                    </label>
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://assets.mixkit.co/preview.mp4"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-purple-500/50 placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSaving ? "Enregistrement..." : (editingProduct ? "Mettre à jour le Produit" : "Créer le Produit")}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
