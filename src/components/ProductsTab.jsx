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
  Link,
  FileImage,
  AlertCircle,
  Eye,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_FORM_STATE = {
  title: "",
  description: "",
  category: "Cadre",
  subcategory: "Sports",
  nestedSport: "Football",
  status: "Active",
  basePrice: 65,
  pricingMatrix: { A4: 45, A3: 65, A2: 95, A1: 145, A0: 220 },
  images: [],
  videoUrl: "",
  stock: 30
};

// ─────────────────────────────────────────────
// Image Upload Zone (drag-and-drop + URL input)
// ─────────────────────────────────────────────
const ImageUploadZone = ({ images, onImagesChange }) => {
  const [urlInput, setUrlInput] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlError, setUrlError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (files) => {
    const fileArr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!fileArr.length) return;
    fileArr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImagesChange((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+/.test(trimmed)) {
      setUrlError("URL invalide. Elle doit commencer par http:// ou https://");
      return;
    }
    setUrlError("");
    onImagesChange((prev) => [...prev, trimmed]);
    setUrlInput("");
  };

  const handleRemove = (idx) => {
    onImagesChange((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      {/* Drag-and-drop zone */}
      <div
        className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          isDragOver
            ? "border-amber-400 bg-amber-500/8 drag-over"
            : "border-slate-700 bg-slate-950/60 hover:border-slate-600"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center gap-2 pointer-events-none">
          <div className={`p-3 rounded-2xl ${isDragOver ? "bg-amber-500/20" : "bg-slate-900"} transition-colors`}>
            <UploadCloud className={`w-7 h-7 ${isDragOver ? "text-amber-400" : "text-slate-400"} transition-colors`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-300">
              Glisser-déposer vos images ici
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              ou <span className="text-amber-400 font-semibold">cliquer pour parcourir</span> — JPG, PNG, WEBP
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold">
              1200 × 1600px
            </span>
            <span className="text-[10px] text-slate-500">Ratio 3:4 recommandé (HD Print Quality)</span>
          </div>
        </div>
      </div>

      {/* URL Input row */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
          <Link className="w-3.5 h-3.5" />
          Ou ajouter une image via URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => { setUrlInput(e.target.value); setUrlError(""); }}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUrl())}
            placeholder="https://images.unsplash.com/photo-xxx.jpg"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500/50 font-mono placeholder-slate-600"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/25 transition-all shrink-0"
          >
            + Ajouter
          </button>
        </div>
        {urlError && (
          <p className="text-[11px] text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {urlError}
          </p>
        )}
      </div>

      {/* Image Preview Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {images.map((imgSrc, idx) => (
            <div
              key={idx}
              className="relative group aspect-[3/4] rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow"
            >
              <img
                src={imgSrc}
                alt={`Image ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-slate-600 flex-col gap-1 absolute inset-0 bg-slate-950">
                <ImageIcon className="w-5 h-5" />
                <span className="text-[9px]">Erreur URL</span>
              </div>
              {idx === 0 && (
                <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-amber-500/90 text-slate-950 font-bold py-0.5">
                  PRINCIPALE
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500">
          <FileImage className="w-4 h-4 shrink-0" />
          <span>Aucune image ajoutée. Au moins une image est recommandée pour la galerie produit.</span>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Product Detail View Modal
// ─────────────────────────────────────────────
const ProductDetailModal = ({ product, onClose, onEdit }) => {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="shrink-0 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white font-['Outfit',sans-serif] truncate max-w-xs">
                {product.title}
              </h3>
              <p className="text-[11px] text-amber-400 font-mono">{product.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Images */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, i) => (
                <div key={i} className="shrink-0 w-28 h-36 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                  <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px] mb-1">Catégorie</span>
              <span className="font-bold text-amber-400">{product.category}</span>
              {product.subcategory && <span className="text-slate-300 ml-1">/ {product.subcategory}</span>}
              {product.nestedSport && <span className="text-cyan-400 ml-1">({product.nestedSport})</span>}
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px] mb-1">Statut & Stock</span>
              <span className={`font-bold ${product.status === "Active" ? "text-emerald-400" : "text-slate-400"}`}>
                {product.status === "Active" ? "● Actif" : "○ Brouillon"}
              </span>
              <span className="text-slate-300 ml-2">{product.stock} en stock</span>
            </div>
          </div>

          {/* Pricing Matrix */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Matrice des Prix (DNT)
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.pricingMatrix && Object.entries(product.pricingMatrix).map(([size, price]) => (
                <div key={size} className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[56px]">
                  <div className="text-[10px] text-amber-400 font-mono font-bold">{size}</div>
                  <div className="text-sm font-extrabold text-white font-mono">{price}</div>
                  <div className="text-[9px] text-slate-500">DNT</div>
                </div>
              ))}
            </div>
          </div>

          {/* Video URL */}
          {product.videoUrl && (
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-2">
              <Video className="w-4 h-4 shrink-0" />
              <span className="font-mono truncate">{product.videoUrl}</span>
            </div>
          )}
        </div>

        <div className="shrink-0 p-4 bg-slate-900/80 border-t border-slate-800 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors">
            Fermer
          </button>
          <button
            onClick={() => { onClose(); onEdit(product); }}
            className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold hover:bg-amber-400 transition-colors flex items-center gap-2"
          >
            <Edit className="w-3.5 h-3.5" /> Éditer ce Produit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main ProductsTab
// ─────────────────────────────────────────────
export const ProductsTab = ({ globalSearchQuery, isOpenModal, setIsOpenModal }) => {
  const { lang, products, addProduct, updateProduct, deleteProduct, toggleProductStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
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
      category: product.category || "Cadre",
      subcategory: product.subcategory || "Sports",
      nestedSport: product.nestedSport || "Football",
      status: product.status || "Active",
      basePrice: product.basePrice || 65,
      pricingMatrix: product.pricingMatrix || { A4: 45, A3: 65, A2: 95, A1: 145, A0: 220 },
      images: product.images && product.images.length > 0 ? [...product.images] : [],
      videoUrl: product.videoUrl || "",
      stock: product.stock ?? 30
    });
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setEditingProduct(null);
    setFormData(DEFAULT_FORM_STATE);
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
      const payload = {
        ...formData,
        title,
        description: formData.description.trim(),
        basePrice: Number(formData.pricingMatrix?.A3 || formData.basePrice || 65),
        stock: Number(formData.stock) || 0,
        status: formData.status || "Active",
        images: formData.images || []
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await addProduct(payload);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Save product error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImagesChange = useCallback((updater) => {
    setFormData((prev) => ({
      ...prev,
      images: typeof updater === "function" ? updater(prev.images) : updater
    }));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch =
      !activeSearch ||
      (p.title && p.title.toLowerCase().includes(activeSearch.toLowerCase())) ||
      (p.id && p.id.toLowerCase().includes(activeSearch.toLowerCase())) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(activeSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const CATEGORIES = ["All", "Cadre", "Panneaux", "Packs", "Personnalisé"];

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* View Product Modal */}
      <AnimatePresence>
        {viewingProduct && (
          <ProductDetailModal
            product={viewingProduct}
            onClose={() => setViewingProduct(null)}
            onEdit={handleOpenEditModal}
          />
        )}
      </AnimatePresence>

      {/* ── Header Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {lang === "fr" ? "Gestion du Catalogue Produits" : "Product Catalog Management"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {products.length} {lang === "fr" ? "Références" : "Items"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === "fr"
              ? "Matrice de prix par formats A4-A0, catégories imbriquées & uploader multi-images HD."
              : "Matrix pricing by A4-A0 sizes, subcategories & HD image uploader."}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === "fr" ? "Nouveau Produit" : "Add Product"}</span>
        </button>
      </div>

      {/* ── Filters & Search ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {cat === "All" ? (lang === "fr" ? "Toutes les catégories" : "All Categories") : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === "fr" ? "Rechercher par titre ou ID..." : "Search title or ID..."}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* ── Products Table ── */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">Visual & ID</th>
                <th className="p-4">Titre du Tableau</th>
                <th className="p-4">Hiérarchie Catégorie</th>
                <th className="p-4">Prix de Base (A3)</th>
                <th className="p-4">Matrice Formats</th>
                <th className="p-4">Statut & Stock</th>
                <th className="p-4 text-right">Actions CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors group">

                  {/* Thumbnail & ID */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                        {prod.images && prod.images[0] ? (
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        {prod.videoUrl && (
                          <span className="absolute bottom-0 right-0 p-0.5 bg-purple-500 text-white text-[8px] rounded-tl">
                            <Video className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-mono font-bold text-amber-300 block">{prod.id}</span>
                        <span className="text-[10px] text-slate-500">{prod.salesCount || 0} ventes</span>
                      </div>
                    </div>
                  </td>

                  {/* Title & Description */}
                  <td className="p-4 max-w-xs">
                    <p className="font-bold text-white leading-snug truncate">{prod.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{prod.description}</p>
                  </td>

                  {/* Category Hierarchy */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 inline-block">
                        {prod.category}
                      </span>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>{prod.subcategory}</span>
                        {prod.nestedSport && (
                          <span className="text-cyan-400 font-semibold">({prod.nestedSport})</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Base Price */}
                  <td className="p-4 font-mono">
                    <span className="font-extrabold text-white text-sm">{prod.basePrice}</span>{" "}
                    <span className="text-xs text-amber-400">DNT</span>
                  </td>

                  {/* Pricing Matrix */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {prod.pricingMatrix &&
                        Object.entries(prod.pricingMatrix).map(([size, price]) => (
                          <span
                            key={size}
                            className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {size}: <strong className="text-amber-300">{price}DNT</strong>
                          </span>
                        ))}
                    </div>
                  </td>

                  {/* Status & Stock */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleProductStatus(prod.id)}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full border transition-all ${
                          prod.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {prod.status === "Active" ? "● Actif" : "○ Brouillon"}
                      </button>
                      <div className="text-[10px] text-slate-400">
                        <Package className="w-2.5 h-2.5 inline mr-0.5" />
                        Stock: <span className="font-bold text-slate-200">{prod.stock}</span>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewingProduct(prod)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                        title="Voir le détail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                        title="Éditer le produit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Supprimer définitivement "${prod.title}" ?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/40 transition-all"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-slate-500">
                    <Layers className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                    <p className="text-sm font-semibold text-slate-500">
                      {lang === "fr" ? "Aucun produit ne correspond à la recherche." : "No products found."}
                    </p>
                    <button
                      onClick={handleOpenAddModal}
                      className="mt-3 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
                    >
                      + Ajouter le premier produit
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ADD / EDIT PRODUCT MODAL ── */}
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col w-full max-w-3xl bg-[#0F172A] border border-slate-800 text-slate-200 rounded-2xl shadow-2xl my-auto"
              style={{ maxHeight: "calc(100vh - 48px)" }}
            >
              {/* ── STICKY MODAL HEADER ── */}
              <div className="shrink-0 p-5 border-b border-slate-800 flex items-center justify-between bg-[#0F172A] rounded-t-2xl z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white font-['Outfit',sans-serif]">
                      {editingProduct
                        ? `Éditer "${editingProduct.title.slice(0, 30)}${editingProduct.title.length > 30 ? "…" : ""}"`
                        : "Créer un Nouveau Tableau Décoratif"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {editingProduct ? "Modifiez les champs souhaités puis sauvegardez." : "Configurez le nom, la catégorie, les prix DNT (A4-A0) et les visuels HD."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── SCROLLABLE FORM BODY ── */}
              <form onSubmit={handleSaveProduct} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

                  {/* Product Name & Stock Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 space-y-1.5">
                      <label className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                        <span>Nom / Titre du Produit *</span>
                        <span className="text-[10px] text-slate-500 font-normal">(Visible sur le catalogue)</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoFocus
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="ex: Tableau Premium Lionel Messi World Cup Gold Edition"
                        className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all placeholder-slate-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-xs text-slate-300">Quantité Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300 text-xs flex items-center justify-between">
                      <span>Description Détaillée du Produit</span>
                      <span className="text-[10px] text-slate-500 font-normal">Toile, Châssis Bois, Impression HD</span>
                    </label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description de la finition canvas, structure bois noble et vernis protecteur anti-UV..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-amber-500/50 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Category Hierarchy Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-amber-400 text-xs">1. Catégorie Principale</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="Cadre">Cadre (Framed Prints)</option>
                        <option value="Panneaux">Panneaux (Decorative Panels)</option>
                        <option value="Packs">Packs (Triptych & Bundles)</option>
                        <option value="Personnalisé">Personnalisé (Custom Orders)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300 text-xs">2. Sous-Catégorie</label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value, nestedSport: e.target.value === "Sports" ? "Football" : null })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="Sports">Sports</option>
                        <option value="Music">Music</option>
                        <option value="Films & Séries">Films & Séries</option>
                        <option value="Pack en 3">Pack en 3</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Art & Design">Art & Design</option>
                        <option value="Motivation">Motivation</option>
                      </select>
                    </div>

                    {formData.subcategory === "Sports" ? (
                      <div className="space-y-1.5">
                        <label className="font-semibold text-cyan-400 text-xs">3. Discipline Sportive</label>
                        <select
                          value={formData.nestedSport || "Football"}
                          onChange={(e) => setFormData({ ...formData, nestedSport: e.target.value })}
                          className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl p-2.5 text-cyan-200 text-xs font-semibold focus:outline-none"
                        >
                          <option value="Football">⚽ Football</option>
                          <option value="Basketball">🏀 Basketball</option>
                          <option value="MMA">🥊 MMA</option>
                          <option value="Boxing">🥊 Boxing</option>
                          <option value="Motorsport">🏎️ Motorsport (F1)</option>
                          <option value="Tennis">🎾 Tennis</option>
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-1.5 opacity-40 pointer-events-none">
                        <label className="font-semibold text-slate-500 text-xs">3. Discipline Sportive</label>
                        <input
                          disabled
                          value="Non applicable"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-600 text-xs"
                        />
                      </div>
                    )}
                  </div>

                  {/* Statut */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">Statut de Visibilité :</span>
                    <div className="flex gap-2">
                      {["Active", "Draft"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({ ...formData, status: s })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            formData.status === s
                              ? s === "Active"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                                : "bg-slate-800 text-slate-300 border-slate-600"
                              : "bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300"
                          }`}
                        >
                          {s === "Active" ? "● Actif" : "○ Brouillon"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload Zone */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <label className="font-bold text-xs text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-amber-400" />
                        Galerie Visuels HD (Drag & Drop ou URL)
                      </label>
                      <span className="text-[10px] text-slate-500">{formData.images.length} image(s)</span>
                    </div>
                    <ImageUploadZone
                      images={formData.images}
                      onImagesChange={handleImagesChange}
                    />

                    {/* Video URL */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <label className="font-semibold text-slate-300 text-xs flex items-center gap-2">
                        <Video className="w-4 h-4 text-purple-400" />
                        <span>Vidéo Démo du Produit (URL MP4 — optionnelle)</span>
                      </label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://cdn.example.com/demo-video.mp4"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500/50 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Pricing Matrix */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <label className="font-bold text-xs text-white flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        Matrice des Prix par Dimensions (Strictement DNT / د.ت)
                      </label>
                      <span className="text-[10px] text-slate-400">Configurable par format</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {["A4", "A3", "A2", "A1", "A0"].map((size) => (
                        <div key={size} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-center">
                          <span className="text-[11px] font-bold text-amber-400 block font-mono">
                            Format {size}
                          </span>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              value={formData.pricingMatrix[size] || 0}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setFormData((prev) => ({
                                  ...prev,
                                  pricingMatrix: { ...prev.pricingMatrix, [size]: val }
                                }));
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-white font-mono font-bold text-center focus:outline-none focus:border-amber-500/50"
                            />
                          </div>
                          <span className="text-[10px] text-slate-500">DNT</span>
                        </div>
                      ))}
                    </div>

                    {/* Auto-fill hint */}
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                      <Sparkles className="w-3 h-3 text-amber-500/60" />
                      <span>Le prix de base affiché est basé sur le format A3.</span>
                    </div>
                  </div>

                </div>

                {/* ── STICKY MODAL FOOTER ── */}
                <div className="shrink-0 p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3 rounded-b-2xl">
                  <div className="text-[10px] text-slate-500 hidden sm:block">
                    {formData.images.length} image(s) • {Object.values(formData.pricingMatrix).filter(Boolean).length}/5 prix renseignés
                  </div>
                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-950 rounded-full animate-spin" />
                          <span>Sauvegarde...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingProduct ? "Enregistrer les Modifications" : "Enregistrer & Créer Produit"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
