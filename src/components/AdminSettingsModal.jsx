import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Settings, 
  Database, 
  Trash2, 
  RotateCcw, 
  ShieldAlert, 
  X, 
  CheckCircle2, 
  Server, 
  Coins, 
  Activity,
  Layers,
  ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AdminSettingsModal = ({ isOpen, onClose }) => {
  const { lang, isDbConnected, products, orders, resetDemoData, purgeDataCleanSlate } = useApp();
  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#0F172A] border border-slate-800 text-slate-200 rounded-2xl shadow-2xl p-6 space-y-6"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white font-['Outfit',sans-serif]">
                {lang === "fr" ? "Paramètres Système & Base de Données" : "System & Database Settings"}
              </h3>
              <p className="text-xs text-slate-400">
                Diagnostic, statut Supabase et gestion du nettoyage de la base.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic System Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Diagnostic Système
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Moteur de Stockage</span>
              <div className="flex items-center gap-1.5 font-bold">
                <Database className={`w-3.5 h-3.5 ${isDbConnected ? "text-emerald-400" : "text-cyan-400"}`} />
                <span className={isDbConnected ? "text-emerald-400" : "text-cyan-400"}>
                  {isDbConnected ? "Supabase PostgreSQL" : "LocalStorage Sync"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Devise & Marché</span>
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>DNT (Tunisie 🇹🇳)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Produits Enregistrés</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>{products.length} Tableau(x)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Commandes Enregistrées</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>{orders.length} Commande(s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Reset & Purge Controls */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Actions de Réinitialisation
          </h4>

          <div className="space-y-3">
            {/* Demo Reset */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <div>
                <p className="font-bold text-white">Réinjecter le Jeu de Démo</p>
                <p className="text-[10px] text-slate-400">Recharge les 15+ commandes et 20+ tableaux de test.</p>
              </div>
              <button
                onClick={() => {
                  resetDemoData();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinjecter</span>
              </button>
            </div>

            {/* Clean Slate Purge */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs">
              <div>
                <p className="font-bold text-rose-300">Purger la Base (Clean Slate Launch)</p>
                <p className="text-[10px] text-slate-400">Remet les compteurs à zéro avant le lancement commercial.</p>
              </div>
              <button
                onClick={() => setShowPurgeConfirm(true)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Purger</span>
              </button>
            </div>
          </div>
        </div>

        {/* PURGE CONFIRMATION MODAL OVERLAY */}
        {showPurgeConfirm && (
          <div className="p-4 rounded-xl bg-rose-950/90 border border-rose-500/60 text-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-200 font-bold">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Confirmation de la Purge Complète</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Êtes-vous sûr de vouloir effacer tous les produits et commandes de test ? Cette action préparera le dashboard pour la production.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPurgeConfirm(false)}
                className="px-3 py-1.5 rounded bg-slate-900 text-slate-300 font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={async () => {
                  await purgeDataCleanSlate();
                  setShowPurgeConfirm(false);
                  onClose();
                }}
                className="px-4 py-1.5 rounded bg-rose-600 text-white font-bold"
              >
                Confirmer la Purge Clean Slate
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
};
