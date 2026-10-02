import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  FolderTree, 
  PlusCircle, 
  Edit2, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Layers, 
  Frame, 
  Grid, 
  Sparkles, 
  Check, 
  X, 
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CategoriesTab = () => {
  const { lang, categories, addCategory, updateCategory, deleteCategory, reorderCategories, products, addToast } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [newCatName, setNewCatName] = useState("");
  const [newCatNameEn, setNewCatNameEn] = useState("");
  const [newSubcatInput, setNewSubcatInput] = useState("");
  const [subcategoriesList, setSubcategoriesList] = useState([
    { id: "sub-new-1", name: "Général", slug: "general" }
  ]);

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setNewCatName("");
    setNewCatNameEn("");
    setSubcategoriesList([{ id: "sub-1", name: "Général", slug: "general" }]);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat);
    setNewCatName(cat.name);
    setNewCatNameEn(cat.nameEn || cat.name);
    setSubcategoriesList(cat.subcategories || []);
    setIsAddModalOpen(true);
  };

  const handleAddSubcatItem = () => {
    if (!newSubcatInput.trim()) return;
    const slug = newSubcatInput.trim().toLowerCase().replace(/\s+/g, "-");
    setSubcategoriesList((prev) => [
      ...prev,
      { id: `sub-${Date.now()}`, name: newSubcatInput.trim(), slug }
    ]);
    setNewSubcatInput("");
  };

  const handleRemoveSubcatItem = (id) => {
    setSubcategoriesList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: newCatName.trim(),
        nameEn: newCatNameEn.trim(),
        subcategories: subcategoriesList
      });
    } else {
      addCategory({
        name: newCatName.trim(),
        nameEn: newCatNameEn.trim(),
        slug: newCatName.trim().toLowerCase().replace(/\s+/g, "-"),
        icon: "Layers",
        subcategories: subcategoriesList
      });
    }

    setIsAddModalOpen(false);
  };

  // Reordering categories (Move up / down)
  const handleMoveCategory = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    reorderCategories(updated);
  };

  const getCategoryProductCount = (catName) => {
    return products.filter((p) => p.category === catName).length;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {lang === "fr" ? "Gestion de la Arborescence & Catégories" : "Category Hierarchy & Structure"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {categories.length} {lang === "fr" ? "Catégories Principales" : "Main Categories"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === "fr"
              ? "Structurez les catégories (Cadre, Panneaux, Packs, Personnalisé) et leurs sous-catégories."
              : "Reorder, rename, or manage subcategories and nested sports taxonomy."}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === "fr" ? "Ajouter une Catégorie" : "Add Category"}</span>
        </button>
      </div>

      {/* CATEGORY LISTING CARDS TREE */}
      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const productCount = getCategoryProductCount(cat.name);

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
            >
              
              {/* Top Row: Category Title & Reorder / Actions */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  
                  {/* Reorder Up/Down arrows */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveCategory(idx, "up")}
                      className="p-1 rounded bg-slate-900 text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-slate-400"
                      title="Monter"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === categories.length - 1}
                      onClick={() => handleMoveCategory(idx, "down")}
                      className="p-1 rounded bg-slate-900 text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-slate-400"
                      title="Descendre"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <FolderTree className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-white font-['Outfit',sans-serif]">
                        {cat.name}
                      </h3>
                      {cat.nameEn && (
                        <span className="text-xs text-slate-400 font-normal">
                          ({cat.nameEn})
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Slug: /{cat.slug}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-amber-400 border border-slate-800">
                    {productCount} {lang === "fr" ? "Produits rattachés" : "Products"}
                  </span>

                  <button
                    onClick={() => handleOpenEditModal(cat)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                    title="Éditer la catégorie"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Supprimer la catégorie "${cat.name}" ?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/40 transition-all"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subcategories Pills Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Sous-Catégories associées :
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.subcategories && cat.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 shadow-sm"
                    >
                      <Tag className="w-3 h-3 text-cyan-400" />
                      <span>{sub.name}</span>
                      {sub.nestedSports && (
                        <div className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          <span>⚽🏀 Sports Imbriqués</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {(!cat.subcategories || cat.subcategories.length === 0) && (
                    <p className="text-xs text-slate-500 italic">Aucune sous-catégorie configurée.</p>
                  )}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* ADD / EDIT CATEGORY MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0F172A] border border-slate-800 text-slate-200 rounded-2xl shadow-2xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white">
                  {editingCategory ? `Éditer "${editingCategory.name}"` : "Ajouter une Nouvelle Catégorie"}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Nom de la Catégorie (Français) *</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="ex: Panneaux Acoustiques Luxe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Nom Anglais (English Label)</label>
                  <input
                    type="text"
                    value={newCatNameEn}
                    onChange={(e) => setNewCatNameEn(e.target.value)}
                    placeholder="ex: Luxury Acoustic Panels"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                {/* Subcategories Configurator */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <label className="font-semibold text-amber-400 block">
                    Gérer les Sous-Catégories
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSubcatInput}
                      onChange={(e) => setNewSubcatInput(e.target.value)}
                      placeholder="Nom de la sous-catégorie..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubcatItem}
                      className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold hover:bg-amber-500/30"
                    >
                      + Ajouter
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {subcategoriesList.map((sub) => (
                      <span
                        key={sub.id}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 flex items-center gap-1.5"
                      >
                        <span>{sub.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubcatItem(sub.id)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold shadow-lg"
                  >
                    Enregistrer
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
