import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  CATEGORIES_TREE,
  INITIAL_AD_SPEND,
  INITIAL_CMS_CONFIG
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
          nestedSport: p.nested_sport,
          images: p.images || [],
          videoUrl: p.video_url || "",
          pixelDimensions: p.pixel_dimensions || "1200x1600px",
          pricingMatrix: p.pricing_matrix || { A4: 45, A3: 65, A2: 95, A1: 145, A0: 220 },
          status: p.status || "Active",
          basePrice: p.base_price || 65,
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

  // LocalStorage Fallback
  return getLS("td_admin_products", INITIAL_PRODUCTS);
};

export const createProductDB = async (productData) => {
  const newId = `PRD-${Date.now().toString().slice(-4)}`;
  const productPayload = {
    ...productData,
    id: newId,
    salesCount: 0,
    stock: productData.stock ?? 20
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
          nested_sport: productData.nestedSport,
          images: productData.images,
          video_url: productData.videoUrl,
          pixel_dimensions: "1200x1600px",
          pricing_matrix: productData.pricingMatrix,
          status: productData.status || "Active",
          base_price: productData.basePrice || 65,
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
      if (updatedFields.nestedSport !== undefined) dbPayload.nested_sport = updatedFields.nestedSport;
      if (updatedFields.images !== undefined) dbPayload.images = updatedFields.images;
      if (updatedFields.videoUrl !== undefined) dbPayload.video_url = updatedFields.videoUrl;
      if (updatedFields.pricingMatrix !== undefined) dbPayload.pricing_matrix = updatedFields.pricingMatrix;
      if (updatedFields.status !== undefined) dbPayload.status = updatedFields.status;
      if (updatedFields.basePrice !== undefined) dbPayload.base_price = updatedFields.basePrice;
      if (updatedFields.stock !== undefined) dbPayload.stock = updatedFields.stock;

      await supabase.from("products").update(dbPayload).eq("id", id);
    } catch (e) {
      console.warn("Supabase updateProduct error:", e);
    }
  }

  const existing = getLS("td_admin_products", INITIAL_PRODUCTS);
  const updated = existing.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
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
        const mapped = data.map((o) => ({
          id: o.id,
          customerName: o.customer_name,
          phone: o.phone,
          address: o.address,
          governorate: o.governorate,
          postalCode: o.postal_code,
          status: o.status,
          paymentMethod: o.payment_method,
          isPaid: o.is_paid,
          shippingFee: o.shipping_fee,
          items: o.items || [],
          totalAmount: o.total_amount,
          totalPanels: o.total_panels,
          customAssetUrl: o.custom_asset_url,
          notes: o.notes,
          createdAt: o.created_at
        }));
        setLS("td_admin_orders", mapped);
        return mapped;
      }
    } catch (e) {
      console.warn("Supabase getOrders error:", e);
    }
  }

  return getLS("td_admin_orders", INITIAL_ORDERS);
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
