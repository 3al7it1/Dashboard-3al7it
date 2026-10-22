import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  CATEGORIES_TREE,
  INITIAL_AD_SPEND,
  INITIAL_CMS_CONFIG,
  INITIAL_VENDOR_PAYMENTS,
  INITIAL_OPERATIONAL_EXPENSES
} from "../data/mockData";

// Helper for LocalStorage fallback
const getLS = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.warn(`LocalStorage read error for ${key}:`, e);
    return defaultVal;
  }
};

const setLS = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn(`LocalStorage write error for ${key}:`, e);
  }
};

// ----------------------------------------------------------------------
// PRODUCTS DB SERVICE
// ----------------------------------------------------------------------
export const getProducts = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        // Map database columns to app model
        const mapped = data.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category,
          subcategory: p.subcategory,
          nestedSport: p.nested_sport || p.discipline,
          discipline: p.discipline || p.nested_sport,
          images: p.images || [],
          imagesCadre: p.images_cadre || p.imagesCadre || p.images || [],
          imagesPanneau: p.images_panneau || p.imagesPanneau || [],
          videoUrl: p.video_url || "",
          pixelDimensions: p.pixel_dimensions || "1200x1600px",
          pricingMatrixCadre: p.pricing_matrix_cadre || p.pricingMatrixCadre || p.pricing_matrix || { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
          pricingMatrixSimple: p.pricing_matrix_simple || p.pricingMatrixSimple || { A4: 35, A3: 55, A2: 85, A1: 130, A0: 190 },
          pricingMatrix: p.pricing_matrix || p.pricingMatrixCadre || { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
          status: p.status || "Active",
          basePrice: p.base_price || 55,
          stock: p.stock ?? 20,
          salesCount: p.sales_count || 0
        }));
        setLS("td_admin_products", mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase getProducts error, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback with auto-migration to ensure dual pricing & image arrays exist
  const stored = getLS("td_admin_products", null);
  if (!stored || stored.length === 0) {
    setLS("td_admin_products", INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }

  // Ensure all existing items have dual pricing matrices and dual image slots
  const enriched = stored.map((p) => ({
    ...p,
    pricingMatrixCadre: p.pricingMatrixCadre || p.pricingMatrix || { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    pricingMatrixSimple: p.pricingMatrixSimple || { A4: 35, A3: 55, A2: 85, A1: 130, A0: 190 },
    imagesCadre: p.imagesCadre || p.images || [],
    imagesPanneau: p.imagesPanneau || [],
    images: p.images || (p.imagesCadre && p.imagesCadre.length > 0 ? p.imagesCadre : [])
  }));
  return enriched;
};

export const createProductDB = async (productData) => {
  const newId = `PRD-${Date.now().toString().slice(-4)}`;
  const productPayload = {
    ...productData,
    id: newId,
    salesCount: 0,
    stock: productData.stock ?? 20,
    pricingMatrixCadre: productData.pricingMatrixCadre || { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    pricingMatrixSimple: productData.pricingMatrixSimple || { A4: 35, A3: 55, A2: 85, A1: 130, A0: 190 },
    pricingMatrix: productData.pricingMatrixCadre || productData.pricingMatrix || { A4: 50, A3: 75, A2: 110, A1: 165, A0: 240 },
    imagesCadre: productData.imagesCadre || [],
    imagesPanneau: productData.imagesPanneau || [],
    images: (productData.images && productData.images.length > 0)
      ? productData.images
      : [...(productData.imagesCadre || []), ...(productData.imagesPanneau || [])]
  };

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("products").insert([
        {
          id: newId,
          title: productData.title,
          description: productData.description,
          category: productData.category,
          subcategory: productData.subcategory,
          discipline: productData.discipline || productData.nestedSport || null,
          nested_sport: productData.discipline || productData.nestedSport || null,
          images: productPayload.images,
          video_url: productData.videoUrl,
          pixel_dimensions: "1200x1600px",
          pricing_matrix: productPayload.pricingMatrixCadre,
          status: productData.status || "Active",
          base_price: productData.basePrice || 55,
          stock: productData.stock || 20,
          sales_count: 0
        }
      ]);
      if (error) console.warn("Supabase product insert error:", error);
    } catch (e) {
      console.warn("Supabase product insert exception:", e);
    }
  }

  // Update LocalStorage
  const existing = getLS("td_admin_products", INITIAL_PRODUCTS);
  const updated = [productPayload, ...existing];
  setLS("td_admin_products", updated);
  return productPayload;
};

export const updateProductDB = async (id, updatedFields) => {
  if (isSupabaseConfigured()) {
    try {
      const dbPayload = {};
      if (updatedFields.title !== undefined) dbPayload.title = updatedFields.title;
      if (updatedFields.description !== undefined) dbPayload.description = updatedFields.description;
      if (updatedFields.category !== undefined) dbPayload.category = updatedFields.category;
      if (updatedFields.subcategory !== undefined) dbPayload.subcategory = updatedFields.subcategory;
      if (updatedFields.discipline !== undefined || updatedFields.nestedSport !== undefined) {
        dbPayload.discipline = updatedFields.discipline || updatedFields.nestedSport;
        dbPayload.nested_sport = updatedFields.discipline || updatedFields.nestedSport;
      }
      if (updatedFields.images !== undefined) dbPayload.images = updatedFields.images;
      if (updatedFields.videoUrl !== undefined) dbPayload.video_url = updatedFields.videoUrl;
      if (updatedFields.pricingMatrixCadre !== undefined) dbPayload.pricing_matrix = updatedFields.pricingMatrixCadre;
      else if (updatedFields.pricingMatrix !== undefined) dbPayload.pricing_matrix = updatedFields.pricingMatrix;
      if (updatedFields.status !== undefined) dbPayload.status = updatedFields.status;
      if (updatedFields.basePrice !== undefined) dbPayload.base_price = updatedFields.basePrice;
      if (updatedFields.stock !== undefined) dbPayload.stock = updatedFields.stock;

      await supabase.from("products").update(dbPayload).eq("id", id);
    } catch (e) {
      console.warn("Supabase updateProduct error:", e);
    }
  }

  const existing = getLS("td_admin_products", INITIAL_PRODUCTS);
  const updated = existing.map((p) => {
    if (p.id === id) {
      const merged = { ...p, ...updatedFields };
      if (updatedFields.imagesCadre || updatedFields.imagesPanneau) {
        merged.images = (updatedFields.images && updatedFields.images.length > 0)
          ? updatedFields.images
          : [...(merged.imagesCadre || []), ...(merged.imagesPanneau || [])];
      }
      return merged;
    }
    return p;
  });
  setLS("td_admin_products", updated);
  return updated;
};

export const deleteProductDB = async (id) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("products").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase deleteProduct error:", e);
    }
  }

  const existing = getLS("td_admin_products", INITIAL_PRODUCTS);
  const updated = existing.filter((p) => p.id !== id);
  setLS("td_admin_products", updated);
  return updated;
};

// ----------------------------------------------------------------------
// ORDERS DB SERVICE
// ----------------------------------------------------------------------
export const getOrders = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map((o) => {
          const resolvedImg = o.custom_asset_url || o.custom_image || o.custom_image_url || o.image_url || 
            (Array.isArray(o.items) && (o.items.find(i => i.custom_image_url || i.custom_image || i.assetUrl)?.custom_image_url || o.items.find(i => i.custom_image_url || i.custom_image || i.assetUrl)?.custom_image || o.items[0]?.image)) || null;

          return {
            id: o.id,
            customerName: o.customer_name || o.full_name || "Client",
            phone: o.phone || o.customer_phone || "",
            address: o.address || o.customer_address || "",
            governorate: o.governorate || o.gouvernorate || "Tunis",
            postalCode: o.postal_code || "",
            status: o.status || "Pending",
            paymentMethod: o.payment_method || "Cash on Delivery",
            isPaid: Boolean(o.is_paid),
            shippingFee: Number(o.shipping_fee) || 7,
            items: o.items || [],
            totalAmount: Number(o.total_amount) || 0,
            totalPanels: o.total_panels || (Array.isArray(o.items) ? o.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1),
            customAssetUrl: resolvedImg,
            custom_image: resolvedImg,
            custom_image_url: resolvedImg,
            image_url: resolvedImg,
            notes: o.notes || "",
            createdAt: o.created_at || new Date().toISOString()
          };
        });
        setLS("td_admin_orders", mapped);
        return mapped;
      }
    } catch (e) {
      console.warn("Supabase getOrders error:", e);
    }
  }

  const storedOrders = getLS("td_admin_orders", null);
  if (!storedOrders || storedOrders.length === 0) {
    setLS("td_admin_orders", INITIAL_ORDERS);
    return INITIAL_ORDERS;
  }
  return storedOrders;
};

export const updateOrderStatusDB = async (orderId, newStatus) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    } catch (e) {
      console.warn("Supabase updateOrderStatus error:", e);
    }
  }

  const existing = getLS("td_admin_orders", INITIAL_ORDERS);
  const updated = existing.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
  setLS("td_admin_orders", updated);
  return updated;
};

export const deleteOrderDB = async (orderId) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("orders").delete().eq("id", orderId);
    } catch (e) {
      console.warn("Supabase deleteOrder error:", e);
    }
  }

  const existing = getLS("td_admin_orders", INITIAL_ORDERS);
  const updated = existing.filter((o) => o.id !== orderId);
  setLS("td_admin_orders", updated);
  return updated;
};

// ----------------------------------------------------------------------
// CATEGORIES DB SERVICE
// ----------------------------------------------------------------------
export const getCategories = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error && data && data.length > 0) {
        const mapped = data.map((c) => ({
          id: c.id,
          name: c.name,
          nameEn: c.name_en,
          slug: c.slug,
          icon: c.icon,
          subcategories: c.subcategories || []
        }));
        setLS("td_admin_categories", mapped);
        return mapped;
      }
    } catch (e) {
      console.warn("Supabase getCategories error:", e);
    }
  }

  return getLS("td_admin_categories", CATEGORIES_TREE);
};

export const saveCategoriesDB = async (categoriesList) => {
  if (isSupabaseConfigured()) {
    try {
      // Upsert all categories
      const rows = categoriesList.map((c) => ({
        id: c.id,
        name: c.name,
        name_en: c.nameEn,
        slug: c.slug,
        icon: c.icon,
        subcategories: c.subcategories
      }));
      await supabase.from("categories").upsert(rows);
    } catch (e) {
      console.warn("Supabase saveCategories error:", e);
    }
  }

  setLS("td_admin_categories", categoriesList);
};

// ----------------------------------------------------------------------
// AD SPEND & METRICS SERVICE
// ----------------------------------------------------------------------
export const getAdSpend = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("ad_spend").select("*").eq("id", "current_spend").single();
      if (!error && data) {
        const mapped = {
          facebook: data.facebook,
          instagram: data.instagram,
          tiktok: data.tiktok,
          google: data.google,
          cogsPercentage: data.cogs_percentage
        };
        setLS("td_admin_adspend", mapped);
        return mapped;
      }
    } catch (e) {
      console.warn("Supabase getAdSpend error:", e);
    }
  }

  return getLS("td_admin_adspend", INITIAL_AD_SPEND);
};

export const saveAdSpendDB = async (adSpendObj) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("ad_spend").upsert([
        {
          id: "current_spend",
          facebook: adSpendObj.facebook,
          instagram: adSpendObj.instagram,
          tiktok: adSpendObj.tiktok,
          google: adSpendObj.google,
          cogs_percentage: adSpendObj.cogsPercentage
        }
      ]);
    } catch (e) {
      console.warn("Supabase saveAdSpend error:", e);
    }
  }

  setLS("td_admin_adspend", adSpendObj);
};

// ----------------------------------------------------------------------
// CMS CONFIG SERVICE
// ----------------------------------------------------------------------
export const getCmsConfig = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("cms_config").select("*").eq("id", "current_cms").single();
      if (!error && data) {
        const mapped = {
          heroMode: data.hero_mode,
          videoUrl: data.video_url,
          carouselImages: data.carousel_images || [],
          headline: data.headline,
          headlineEn: data.headline_en,
          subtitle: data.subtitle,
          subtitleEn: data.subtitle_en,
          ctaText: data.cta_text,
          ctaTargetUrl: data.cta_target_url,
          badgeText: data.badge_text,
          announcementText: data.announcement_text,
          announcementActive: data.announcement_active
        };
        setLS("td_admin_cms", mapped);
        return mapped;
      }
    } catch (e) {
      console.warn("Supabase getCmsConfig error:", e);
    }
  }

  return getLS("td_admin_cms", INITIAL_CMS_CONFIG);
};

export const saveCmsConfigDB = async (cmsObj) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("cms_config").upsert([
        {
          id: "current_cms",
          hero_mode: cmsObj.heroMode,
          video_url: cmsObj.videoUrl,
          carousel_images: cmsObj.carouselImages,
          headline: cmsObj.headline,
          headline_en: cmsObj.headlineEn,
          subtitle: cmsObj.subtitle,
          subtitle_en: cmsObj.subtitleEn,
          cta_text: cmsObj.ctaText,
          cta_target_url: cmsObj.ctaTargetUrl,
          badge_text: cmsObj.badgeText,
          announcement_text: cmsObj.announcementText,
          announcement_active: cmsObj.announcementActive
        }
      ]);
    } catch (e) {
      console.warn("Supabase saveCmsConfig error:", e);
    }
  }

  setLS("td_admin_cms", cmsObj);
};

// ----------------------------------------------------------------------
// SEED INITIAL DATABASE / LOCALSTORAGE
// ----------------------------------------------------------------------
export const seedInitialDatabase = async () => {
  setLS("td_admin_products", INITIAL_PRODUCTS);
  setLS("td_admin_orders", INITIAL_ORDERS);
  setLS("td_admin_categories", CATEGORIES_TREE);
  setLS("td_admin_adspend", INITIAL_AD_SPEND);
  setLS("td_admin_cms", INITIAL_CMS_CONFIG);

  if (isSupabaseConfigured()) {
    try {
      // Seed products
      const prodRows = INITIAL_PRODUCTS.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        subcategory: p.subcategory,
        nested_sport: p.nestedSport,
        images: p.images,
        video_url: p.videoUrl,
        pixel_dimensions: "1200x1600px",
        pricing_matrix: p.pricingMatrix,
        status: p.status,
        base_price: p.basePrice,
        stock: p.stock,
        sales_count: p.salesCount
      }));
      await supabase.from("products").upsert(prodRows);

      // Seed orders
      const orderRows = INITIAL_ORDERS.map((o) => ({
        id: o.id,
        customer_name: o.customerName,
        phone: o.phone,
        address: o.address,
        governorate: o.governorate,
        postal_code: o.postalCode,
        status: o.status,
        payment_method: o.paymentMethod,
        is_paid: o.isPaid,
        shipping_fee: o.shippingFee,
        items: o.items,
        total_amount: o.totalAmount,
        total_panels: o.totalPanels,
        custom_asset_url: o.customAssetUrl,
        notes: o.notes,
        created_at: o.createdAt
      }));
      await supabase.from("orders").upsert(orderRows);

      // Seed categories
      const catRows = CATEGORIES_TREE.map((c) => ({
        id: c.id,
        name: c.name,
        name_en: c.nameEn,
        slug: c.slug,
        icon: c.icon,
        subcategories: c.subcategories
      }));
      await supabase.from("categories").upsert(catRows);

      // Seed ad spend & CMS
      await supabase.from("ad_spend").upsert([
        {
          id: "current_spend",
          facebook: INITIAL_AD_SPEND.facebook,
          instagram: INITIAL_AD_SPEND.instagram,
          tiktok: INITIAL_AD_SPEND.tiktok,
          google: INITIAL_AD_SPEND.google,
          cogs_percentage: INITIAL_AD_SPEND.cogsPercentage
        }
      ]);

      await supabase.from("cms_config").upsert([
        {
          id: "current_cms",
          hero_mode: INITIAL_CMS_CONFIG.heroMode,
          video_url: INITIAL_CMS_CONFIG.videoUrl,
          carousel_images: INITIAL_CMS_CONFIG.carouselImages,
          headline: INITIAL_CMS_CONFIG.headline,
          headline_en: INITIAL_CMS_CONFIG.headlineEn,
          subtitle: INITIAL_CMS_CONFIG.subtitle,
          subtitle_en: INITIAL_CMS_CONFIG.subtitleEn,
          cta_text: INITIAL_CMS_CONFIG.ctaText,
          cta_target_url: INITIAL_CMS_CONFIG.ctaTargetUrl,
          badge_text: INITIAL_CMS_CONFIG.badgeText,
          announcement_text: INITIAL_CMS_CONFIG.announcementText,
          announcement_active: INITIAL_CMS_CONFIG.announcementActive
        }
      ]);
    } catch (e) {
      console.warn("Supabase seedInitialDatabase error:", e);
    }
  }
};

// ----------------------------------------------------------------------
// VENDOR PAYMENTS SERVICE (LOTFI & L'IMPRIMERIE)
// ----------------------------------------------------------------------
export const getVendorPayments = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("vendor_payments")
        .select("*")
        .order("date", { ascending: false });

      if (!error && data && data.length > 0) {
        setLS("td_admin_vendor_payments", data);
        return data;
      }
    } catch (e) {
      // Supabase table may not exist yet, fallback gracefully to LocalStorage
    }
  }

  return getLS("td_admin_vendor_payments", INITIAL_VENDOR_PAYMENTS);
};

export const saveVendorPaymentsDB = async (paymentsList) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("vendor_payments").upsert(paymentsList);
    } catch (e) {}
  }
  setLS("td_admin_vendor_payments", paymentsList);
};

export const addVendorPaymentDB = async (payment) => {
  const existing = getLS("td_admin_vendor_payments", INITIAL_VENDOR_PAYMENTS);
  const updated = [payment, ...existing];
  await saveVendorPaymentsDB(updated);
  return updated;
};

export const deleteVendorPaymentDB = async (paymentId) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("vendor_payments").delete().eq("id", paymentId);
    } catch (e) {}
  }
  const existing = getLS("td_admin_vendor_payments", INITIAL_VENDOR_PAYMENTS);
  const updated = existing.filter((p) => p.id !== paymentId);
  setLS("td_admin_vendor_payments", updated);
  return updated;
};

// ----------------------------------------------------------------------
// OPERATIONAL EXPENSES SERVICE
// ----------------------------------------------------------------------
export const getOperationalExpenses = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("operational_expenses")
        .select("*")
        .order("date", { ascending: false });

      if (!error && data && data.length > 0) {
        setLS("td_admin_expenses", data);
        return data;
      }
    } catch (e) {}
  }

  return getLS("td_admin_expenses", INITIAL_OPERATIONAL_EXPENSES);
};

export const saveOperationalExpensesDB = async (expensesList) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("operational_expenses").upsert(expensesList);
    } catch (e) {}
  }
  setLS("td_admin_expenses", expensesList);
};

export const addOperationalExpenseDB = async (expense) => {
  const existing = getLS("td_admin_expenses", INITIAL_OPERATIONAL_EXPENSES);
  const updated = [expense, ...existing];
  await saveOperationalExpensesDB(updated);
  return updated;
};

export const deleteOperationalExpenseDB = async (expenseId) => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("operational_expenses").delete().eq("id", expenseId);
    } catch (e) {}
  }
  const existing = getLS("td_admin_expenses", INITIAL_OPERATIONAL_EXPENSES);
  const updated = existing.filter((e) => e.id !== expenseId);
  setLS("td_admin_expenses", updated);
  return updated;
};
