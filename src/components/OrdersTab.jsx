import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { TUNISIAN_GOVERNORATES } from "../data/mockData";
import { 
  resolveOrderImageUrl, 
  calculateOrderVendorCosts, 
  parseItemDimensions, 
  isItemFramed 
} from "../lib/vendorAccounting";
import { LightboxModal } from "./LightboxModal";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck, 
  Package, 
  XCircle, 
  Download, 
  Printer, 
  Eye, 
  Sparkles, 
  Phone, 
  User, 
  ChevronRight, 
  FileText, 
  Trash2, 
  SlidersHorizontal, 
  DollarSign, 
  Maximize2, 
  Calculator, 
  Layers, 
  CreditCard 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const OrdersTab = ({ globalSearchQuery }) => {
  const { lang, orders, updateOrderStatus, deleteOrder, addToast } = useApp();
  
  // Pipeline filter state
  const [statusFilter, setStatusFilter] = useState("All");
  const [governorateFilter, setGovernorateFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Inspector & Invoice Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  
  // High-Resolution Lightbox Modal State
  const [lightboxData, setLightboxData] = useState(null);

  const activeSearch = globalSearchQuery || searchQuery;

  // Filter logic
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === "All" || ord.status === statusFilter;
    const matchesGov = governorateFilter === "All" || ord.governorate === governorateFilter;
    const matchesSearch =
      !activeSearch ||
      ord.id.toLowerCase().includes(activeSearch.toLowerCase()) ||
      (ord.customerName && ord.customerName.toLowerCase().includes(activeSearch.toLowerCase())) ||
      (ord.phone && ord.phone.includes(activeSearch)) ||
      (ord.governorate && ord.governorate.toLowerCase().includes(activeSearch.toLowerCase()));

    return matchesStatus && matchesGov && matchesSearch;
  });

  const STATUSES = [
    { key: "All", labelFr: "Toutes", labelEn: "All", color: "bg-slate-800 text-slate-200" },
    { key: "Pending", labelFr: "En Attente", labelEn: "Pending", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    { key: "Confirmed", labelFr: "Confirmé", labelEn: "Confirmed", color: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
    { key: "In Production", labelFr: "En Impression", labelEn: "In Production", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
    { key: "Shipped", labelFr: "Expédié", labelEn: "Shipped", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
    { key: "Delivered", labelFr: "Livré", labelEn: "Delivered", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
    { key: "Cancelled", labelFr: "Annulé", labelEn: "Cancelled", color: "bg-rose-500/20 text-rose-300 border-rose-500/40" }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5"><Clock className="w-3 h-3"/> En Attente</span>;
      case "Confirmed":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1.5"><CheckCircle className="w-3 h-3"/> Confirmé</span>;
      case "In Production":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5"><Package className="w-3 h-3"/> En Impression</span>;
      case "Shipped":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5"><Truck className="w-3 h-3"/> Expédié</span>;
      case "Delivered":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5"><CheckCircle className="w-3 h-3"/> Livré</span>;
      case "Cancelled":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5"><XCircle className="w-3 h-3"/> Annulé</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  const handleDownloadAsset = async (url, fileName = "Custom_Artwork_HD.png") => {
    if (!url) return;
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("CORS or network error");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    addToast(lang === "fr" ? "Téléchargement de l'image HD lancé !" : "High-Res Asset download started!", "order", "success");
  };

  const handleOpenLightbox = (ord) => {
    const imgUrl = resolveOrderImageUrl(ord);
    if (!imgUrl) return;

    const firstItem = ord.items && ord.items[0];
    const dimText = firstItem ? `${firstItem.dimension || firstItem.dimensionDetails || "A3"} • ${firstItem.selected_type || firstItem.category || "Tableau"}` : "";

    setLightboxData({
      imageUrl: imgUrl,
      title: `Visuel HD Commande #${ord.id}`,
      subtitle: `Client : ${ord.customerName} (${ord.governorate})`,
      orderId: ord.id,
      dimensions: dimText
    });
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Lightbox Modal */}
      {lightboxData && (
        <LightboxModal
          isOpen={Boolean(lightboxData)}
          onClose={() => setLightboxData(null)}
          {...lightboxData}
        />
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {lang === "fr" ? "Gestionnaire des Commandes (OMS)" : "Order Management System (OMS)"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {orders.length} {lang === "fr" ? "Commandes Total" : "Total Orders"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === "fr"
              ? "Visionneuse HD plein écran, téléchargement direct des fichiers d'impression, et calcul automatique des coûts fournisseurs (Lotfi & L'Imprimerie)."
              : "Full-res lightbox preview, direct HD file download & automated vendor cost engine."}
          </p>
        </div>
      </div>

      {/* PIPELINE STATUS TABS & GOVERNORATE FILTER */}
      <div className="space-y-4">
        
        {/* Status Pipeline Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {STATUSES.map((st) => {
            const count = st.key === "All" ? orders.length : orders.filter((o) => o.status === st.key).length;
            const isSelected = statusFilter === st.key;

            return (
              <button
                key={st.key}
                onClick={() => setStatusFilter(st.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{lang === "fr" ? st.labelFr : st.labelEn}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? "bg-slate-950 text-amber-400" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Governorate Filter & Local Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <label className="text-xs text-slate-300 font-semibold whitespace-nowrap">
              {lang === "fr" ? "Gouvernorat (24) :" : "Governorate (24):"}
            </label>
            <select
              value={governorateFilter}
              onChange={(e) => setGovernorateFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500/50 cursor-pointer w-full sm:w-48"
            >
              <option value="All">🇹🇳 {lang === "fr" ? "Tous les Gouvernorats" : "All Governorates"}</option>
              {TUNISIAN_GOVERNORATES.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "fr" ? "Filtrer par nom, tel, ID..." : "Filter by name, phone, ID..."}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

        </div>

      </div>

      {/* ORDERS TABLE */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 text-[10px]">
              <tr>
                <th className="p-4">N° Commande</th>
                <th className="p-4">Client & Tél</th>
                <th className="p-4">Gouvernorat</th>
                <th className="p-4">Visuel & Articles</th>
                <th className="p-4">Coûts Fournisseurs</th>
                <th className="p-4">Total Client</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredOrders.map((ord) => {
                const imageUrl = resolveOrderImageUrl(ord);
                const vendorCosts = calculateOrderVendorCosts(ord);

                return (
                  <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors group">
                    
                    {/* Order ID & Date */}
                    <td className="p-4">
                      <div className="font-mono font-bold text-amber-300">{ord.id}</div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(ord.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="p-4">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {ord.customerName}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {ord.phone}
                      </div>
                    </td>

                    {/* Governorate Badge */}
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium inline-flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {ord.governorate}
                      </span>
                    </td>

                    {/* Artwork Preview + Items summary */}
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Artwork Click-to-Enlarge Thumbnail */}
                        {imageUrl ? (
                          <div 
                            onClick={() => handleOpenLightbox(ord)}
                            className="relative group/thumb cursor-pointer shrink-0 rounded-lg overflow-hidden border border-amber-500/30 hover:border-amber-400 transition-all w-11 h-11 bg-slate-950"
                            title="Cliquer pour agrandir le visuel HD"
                          >
                            <img
                              src={imageUrl}
                              alt="Aperçu HD"
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                              <Maximize2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-600">
                            <Layers className="w-4 h-4" />
                          </div>
                        )}

                        <div className="space-y-1 min-w-0">
                          {ord.items && ord.items.map((item, idx) => {
                            const isFramed = isItemFramed(item, ord);
                            const finishLabel = item.finish || (isFramed ? "Avec Cadre" : "Panneau Simple");
                            return (
                              <div key={idx} className="flex items-center gap-1.5 flex-wrap">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                                  {item.dimension || "A3"}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border shrink-0 ${
                                  isFramed
                                    ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                    : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                }`}>
                                  {finishLabel}
                                </span>
                                <span className="truncate max-w-[130px] text-slate-200">
                                  {item.title}
                                </span>
                                <span className="text-slate-500 shrink-0">x{item.quantity || 1}</span>
                              </div>
                            );
                          })}
                          {imageUrl && (
                            <button
                              onClick={() => handleOpenLightbox(ord)}
                              className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3 text-cyan-400" />
                              <span>Aperçu HD Lightbox</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Automated Vendor Accounting Breakdown */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] gap-2">
                          <span className="text-slate-400">Lotfi :</span>
                          <span className="font-mono font-semibold text-slate-200">{vendorCosts.lotfiCost} DNT</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] gap-2">
                          <span className="text-slate-400">Impr. :</span>
                          <span className="font-mono font-semibold text-cyan-300">{vendorCosts.imprimerieCost} DNT</span>
                        </div>
                        <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-[10px] font-bold uppercase text-slate-500">Total :</span>
                          <span className="font-mono font-bold text-amber-400">{vendorCosts.totalVendorCost} DNT</span>
                        </div>
                      </div>
                    </td>

                    {/* Total Client DNT Amount */}
                    <td className="p-4 font-mono">
                      <div className="font-extrabold text-white text-sm">
                        {ord.totalAmount} <span className="text-xs text-amber-400 font-normal">DNT</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold">
                        Marge : {vendorCosts.grossProfit} DNT
                      </div>
                    </td>

                    {/* Interactive Status Selector */}
                    <td className="p-4">
                      <div className="relative inline-block">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-1 focus:outline-none focus:border-amber-500/50 cursor-pointer font-semibold"
                        >
                          <option value="Pending">⏳ En Attente</option>
                          <option value="Confirmed">✓ Confirmé</option>
                          <option value="In Production">📦 En Impression</option>
                          <option value="Shipped">🚚 Expédié</option>
                          <option value="Delivered">🎉 Livré</option>
                          <option value="Cancelled">✕ Annulé</option>
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Direct High-Res Download Action */}
                        {imageUrl && (
                          <button
                            onClick={() => handleDownloadAsset(imageUrl, `3AL7IT_CMD_${ord.id}_HD.png`)}
                            className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer"
                            title="Télécharger le fichier haute-résolution HD"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}

                        {/* Inspect Order Button */}
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
                          title={lang === "fr" ? "Inspecter la commande" : "Inspect order"}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* One-Click Invoice Generator Trigger */}
                        <button
                          onClick={() => setInvoiceOrder(ord)}
                          className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
                          title={lang === "fr" ? "Générer la Facture (Print)" : "Generate Invoice"}
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* Delete Action */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Supprimer la commande ${ord.id} ?`)) {
                              deleteOrder(ord.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/40 transition-all cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-500">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-xs">
                      {lang === "fr" ? "Aucune commande ne correspond aux filtres." : "No orders found matching filters."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER INSPECTOR SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {selectedOrder && (() => {
          const selectedImageUrl = resolveOrderImageUrl(selectedOrder);
          const selectedVendorCosts = calculateOrderVendorCosts(selectedOrder);

          return (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-xl bg-[#0F172A] border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between space-y-6 text-slate-200 shadow-2xl"
              >
                <div className="space-y-6">
                  
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-lg text-white font-mono">
                          {selectedOrder.id}
                        </h3>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Passée le {new Date(selectedOrder.createdAt).toLocaleString("fr-FR")}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Customer Information */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4" /> Client & Adresses de Livraison
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <p className="font-bold text-white text-sm">{selectedOrder.customerName}</p>
                      <p className="flex items-center gap-2 text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <a href={`tel:${selectedOrder.phone}`} className="text-amber-300 hover:underline">{selectedOrder.phone}</a>
                      </p>
                      <p className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {selectedOrder.address}, {selectedOrder.postalCode} ({selectedOrder.governorate})
                      </p>
                      {selectedOrder.notes && (
                        <p className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 italic">
                          "{selectedOrder.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* HIGH-RES ARTWORK SUITE & LIGHTBOX TRIGGER */}
                  {selectedImageUrl && (
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/40 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-cyan-300">
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                          <h4 className="font-bold text-xs uppercase tracking-wider">
                            Suite Impression HD & Fichier Source (300 DPI)
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                          HD READY
                        </span>
                      </div>

                      {/* Large Interactive Preview */}
                      <div 
                        onClick={() => handleOpenLightbox(selectedOrder)}
                        className="relative rounded-xl overflow-hidden border border-cyan-500/30 group cursor-pointer bg-slate-950 flex items-center justify-center h-48"
                      >
                        <img
                          src={selectedImageUrl}
                          alt="Custom HD Preview"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-2">
                          <div className="p-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 flex items-center gap-1.5 text-xs">
                            <Maximize2 className="w-4 h-4" />
                            <span>Agrandir en Lightbox Plein Écran</span>
                          </div>
                          <span className="text-[10px] text-cyan-200">Zoom haute fidélité sans perte de qualité</span>
                        </div>
                      </div>

                      {/* Download & File Info Bar */}
                      <div className="flex items-center justify-between gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                        <div className="truncate">
                          <p className="text-xs font-mono text-slate-200 truncate font-semibold">
                            {selectedOrder.customAssetFileName || `Commande_${selectedOrder.id}_300DPI.png`}
                          </p>
                          <p className="text-[10px] text-cyan-400">Format d'exportation pour tireuse vinyle haute-résolution</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenLightbox(selectedOrder)}
                            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Plein Écran</span>
                          </button>
                          <button
                            onClick={() => handleDownloadAsset(selectedImageUrl, `3AL7IT_CMD_${selectedOrder.id}_HD.png`)}
                            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Télécharger HD</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AUTOMATED VENDOR COST BREAKDOWN CARD */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Calculator className="w-4 h-4" />
                        <h4 className="font-bold text-xs uppercase tracking-wider">
                          Moteur Comptable des Coûts Fournisseurs
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Calcul Automatisé
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {/* Lotfi Cost */}
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Lotfi (Menuiserie/Châssis)
                        </p>
                        <p className="text-base font-extrabold text-white font-mono">
                          {selectedVendorCosts.lotfiCost} <span className="text-xs text-amber-400 font-normal">DNT</span>
                        </p>
                        <p className="text-[9px] text-slate-500 italic">
                          Périmètre × 16 DT (cadre) ou Surface × 45 DT (MDF)
                        </p>
                      </div>

                      {/* L'Imprimerie Cost */}
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          L'Imprimerie (Tirage Vinyle)
                        </p>
                        <p className="text-base font-extrabold text-cyan-300 font-mono">
                          {selectedVendorCosts.imprimerieCost} <span className="text-xs text-cyan-400 font-normal">DNT</span>
                        </p>
                        <p className="text-[9px] text-slate-500 italic">
                          Surface × 16 DT / m²
                        </p>
                      </div>
                    </div>

                    {/* Summary row */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Total Fournisseurs :</span>
                        <span className="font-mono font-bold text-amber-400">{selectedVendorCosts.totalVendorCost} DNT</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Prix Vente (Hors Livraison) :</span>
                        <span className="font-mono text-slate-200">
                          {Math.max(0, (selectedOrder.totalAmount || 0) - (selectedOrder.shippingFee || 7))} DNT
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold text-emerald-400">
                        <span>Marge Brute Réalisée :</span>
                        <span className="font-mono text-sm">+{selectedVendorCosts.grossProfit} DNT</span>
                      </div>
                    </div>
                  </div>

                  {/* Ordered Items List */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Tableaux & Panneaux Commandés ({selectedOrder.items?.length || 0})</span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">Finition & Dimensions</span>
                    </h4>
                    <div className="space-y-2.5">
                      {selectedOrder.items && selectedOrder.items.map((item, idx) => {
                        const itemImg = item.image || item.assetUrl || resolveOrderImageUrl(selectedOrder);
                        const isFramed = isItemFramed(item, selectedOrder);
                        const finishText = item.finish || (isFramed ? "Avec Cadre" : "Panneau Simple");

                        return (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {itemImg ? (
                                <img
                                  src={itemImg}
                                  alt={item.title}
                                  className="w-12 h-16 object-cover rounded-lg border border-slate-700 shrink-0 bg-slate-950 shadow"
                                />
                              ) : (
                                <div className="w-12 h-16 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 text-slate-600">
                                  <Layers className="w-5 h-5" />
                                </div>
                              )}
                              <div className="space-y-1 min-w-0">
                                <p className="font-bold text-white text-xs truncate max-w-xs">{item.title}</p>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {/* Finish badge */}
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${
                                    isFramed
                                      ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                      : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                  }`}>
                                    {isFramed ? <Frame className="w-2.5 h-2.5" /> : <Layers className="w-2.5 h-2.5" />}
                                    {finishText}
                                  </span>

                                  {/* Dimension badge */}
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-800 text-slate-300 border border-slate-700">
                                    Format {item.dimension || "A3"} ({item.dimensionDetails || item.dimension || "Standard"})
                                  </span>
                                  <span className="text-[11px] text-slate-400 font-semibold">x{item.quantity || 1}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-mono font-extrabold text-sm text-amber-400">
                                {item.subtotal || (item.unitPrice ? item.unitPrice * (item.quantity || 1) : 0)} DNT
                              </span>
                              {item.unitPrice && (
                                <p className="text-[10px] text-slate-500 font-mono">
                                  {item.unitPrice} DNT / u
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Update Control in Drawer */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Changer le statut du traitement :
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        updateOrderStatus(selectedOrder.id, e.target.value);
                        setSelectedOrder({ ...selectedOrder, status: e.target.value });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500/50 cursor-pointer"
                    >
                      <option value="Pending">⏳ En Attente (Pending)</option>
                      <option value="Confirmed">✓ Confirmé (Confirmed)</option>
                      <option value="In Production">📦 En Impression (In Production)</option>
                      <option value="Shipped">🚚 Expédié (Shipped)</option>
                      <option value="Delivered">🎉 Livré (Delivered)</option>
                      <option value="Cancelled">✕ Annulé (Cancelled)</option>
                    </select>
                  </div>

                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setInvoiceOrder(selectedOrder);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-400 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimer Facture</span>
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* PRINT-READY INVOICE GENERATOR MODAL */}
      <AnimatePresence>
        {invoiceOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl p-8 relative overflow-hidden"
              id="printable-invoice"
            >
              
              {/* Header Invoice Branding */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-6 mb-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    3AL 7IT - TABLEAUX DÉCORATIFS
                  </h1>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Panneaux Décoratifs & Impressions d'Art Luxury
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Tunis, Tunisie • Contact : +216 71 000 000 • contact@3al7it.tn
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-900 font-mono font-bold text-sm">
                    FACTURE #{invoiceOrder.id}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Date : {new Date(invoiceOrder.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              {/* Customer & Shipping Details */}
              <div className="grid grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-xs">
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">FACTURÉ À :</p>
                  <p className="font-bold text-sm text-slate-900">{invoiceOrder.customerName}</p>
                  <p className="text-slate-600">{invoiceOrder.address}</p>
                  <p className="text-slate-600">{invoiceOrder.postalCode} - {invoiceOrder.governorate}, Tunisie</p>
                  <p className="text-slate-600 font-mono mt-1">{invoiceOrder.phone}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">DÉTAILS DE LIVRAISON :</p>
                  <p className="text-slate-700">Mode de Paiement : <strong>{invoiceOrder.paymentMethod || "Paiement à la livraison"}</strong></p>
                  <p className="text-slate-700">Statut du Paiement : <span className="font-bold text-emerald-700">{invoiceOrder.isPaid ? "Payé" : "À percevoir à la livraison"}</span></p>
                  <p className="text-slate-700">Gouvernorat Destinataire : <strong>{invoiceOrder.governorate}</strong></p>
                </div>
              </div>

              {/* Items Invoice Table */}
              <table className="w-full text-left text-xs mb-6">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-slate-900 uppercase font-bold text-[10px]">
                    <th className="py-2">Description du Produit</th>
                    <th className="py-2 text-center">Finition</th>
                    <th className="py-2 text-center">Format</th>
                    <th className="py-2 text-center">Qté</th>
                    <th className="py-2 text-right">Prix Unitaire</th>
                    <th className="py-2 text-right">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {invoiceOrder.items && invoiceOrder.items.map((item, idx) => {
                    const isFramed = isItemFramed(item, invoiceOrder);
                    const finishText = item.finish || (isFramed ? "Avec Cadre" : "Panneau Simple");
                    return (
                      <tr key={idx}>
                        <td className="py-3 font-semibold text-slate-800">{item.title}</td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isFramed ? "bg-amber-100 text-amber-900" : "bg-cyan-100 text-cyan-900"
                          }`}>
                            {finishText}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-800">
                            {item.dimension || "A3"}
                          </span>
                        </td>
                        <td className="py-3 text-center">{item.quantity || 1}</td>
                        <td className="py-3 text-right font-mono">{item.unitPrice || 0} DNT</td>
                        <td className="py-3 text-right font-mono font-bold">{item.subtotal || item.unitPrice || 0} DNT</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Totals & Stamp */}
              <div className="flex justify-between items-end border-t border-slate-200 pt-4 mb-6">
                <div className="text-[10px] text-slate-500 space-y-1">
                  <p className="font-bold text-slate-700">Merci de votre confiance !</p>
                  <p>Pour toute assistance client : contact@3al7it.tn</p>
                  <p className="italic">3AL 7IT — Tableaux Décoratifs & Impressions d'Art</p>
                </div>

                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Sous-Total Produits :</span>
                    <span className="font-mono">
                      {(invoiceOrder.items || []).reduce((acc, i) => acc + (i.subtotal || i.unitPrice || 0), 0)} DNT
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Frais de Livraison ({invoiceOrder.governorate}) :</span>
                    <span className="font-mono">{invoiceOrder.shippingFee || 7} DNT</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-900">
                    <span>TOTAL À PAYER :</span>
                    <span className="font-mono text-amber-700">{invoiceOrder.totalAmount} DNT</span>
                  </div>
                </div>
              </div>

              {/* Modal Trigger Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 print:hidden">
                <button
                  onClick={handleTriggerPrint}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer la Facture (Print)</span>
                </button>
                <button
                  onClick={() => setInvoiceOrder(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-semibold text-xs hover:bg-slate-300 cursor-pointer"
                >
                  Fermer
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
