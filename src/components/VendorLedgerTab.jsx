import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import {
  calculateVendorLedgerTotals,
  calculateOrderVendorCosts,
  calculateNetProfitBreakdown
} from "../lib/vendorAccounting";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Calculator,
  Receipt,
  Package,
  Printer,
  BarChart3,
  ArrowDownCircle,
  ArrowUpCircle,
  Layers,
  Sparkles,
  PiggyBank
} from "lucide-react";

export const VendorLedgerTab = () => {
  const {
    lang,
    orders,
    adSpend,
    vendorPayments,
    operationalExpenses,
    addVendorPayment,
    deleteVendorPayment,
    addExpense,
    deleteExpense
  } = useApp();

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    vendor: "Lotfi",
    amount: "",
    paymentMethod: "Espèces",
    notes: "",
    date: new Date().toISOString().slice(0, 10)
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Expense form state
  const [expenseForm, setExpenseForm] = useState({
    title: "",
    category: "Packaging & Emballage",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    notes: ""
  });
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // Computed values
  const {
    vendorTotals,
    profitBreakdown,
    orderCostDetails
  } = useMemo(() => {
    const totals = calculateVendorLedgerTotals(orders, vendorPayments);
    const breakdown = calculateNetProfitBreakdown({ orders, adSpend, expenses: operationalExpenses });
    const orderDetails = orders
      .filter((o) => o.status !== "Cancelled")
      .slice(0, 20)
      .map((ord) => ({
        ...ord,
        vendorCosts: calculateOrderVendorCosts(ord)
      }));
    return {
      vendorTotals: totals,
      profitBreakdown: breakdown,
      orderCostDetails: orderDetails
    };
  }, [orders, adSpend, vendorPayments, operationalExpenses]);

  const EXPENSE_CATEGORIES = [
    "Packaging & Emballage",
    "Transport & Logistique",
    "Outils & Abonnements",
    "Loyer & Charges",
    "Téléphone & Internet",
    "Impression & Fournitures",
    "Marketing Local",
    "Divers"
  ];

  const VENDOR_PAYMENT_METHODS = ["Espèces", "Virement Bancaire", "Chèque", "Carte Bancaire"];

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) return;
    await addVendorPayment({
      vendor: paymentForm.vendor,
      vendorRole: paymentForm.vendor === "Lotfi" ? "Menuiserie, Châssis MDF & Cadres" : "Tirages Vinyle & Plastification",
      amount: Number(paymentForm.amount),
      paymentMethod: paymentForm.paymentMethod,
      notes: paymentForm.notes,
      date: paymentForm.date
    });
    setPaymentForm({
      vendor: "Lotfi",
      amount: "",
      paymentMethod: "Espèces",
      notes: "",
      date: new Date().toISOString().slice(0, 10)
    });
    setShowPaymentForm(false);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.amount || Number(expenseForm.amount) <= 0) return;
    await addExpense({
      title: expenseForm.title,
      category: expenseForm.category,
      amount: Number(expenseForm.amount),
      date: expenseForm.date,
      notes: expenseForm.notes
    });
    setExpenseForm({
      title: "",
      category: "Packaging & Emballage",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      notes: ""
    });
    setShowExpenseForm(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* ─── HEADER ─── */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {lang === "fr" ? "Comptabilité Fournisseurs & Profit Net" : "Vendor Ledger & Net Profit Engine"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {lang === "fr"
              ? "Calcul automatisé des dettes fournisseurs (Lotfi & L'Imprimerie), suivi des règlements jusqu'à 0 DNT, dépenses opérationnelles et profit net temps-réel."
              : "Automated vendor cost accounting for Lotfi & L'Imprimerie, payment tracking to 0 DNT, expenses manager & real-time net profit."}
          </p>
        </div>
      </div>

      {/* ─── REAL-TIME NET PROFIT BREAKDOWN ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="glass-card-gold p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Chiffre d'Affaires</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-black text-white font-['Outfit',sans-serif]">
            {profitBreakdown.totalRevenue.toLocaleString()} <span className="text-sm text-amber-400 font-normal">DNT</span>
          </p>
          <p className="text-[11px] text-slate-400">Commandes actives (hors annulées)</p>
        </div>

        {/* Total Vendor Costs */}
        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Coût Fournisseurs</span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400"><Receipt className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-black text-white font-['Outfit',sans-serif]">
            {profitBreakdown.totalVendorCosts.toLocaleString()} <span className="text-sm text-rose-400 font-normal">DNT</span>
          </p>
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <div className="flex justify-between"><span>Lotfi :</span><span className="font-mono">{profitBreakdown.lotfiTotalCost} DNT</span></div>
            <div className="flex justify-between"><span>Imprimerie :</span><span className="font-mono">{profitBreakdown.imprimerieTotalCost} DNT</span></div>
          </div>
        </div>

        {/* Total Expenses (Ad + Op) */}
        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Autres Charges</span>
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400"><DollarSign className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-black text-white font-['Outfit',sans-serif]">
            {(profitBreakdown.totalAdSpend + profitBreakdown.totalOpExpenses).toLocaleString()} <span className="text-sm text-orange-400 font-normal">DNT</span>
          </p>
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <div className="flex justify-between"><span>Pub :</span><span className="font-mono">{profitBreakdown.totalAdSpend} DNT</span></div>
            <div className="flex justify-between"><span>Op. Expenses :</span><span className="font-mono">{profitBreakdown.totalOpExpenses} DNT</span></div>
          </div>
        </div>

        {/* Net Profit */}
        <div className={`p-5 rounded-2xl space-y-2 border ${profitBreakdown.netProfit >= 0 ? "glass-card-cyan border-emerald-500/40" : "bg-rose-950/30 border-rose-500/40"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Profit Net</span>
            <div className={`p-1.5 rounded-lg ${profitBreakdown.netProfit >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <p className={`text-2xl font-black font-['Outfit',sans-serif] ${profitBreakdown.netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {profitBreakdown.netProfit >= 0 ? "+" : ""}{profitBreakdown.netProfit.toLocaleString()} <span className="text-sm font-normal">DNT</span>
          </p>
          <p className="text-[11px] font-bold text-slate-400">
            Marge : <span className={`${profitBreakdown.netMargin >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{profitBreakdown.netMargin}%</span>
          </p>
        </div>
      </div>

      {/* ─── VENDOR BALANCES ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Lotfi Balance */}
        {[vendorTotals.lotfi, vendorTotals.imprimerie].map((vendor) => (
          <div
            key={vendor.shortName}
            className={`p-6 rounded-2xl border space-y-5 ${vendor.isSettled ? "bg-emerald-950/20 border-emerald-500/30" : "bg-slate-900/80 border-amber-500/30"}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${vendor.isSettled ? "bg-emerald-400 shadow-lg shadow-emerald-500/40" : "bg-amber-400 animate-pulse"}`} />
                  <h3 className="font-extrabold text-white text-sm">{vendor.name}</h3>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 ml-4">{vendor.role}</p>
              </div>
              {vendor.isSettled ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                  <CheckCircle className="w-3.5 h-3.5" /> Soldé
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" /> Balance Due
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Doit</p>
                <p className="text-white font-extrabold font-mono text-base">{vendor.totalDue.toFixed(2)}</p>
                <p className="text-[10px] text-slate-500">DNT</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Payé</p>
                <p className="text-emerald-400 font-extrabold font-mono text-base">{vendor.totalPaid.toFixed(2)}</p>
                <p className="text-[10px] text-slate-500">DNT</p>
              </div>
              <div className={`p-3 rounded-xl border ${vendor.isSettled ? "bg-emerald-950/30 border-emerald-500/30" : "bg-amber-950/30 border-amber-500/30"}`}>
                <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Reste</p>
                <p className={`font-extrabold font-mono text-base ${vendor.isSettled ? "text-emerald-400" : "text-amber-300"}`}>
                  {vendor.balance.toFixed(2)}
                </p>
                <p className="text-[10px] text-slate-500">DNT</p>
              </div>
            </div>

            {/* Progress bar to 0 DNT */}
            {vendor.totalDue > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Progression règlement :</span>
                  <span className="font-bold text-slate-200 font-mono">
                    {Math.min(100, vendor.totalDue > 0 ? (vendor.totalPaid / vendor.totalDue) * 100 : 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${vendor.isSettled ? "bg-emerald-500" : "bg-gradient-to-r from-amber-500 to-amber-400"}`}
                    style={{ width: `${Math.min(100, vendor.totalDue > 0 ? (vendor.totalPaid / vendor.totalDue) * 100 : 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ─── VENDOR PAYMENT REGISTRY ─── */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 text-sm">
              <Wallet className="w-4 h-4 text-amber-400" />
              Registre des Paiements Fournisseurs
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {vendorPayments.length} paiements enregistrés
            </p>
          </div>
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enregistrer un Paiement</span>
          </button>
        </div>

        {/* Payment Form */}
        <AnimatePresence>
          {showPaymentForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAddPayment} className="p-5 border-b border-slate-800 bg-slate-900/50 grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Vendor Select */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Fournisseur</label>
                  <select
                    value={paymentForm.vendor}
                    onChange={(e) => setPaymentForm({ ...paymentForm, vendor: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    <option value="Lotfi">Lotfi (Châssis MDF & Cadres)</option>
                    <option value="L'Imprimerie">L'Imprimerie / Bilel (Vinyle)</option>
                  </select>
                </div>

                {/* Amount */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Montant (DNT)</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    placeholder="0.00"
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>

                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={paymentForm.date}
                    onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Moyen de Paiement</label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    {VENDOR_PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Notes</label>
                  <input
                    type="text"
                    value={paymentForm.notes}
                    onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                    placeholder="Ex: Acompte lot commandes oct."
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-all cursor-pointer"
                  >
                    Valider Paiement
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
                    className="py-2 px-3 rounded-xl bg-slate-800 text-slate-400 text-xs hover:bg-slate-700 cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payments list */}
        <div className="divide-y divide-slate-800/60">
          {vendorPayments.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs">
              <Wallet className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>Aucun paiement enregistré. Cliquez sur "Enregistrer un Paiement" pour commencer.</p>
            </div>
          ) : (
            vendorPayments.map((pay) => (
              <div key={pay.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-900/40 transition-colors text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${String(pay.vendor || "").toLowerCase().includes("lotfi") ? "bg-amber-400" : "bg-cyan-400"}`} />
                  <div>
                    <span className="font-bold text-white">{pay.vendor}</span>
                    {pay.notes && <span className="ml-2 text-slate-400 italic">{pay.notes}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-slate-500 font-mono">{pay.date}</span>
                  <span className="text-[11px] text-slate-400">{pay.paymentMethod}</span>
                  <span className="font-mono font-extrabold text-emerald-400">-{pay.amount} DNT</span>
                  <button
                    onClick={() => deleteVendorPayment(pay.id)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    title="Supprimer ce paiement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ─── OPERATIONAL EXPENSES MANAGER ─── */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Gestionnaire des Dépenses Opérationnelles
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Total : <span className="font-mono font-bold text-purple-400">{profitBreakdown.totalOpExpenses} DNT</span> · {operationalExpenses.length} entrées
            </p>
          </div>
          <button
            onClick={() => setShowExpenseForm(!showExpenseForm)}
            className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center gap-1.5 hover:bg-purple-500/30 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter une Dépense</span>
          </button>
        </div>

        {/* Expense form */}
        <AnimatePresence>
          {showExpenseForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAddExpense} className="p-5 border-b border-slate-800 bg-slate-900/50 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="col-span-2 md:col-span-1 space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Libellé Dépense</label>
                  <input
                    type="text"
                    value={expenseForm.title}
                    onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                    placeholder="Ex: Achat rouleaux bulle..."
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Catégorie</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50 cursor-pointer"
                  >
                    {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Montant (DNT)</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    placeholder="0.00"
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Notes</label>
                  <input
                    type="text"
                    value={expenseForm.notes}
                    onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                    placeholder="Détails optionnels..."
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-500 text-white font-extrabold text-xs hover:bg-purple-400 transition-all cursor-pointer"
                  >
                    Ajouter Dépense
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowExpenseForm(false)}
                    className="py-2 px-3 rounded-xl bg-slate-800 text-slate-400 text-xs hover:bg-slate-700 cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expenses list */}
        <div className="divide-y divide-slate-800/60">
          {operationalExpenses.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>Aucune dépense enregistrée.</p>
            </div>
          ) : (
            operationalExpenses.map((exp) => (
              <div key={exp.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-900/40 transition-colors text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{exp.title}</p>
                    <p className="text-[10px] text-slate-400">{exp.category}{exp.notes ? ` · ${exp.notes}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[11px] text-slate-500 font-mono">{exp.date}</span>
                  <span className="font-mono font-extrabold text-rose-400">-{exp.amount} DNT</span>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    title="Supprimer cette dépense"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ─── PER-ORDER VENDOR COST BREAKDOWN TABLE ─── */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h3 className="font-bold text-white flex items-center gap-2 text-sm">
            <Calculator className="w-4 h-4 text-cyan-400" />
            Détail des Coûts par Commande Active
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Calculé automatiquement selon les formules : Cadre = Périmètre × 16 DNT · Panneau Simple = Surface × 45 DNT · Impression Vinyle = Surface × 16 DNT/m²
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Commande</th>
                <th className="p-4">Client</th>
                <th className="p-4 text-center">Lotfi DNT</th>
                <th className="p-4 text-center">Imprimerie DNT</th>
                <th className="p-4 text-center">Total Fournisseur</th>
                <th className="p-4 text-center">Prix Vente</th>
                <th className="p-4 text-right">Marge Brute</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {orderCostDetails.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-500">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>Aucune commande active à analyser.</p>
                  </td>
                </tr>
              ) : (
                orderCostDetails.map((ord) => {
                  const productRevenue = Math.max(0, ord.totalAmount - (ord.shippingFee || 7));
                  const isProfit = ord.vendorCosts.grossProfit >= 0;
                  return (
                    <tr key={ord.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-300 text-xs">{ord.id}</td>
                      <td className="p-4 text-xs">
                        <p className="font-semibold text-white">{ord.customerName}</p>
                        <p className="text-slate-500 text-[10px]">{ord.governorate}</p>
                      </td>
                      <td className="p-4 text-center font-mono text-slate-200">{ord.vendorCosts.lotfiCost}</td>
                      <td className="p-4 text-center font-mono text-cyan-300">{ord.vendorCosts.imprimerieCost}</td>
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-amber-400">{ord.vendorCosts.totalVendorCost}</span>
                      </td>
                      <td className="p-4 text-center font-mono text-slate-200">{productRevenue}</td>
                      <td className="p-4 text-right">
                        <span className={`font-mono font-extrabold ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
                          {isProfit ? "+" : ""}{ord.vendorCosts.grossProfit}
                        </span>
                        <span className="text-slate-500 text-[10px]"> DNT</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {orderCostDetails.length > 0 && (
              <tfoot className="bg-slate-900/90 border-t-2 border-amber-500/30 text-xs font-bold">
                <tr>
                  <td className="p-4 text-amber-400 uppercase tracking-wider text-[10px]" colSpan="2">TOTAUX CUMULÉS</td>
                  <td className="p-4 text-center font-mono text-slate-200">
                    {profitBreakdown.lotfiTotalCost}
                  </td>
                  <td className="p-4 text-center font-mono text-cyan-300">
                    {profitBreakdown.imprimerieTotalCost}
                  </td>
                  <td className="p-4 text-center font-mono text-amber-400">
                    {profitBreakdown.totalVendorCosts}
                  </td>
                  <td className="p-4 text-center font-mono text-slate-200">
                    {profitBreakdown.totalRevenue}
                  </td>
                  <td className="p-4 text-right font-mono text-emerald-400">
                    {orderCostDetails.reduce((sum, o) => sum + o.vendorCosts.grossProfit, 0).toFixed(2)} DNT
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

    </div>
  );
};
