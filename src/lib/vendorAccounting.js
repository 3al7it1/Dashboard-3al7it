/**
 * Vendor Cost Formulas & Accounting Engine for 3AL 7IT
 * 
 * Vendors:
 * 1. Lotfi (Menuiserie, Châssis MDF & Cadres)
 *    - Cadre:          Base Cost = ((W + H) * 2 * 16)  (Perimeter in meters * 16 TND)
 *    - Panneau Simple: Base Cost = (W * H * 45)         (Area in meters² * 45 TND)
 * 
 * 2. L'Imprimerie / Bilel (Tirage Vinyle & Plastification)
 *    - Both Cadre & Panneau: (W * H * 16)               (Area in meters² * 16 TND)
 */

export const STANDARD_SIZES_M = {
  A4: { w: 0.21, h: 0.297, label: "A4", sub: "21×29.7 cm" },
  A3: { w: 0.30, h: 0.42,  label: "A3", sub: "30×42 cm" },
  A2: { w: 0.42, h: 0.594, label: "A2", sub: "42×59.4 cm" },
  A1: { w: 0.594, h: 0.841, label: "A1", sub: "59.4×84.1 cm" },
  A0: { w: 0.841, h: 1.189, label: "A0", sub: "84.1×118.9 cm" }
};

/**
 * Robust High-Resolution Artwork URL resolver with full fallback support
 */
export function resolveOrderImageUrl(order) {
  if (!order) return null;

  // Root level order properties
  if (order.customAssetUrl && typeof order.customAssetUrl === "string" && order.customAssetUrl.trim()) {
    return order.customAssetUrl.trim();
  }
  if (order.custom_image && typeof order.custom_image === "string" && order.custom_image.trim()) {
    return order.custom_image.trim();
  }
  if (order.custom_image_url && typeof order.custom_image_url === "string" && order.custom_image_url.trim()) {
    return order.custom_image_url.trim();
  }
  if (order.image_url && typeof order.image_url === "string" && order.image_url.trim()) {
    return order.image_url.trim();
  }
  if (order.assetUrl && typeof order.assetUrl === "string" && order.assetUrl.trim()) {
    return order.assetUrl.trim();
  }

  // Nested item level fallbacks
  if (Array.isArray(order.items) && order.items.length > 0) {
    for (const item of order.items) {
      if (!item) continue;
      const candidate =
        item.custom_image_url ||
        item.custom_image ||
        item.assetUrl ||
        item.customAssetUrl ||
        item.image ||
        (Array.isArray(item.images) && item.images[0]) ||
        item.imageUrl;

      if (candidate && typeof candidate === "string" && candidate.trim()) {
        return candidate.trim();
      }
    }
  }

  return null;
}

/**
 * Parse dimensions in meters for any given item
 */
export function parseItemDimensions(item) {
  if (!item) return { w: 0.30, h: 0.42, label: "A3" };

  // 1. Direct width_cm / height_cm metadata
  const meta = item.custom_metadata || {};
  const widthCm = Number(meta.width_cm || item.width_cm || item.widthCm);
  const heightCm = Number(meta.height_cm || item.height_cm || item.heightCm);

  if (widthCm > 0 && heightCm > 0) {
    return {
      w: widthCm / 100,
      h: heightCm / 100,
      label: `${widthCm}×${heightCm} cm`
    };
  }

  // 2. Standard format keys (A4, A3, A2, A1, A0)
  const dimStr = String(item.dimension || item.selected_dimension || item.format || "").toUpperCase().trim();
  const matchedKey = Object.keys(STANDARD_SIZES_M).find((k) => dimStr.includes(k));
  if (matchedKey) {
    const std = STANDARD_SIZES_M[matchedKey];
    return { w: std.w, h: std.h, label: std.label };
  }

  // 3. Regex parser from dimensionDetails (e.g. "30 x 42 cm", "0,23 x 0,42", "50x70")
  const details = String(item.dimensionDetails || item.dimension || "");
  const numMatches = details.replace(/,/g, ".").match(/(\d+(?:\.\d+)?)\s*[xX*×]\s*(\d+(?:\.\d+)?)/);
  if (numMatches) {
    let wVal = parseFloat(numMatches[1]);
    let hVal = parseFloat(numMatches[2]);
    // If numbers are > 5, they are in centimeters; if <= 5, in meters
    const w = wVal > 5 ? wVal / 100 : wVal;
    const h = hVal > 5 ? hVal / 100 : hVal;
    if (w > 0 && h > 0) {
      return { w, h, label: `${Math.round(w * 100)}×${Math.round(h * 100)} cm` };
    }
  }

  // Safe fallback to A3 standard
  return { w: 0.30, h: 0.42, label: "A3" };
}

/**
 * Determine whether an item is a framed print (Cadre) or simple MDF panel (Panneau Simple)
 */
export function isItemFramed(item, order = {}) {
  if (!item) return false;

  const type = String(item.selected_type || item.type || order.frame_option || "").toLowerCase();
  if (type.includes("cadre") || type.includes("frame")) return true;

  const cat = String(item.category || "").toLowerCase();
  if (cat.includes("cadre")) return true;

  const title = String(item.title || "").toLowerCase();
  if (title.includes("cadre") || title.includes("frame")) return true;

  const dim = String(item.dimension || item.dimensionDetails || "").toLowerCase();
  if (dim.includes(" c ") || dim.endsWith("c") || dim.includes("cadre")) return true;

  return false;
}

/**
 * Calculate costs for a single item for both vendors: Lotfi & L'Imprimerie
 */
export function calculateItemVendorCosts(item, order = {}) {
  const { w, h, label } = parseItemDimensions(item);
  const isCadre = isItemFramed(item, order);
  const qty = Math.max(1, Number(item.quantity) || 1);

  // Lotfi calculation:
  // Cadre: Perimeter (m) * 16 = (W + H) * 2 * 16
  // Panneau Simple: Area (m²) * 45 = W * H * 45
  const unitLotfiCost = isCadre
    ? (w + h) * 2 * 16
    : w * h * 45;

  // L'Imprimerie (Bilel) calculation:
  // Vinyl print area (m²) * 16 = W * H * 16
  const unitImprimerieCost = w * h * 16;

  const totalLotfiCost = unitLotfiCost * qty;
  const totalImprimerieCost = unitImprimerieCost * qty;
  const totalBaseCost = totalLotfiCost + totalImprimerieCost;

  return {
    dimensions: { w, h, label },
    isCadre,
    quantity: qty,
    unitLotfiCost: Number(unitLotfiCost.toFixed(2)),
    unitImprimerieCost: Number(unitImprimerieCost.toFixed(2)),
    lotfiCost: Number(totalLotfiCost.toFixed(2)),
    imprimerieCost: Number(totalImprimerieCost.toFixed(2)),
    totalVendorCost: Number(totalBaseCost.toFixed(2))
  };
}

/**
 * Calculate complete vendor costs and profit margins for an order
 */
export function calculateOrderVendorCosts(order) {
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    return {
      lotfiCost: 0,
      imprimerieCost: 0,
      totalVendorCost: 0,
      grossProfit: 0,
      itemCosts: []
    };
  }

  let totalLotfi = 0;
  let totalImprimerie = 0;
  const itemCosts = [];

  for (const item of order.items) {
    const calc = calculateItemVendorCosts(item, order);
    totalLotfi += calc.lotfiCost;
    totalImprimerie += calc.imprimerieCost;
    itemCosts.push(calc);
  }

  const totalVendor = totalLotfi + totalImprimerie;
  const totalOrderAmount = Number(order.totalAmount || order.total_amount || 0);
  const shippingFee = Number(order.shippingFee || order.shipping_fee || 0);
  // Revenue net of delivery fee:
  const productRevenue = Math.max(0, totalOrderAmount - shippingFee);
  const grossProfit = Number((productRevenue - totalVendor).toFixed(2));

  return {
    lotfiCost: Number(totalLotfi.toFixed(2)),
    imprimerieCost: Number(totalImprimerie.toFixed(2)),
    totalVendorCost: Number(totalVendor.toFixed(2)),
    grossProfit,
    itemCosts
  };
}

/**
 * Compute Vendor Ledger statistics & balances down to 0 TND
 */
export function calculateVendorLedgerTotals(orders = [], vendorPayments = []) {
  // Only count non-cancelled orders
  const activeOrders = orders.filter((o) => o.status !== "Cancelled");

  let lotfiDue = 0;
  let imprimerieDue = 0;

  activeOrders.forEach((ord) => {
    const { lotfiCost, imprimerieCost } = calculateOrderVendorCosts(ord);
    lotfiDue += lotfiCost;
    imprimerieDue += imprimerieCost;
  });

  // Calculate payments made
  let lotfiPaid = 0;
  let imprimeriePaid = 0;

  (vendorPayments || []).forEach((pay) => {
    const amount = Number(pay.amount) || 0;
    const v = String(pay.vendor || "").toLowerCase();
    if (v.includes("lotfi")) {
      lotfiPaid += amount;
    } else if (v.includes("imprimerie") || v.includes("bilel")) {
      imprimeriePaid += amount;
    }
  });

  const lotfiBalance = Math.max(0, Number((lotfiDue - lotfiPaid).toFixed(2)));
  const imprimerieBalance = Math.max(0, Number((imprimerieDue - imprimeriePaid).toFixed(2)));

  return {
    lotfi: {
      name: "Lotfi (Châssis MDF & Cadres)",
      shortName: "Lotfi",
      role: "Menuiserie, Cadres & Châssis",
      totalDue: Number(lotfiDue.toFixed(2)),
      totalPaid: Number(lotfiPaid.toFixed(2)),
      balance: lotfiBalance,
      isSettled: lotfiBalance <= 0.05
    },
    imprimerie: {
      name: "L'Imprimerie / Bilel (Tirages Vinyle)",
      shortName: "L'Imprimerie",
      role: "Impressions Vinyle HD & Finitions",
      totalDue: Number(imprimerieDue.toFixed(2)),
      totalPaid: Number(imprimeriePaid.toFixed(2)),
      balance: imprimerieBalance,
      isSettled: imprimerieBalance <= 0.05
    },
    combined: {
      totalDue: Number((lotfiDue + imprimerieDue).toFixed(2)),
      totalPaid: Number((lotfiPaid + imprimeriePaid).toFixed(2)),
      totalBalance: Number((lotfiBalance + imprimerieBalance).toFixed(2)),
      isSettled: (lotfiBalance + imprimerieBalance) <= 0.05
    }
  };
}

/**
 * Compute real-time dynamic Net Profit breakdown
 */
export function calculateNetProfitBreakdown({ orders = [], adSpend = {}, expenses = [] }) {
  const activeOrders = orders.filter((o) => o.status !== "Cancelled");
  const totalRevenue = activeOrders.reduce((sum, o) => sum + Number(o.totalAmount || o.total_amount || 0), 0);

  let lotfiTotalCost = 0;
  let imprimerieTotalCost = 0;

  activeOrders.forEach((ord) => {
    const { lotfiCost, imprimerieCost } = calculateOrderVendorCosts(ord);
    lotfiTotalCost += lotfiCost;
    imprimerieTotalCost += imprimerieCost;
  });

  const totalVendorCosts = lotfiTotalCost + imprimerieTotalCost;

  const totalAdSpend =
    Number(adSpend.facebook || 0) +
    Number(adSpend.instagram || 0) +
    Number(adSpend.tiktok || 0) +
    Number(adSpend.google || 0);

  const totalOpExpenses = (expenses || []).reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const totalExpenses = totalVendorCosts + totalAdSpend + totalOpExpenses;
  const netProfit = Number((totalRevenue - totalExpenses).toFixed(2));
  const netMargin = totalRevenue > 0 ? Number(((netProfit / totalRevenue) * 100).toFixed(1)) : 0;

  return {
    totalRevenue,
    lotfiTotalCost: Number(lotfiTotalCost.toFixed(2)),
    imprimerieTotalCost: Number(imprimerieTotalCost.toFixed(2)),
    totalVendorCosts: Number(totalVendorCosts.toFixed(2)),
    totalAdSpend,
    totalOpExpenses: Number(totalOpExpenses.toFixed(2)),
    totalExpenses: Number(totalExpenses.toFixed(2)),
    netProfit,
    netMargin
  };
}