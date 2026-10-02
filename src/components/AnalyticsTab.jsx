import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { REVENUE_TIMESERIES_DATA } from "../data/mockData";
import { 
  TrendingUp, 
  ShoppingBag, 
  Layers, 
  DollarSign, 
  Percent, 
  ShoppingBasket, 
  Calculator, 
  Sparkles, 
  BarChart2,
  PieChart as PieIcon,
  Activity,
  ArrowUpRight,
  Sliders,
  Check
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const AnalyticsTab = () => {
  const { lang, orders, adSpend, updateAdSpend } = useApp();
  const [timeframe, setTimeframe] = useState("Semaine");

  // Local draft ad spend form state
  const [localAdSpend, setLocalAdSpend] = useState({
    facebook: adSpend.facebook || 0,
    instagram: adSpend.instagram || 0,
    tiktok: adSpend.tiktok || 0,
    google: adSpend.google || 0,
    cogsPercentage: adSpend.cogsPercentage || 35
  });

  // MEMOIZED FINANCIAL & BI CALCULATIONS
  const {
    validOrders,
    totalRevenue,
    totalOrdersCount,
    totalPanelsSold,
    totalAdSpend,
    cogsAmount,
    netProfit,
    netProfitMargin,
    aov,
    roas,
    cac,
    categoryPieData,
    formatBarData
  } = useMemo(() => {
    const valid = orders.filter((o) => o.status !== "Cancelled");
    const revenue = valid.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const ordersCount = valid.length;

    const panelsSold = valid.reduce((sum, o) => {
      return sum + (o.items ? o.items.reduce((iSum, item) => iSum + (item.quantity || 1), 0) : 0);
    }, 0);

    const spend = (adSpend.facebook || 0) + (adSpend.instagram || 0) + (adSpend.tiktok || 0) + (adSpend.google || 0);
    const cogs = (revenue * (adSpend.cogsPercentage || 35)) / 100;
    const profit = revenue - spend - cogs;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    const avgOrderVal = ordersCount > 0 ? revenue / ordersCount : 0;

    // Division by zero protection
    const computedRoas = spend > 0 ? revenue / spend : 0;
    const computedCac = ordersCount > 0 ? spend / ordersCount : 0;

    // Category Sales Share
    const catMap = { Cadre: 0, Panneaux: 0, Packs: 0, Personnalisé: 0 };
    valid.forEach((ord) => {
      if (ord.items) {
        ord.items.forEach((item) => {
          const catKey = item.category || "Cadre";
          catMap[catKey] = (catMap[catKey] || 0) + (item.subtotal || 0);
        });
      }
    });

    const pieData = Object.keys(catMap).map((catName) => ({
      name: catName,
      value: catMap[catName]
    }));

    // Format Volume Distribution
    const fmtCounts = { A4: 0, A3: 0, A2: 0, A1: 0, A0: 0 };
    valid.forEach((ord) => {
      if (ord.items) {
        ord.items.forEach((item) => {
          const sizeKey = item.dimension || "A3";
          if (fmtCounts[sizeKey] !== undefined) {
            fmtCounts[sizeKey] += (item.quantity || 1);
          } else {
            fmtCounts["A3"] += (item.quantity || 1);
          }
        });
      }
    });

    const barData = Object.keys(fmtCounts).map((sizeKey) => ({
      format: sizeKey,
      units: fmtCounts[sizeKey]
    }));

    return {
      validOrders: valid,
      totalRevenue: revenue,
      totalOrdersCount: ordersCount,
      totalPanelsSold: panelsSold,
      totalAdSpend: spend,
      cogsAmount: cogs,
      netProfit: profit,
      netProfitMargin: margin,
      aov: avgOrderVal,
      roas: computedRoas,
      cac: computedCac,
      categoryPieData: pieData,
      formatBarData: barData
    };
  }, [orders, adSpend]);

  const PIE_COLORS = ["#F59E0B", "#06B6D4", "#A855F7", "#10B981"];

  const handleAdSpendFormSubmit = (e) => {
    e.preventDefault();
    updateAdSpend(localAdSpend);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {lang === "fr" ? "Tableau de Bord Analytics & BI" : "BI & Analytics Dashboard"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              ROAS 360°
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {lang === "fr"
              ? "Calculs financiers en temps réel, indicateurs publicitaires Meta & TikTok, et marges nettes."
              : "Real-time financial metrics, Meta & TikTok ad spend tracking, and net margins."}
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-3">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="text-right text-xs">
              <span className="text-slate-400 block text-[10px]">Taux de ROAS Global</span>
              <span className="font-extrabold text-emerald-400">{roas.toFixed(2)}x</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP 6 METRIC KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* KPI 1: Total Revenue */}
        <div className="glass-card-gold p-4 rounded-2xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              {lang === "fr" ? "CA Global" : "Total Revenue"}
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            {totalRevenue.toLocaleString()} <span className="text-xs text-amber-400 font-normal">DNT</span>
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            <span>{totalRevenue > 0 ? "+18.4% vs mois dernier" : "0.0% (Lancement Commercial Clean)"}</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              {lang === "fr" ? "Commandes" : "Total Orders"}
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            {totalOrdersCount}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
            <span>{validOrders.length} validées</span>
          </div>
        </div>

        {/* KPI 3: Panels Sold */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              {lang === "fr" ? "Panneaux Vendus" : "Panels Sold"}
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            {totalPanelsSold} <span className="text-xs text-purple-400 font-normal">unités</span>
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-purple-400">
            <span>Formats A4 à A0</span>
          </div>
        </div>

        {/* KPI 4: Ad Spend */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              {lang === "fr" ? "Budget Pub" : "Ad Spend"}
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            {totalAdSpend.toLocaleString()} <span className="text-xs text-rose-400 font-normal">DNT</span>
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
            <span>Meta & TikTok</span>
          </div>
        </div>

        {/* KPI 5: Net Profit Margin */}
        <div className="glass-card-cyan p-4 rounded-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              {lang === "fr" ? "Marge Nette" : "Net Margin"}
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            {netProfitMargin.toFixed(1)}%
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-cyan-400">
            <span>{netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })} DNT Profit</span>
          </div>
        </div>

        {/* KPI 6: Average Order Value */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">
              {lang === "fr" ? "Panier Moyen" : "AOV"}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShoppingBasket className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            {aov.toFixed(1)} <span className="text-xs text-emerald-400 font-normal">DNT</span>
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400">
            <span>Moyenne par client</span>
          </div>
        </div>

      </div>

      {/* DYNAMIC AD SPEND LOG FORM & ROAS / CAC CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ad Spend Form Inputs */}
        <form onSubmit={handleAdSpendFormSubmit} className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {lang === "fr" ? "Calculateur Ad Spend, ROAS & CAC" : "Ad Spend, ROAS & CAC Calculator"}
                </h3>
                <p className="text-xs text-slate-400">
                  Saisissez vos dépenses pub par canal et soumettez pour recalculer la rentabilité en temps réel.
                </p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              DNT / د.ت
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Facebook Ads */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Facebook Ads</span>
                <span className="text-[10px] text-blue-400">Meta Ads</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={localAdSpend.facebook}
                  onChange={(e) => setLocalAdSpend({ ...localAdSpend, facebook: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">DNT</span>
              </div>
            </div>

            {/* Instagram Ads */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Instagram Ads</span>
                <span className="text-[10px] text-pink-400">Meta Ads</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={localAdSpend.instagram}
                  onChange={(e) => setLocalAdSpend({ ...localAdSpend, instagram: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">DNT</span>
              </div>
            </div>

            {/* TikTok Ads */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>TikTok Ads</span>
                <span className="text-[10px] text-cyan-400">TikTok Business</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={localAdSpend.tiktok}
                  onChange={(e) => setLocalAdSpend({ ...localAdSpend, tiktok: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">DNT</span>
              </div>
            </div>

            {/* Google Ads */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Google Ads</span>
                <span className="text-[10px] text-emerald-400">Search & Shopping</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={localAdSpend.google}
                  onChange={(e) => setLocalAdSpend({ ...localAdSpend, google: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">DNT</span>
              </div>
            </div>

          </div>

          {/* COGS Slider Config */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                {lang === "fr" ? "Estimation COGS (Coût de production & châssis)" : "COGS Estimation (Materials & Frames)"}
              </span>
              <span className="font-mono font-bold text-amber-400">{localAdSpend.cogsPercentage}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={localAdSpend.cogsPercentage}
              onChange={(e) => setLocalAdSpend({ ...localAdSpend, cogsPercentage: parseFloat(e.target.value) || 35 })}
              className="w-full accent-amber-500 bg-slate-800 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{lang === "fr" ? "Enregistrer / Loguer les Budgets Pub" : "Save & Calculate ROAS"}</span>
            </button>
          </div>
        </form>

        {/* Live Calculation Output Card */}
        <div className="lg:col-span-5 glass-card-gold p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {lang === "fr" ? "Résultats Financiers Déduits" : "Financial Outputs"}
              </h4>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                CLIENT-SIDE RECTIV
              </span>
            </div>

            <div className="mt-6 space-y-5">
              
              {/* Formula 1: ROAS */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">ROAS (Return On Ad Spend)</span>
                  <span className="text-[10px] text-amber-400 font-mono">Total Revenue / Ad Spend</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-amber-300 font-['Outfit',sans-serif]">
                    {roas.toFixed(2)}x
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {totalAdSpend === 0 ? "0.00x — Zero-Spend Initial State" : roas >= 3 ? "🔥 Excellent ROAS" : roas >= 2 ? "✅ Rentable" : "⚠️ Monitorer"}
                  </span>
                </div>
              </div>

              {/* Formula 2: CAC */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">CAC (Coût d'Acquisition Client)</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Ad Spend / Total Orders</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-cyan-300 font-['Outfit',sans-serif]">
                    {cac.toFixed(2)} <span className="text-xs font-normal">DNT</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">par commande</span>
                </div>
              </div>

              {/* Formula 3: Net Profit Calculation Breakdown */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Net Profit (Profit Net Restant)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Revenue - Ads - COGS</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-emerald-400 font-['Outfit',sans-serif]">
                    {netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-normal">DNT</span>
                  </span>
                  <span className="text-xs text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {netProfitMargin.toFixed(1)}% Marge
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">💡 Formule de Calcul Automatisée :</p>
            <p className="font-mono text-[10px]">Net Profit = Revenue ({totalRevenue} DNT) - Ads ({totalAdSpend} DNT) - COGS ({cogsAmount.toFixed(0)} DNT)</p>
          </div>
        </div>

      </div>

      {/* RECHARTS VISUAL SUITE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue Growth & Trajectory (Line/Area Chart) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-amber-400" />
                {lang === "fr" ? "Trajectoire des Ventes & Chiffre d'Affaires" : "Sales Revenue Growth"}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === "fr" ? "Evolution interactive par Jour, Semaine et Mois." : "Interactive trend breakdown by Day, Week, Month."}
              </p>
            </div>

            {/* Timeframe Selector Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              {["Jour", "Semaine", "Mois"].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    timeframe === period
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {period === "Jour" ? (lang === "fr" ? "Jour" : "Day") : period === "Semaine" ? (lang === "fr" ? "Semaine" : "Week") : (lang === "fr" ? "Mois" : "Month")}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TIMESERIES_DATA[timeframe]}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="period" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit=" DNT" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "12px"
                  }}
                  formatter={(val) => [`${val} DNT`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales Share (Glowing Donut Chart) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-cyan-400" />
              {lang === "fr" ? "Ventes par Catégorie" : "Category Sales Share"}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === "fr" ? "Cadre, Panneaux, Packs & Custom." : "Share per product category."}
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            {categoryPieData.every((item) => item.value === 0) ? (
              <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                  <PieIcon className="w-6 h-6 opacity-40 text-cyan-400" />
                </div>
                <p className="text-xs font-semibold text-slate-400">Aucune vente enregistrée</p>
                <p className="text-[10px] text-slate-600">Le graphique s'actualisera avec les nouvelles commandes.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={6}
                    dataKey="value"
                  >
                    {categoryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#0F172A" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      color: "#FFF",
                      fontSize: "12px"
                    }}
                    formatter={(val) => [`${val} DNT`, "CA Category"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            {categoryPieData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                  <span className="text-slate-300 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-white font-mono">{item.value} DNT</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Format Volume Distribution Bar Chart (A4, A3, A2, A1, A0) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              {lang === "fr" ? "Distribution des Formats Vendus (Volume d'Unités)" : "Format Sales Distribution (Units)"}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === "fr"
                ? "Comparatif des ventes physiques selon les dimensions A4 (21x30cm) à A0 (84x118cm)."
                : "Unit volume per print dimension from A4 to A0."}
            </p>
          </div>
          <span className="text-xs text-purple-300 font-semibold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
            {totalPanelsSold} Total Units
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="format" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  color: "#FFF",
                  fontSize: "12px"
                }}
                formatter={(val) => [`${val} Unités vendues`, "Volume"]}
              />
              <Bar dataKey="units" fill="#38BDF8" radius={[8, 8, 0, 0]} barSize={45}>
                {formatBarData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={index === 1 ? "#F59E0B" : index === 2 ? "#06B6D4" : "#818CF8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
