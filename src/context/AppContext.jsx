import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getProducts,
  createProductDB,
  updateProductDB,
  deleteProductDB,
  getOrders,
  updateOrderStatusDB,
  deleteOrderDB,
  getCategories,
  saveCategoriesDB,
  getAdSpend,
  saveAdSpendDB,
  getCmsConfig,
  saveCmsConfigDB,
  seedInitialDatabase
} from "../services/dbService";
import { isSupabaseConfigured } from "../lib/supabase";
import {
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  CATEGORIES_TREE,
  INITIAL_AD_SPEND,
  INITIAL_CMS_CONFIG,
  SAMPLE_DEMO_PRODUCTS,
  SAMPLE_DEMO_ORDERS
} from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language state
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("td_admin_lang") || "fr";
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("td_admin_lang", newLang);
  };

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("analytics");

  // Database Connection / Mode Status
  const [isDbConnected, setIsDbConnected] = useState(isSupabaseConfigured());
  const [isLoading, setIsLoading] = useState(true);

  // Core Entity States
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adSpend, setAdSpend] = useState(INITIAL_AD_SPEND);
  const [cmsConfig, setCmsConfig] = useState(INITIAL_CMS_CONFIG);

  // Smart Categorized Toast Notification System
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, category = "system", type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, category, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // INITIAL DATA SYNC & SEEDING ON MOUNT
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const [fetchedProducts, fetchedOrders, fetchedCategories, fetchedAdSpend, fetchedCms] =
          await Promise.all([
            getProducts(),
            getOrders(),
            getCategories(),
            getAdSpend(),
            getCmsConfig()
          ]);

        // If empty on first load, seed data automatically
        if (!fetchedProducts || fetchedProducts.length === 0) {
          await seedInitialDatabase();
          setProducts(INITIAL_PRODUCTS);
          setOrders(INITIAL_ORDERS);
          setCategories(CATEGORIES_TREE);
          setAdSpend(INITIAL_AD_SPEND);
          setCmsConfig(INITIAL_CMS_CONFIG);
        } else {
          setProducts(fetchedProducts);
          setOrders(fetchedOrders);
          setCategories(fetchedCategories);
          setAdSpend(fetchedAdSpend);
          setCmsConfig(fetchedCms);
        }
      } catch (err) {
        console.warn("Data initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // ORDER ACTIONS
  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );

    await updateOrderStatusDB(orderId, newStatus);

    const msg = lang === "fr" 
      ? `Commande #${orderId} mise à jour : Statut "${newStatus}"`
      : `Order #${orderId} updated to status "${newStatus}"`;
    addToast(msg, "order", "success");
  };

  const deleteOrder = async (orderId) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    await deleteOrderDB(orderId);

    const msg = lang === "fr" ? `Commande #${orderId} supprimée.` : `Order #${orderId} deleted.`;
    addToast(msg, "order", "warning");
  };

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    const msg = lang === "fr" ? `Nouvelle commande enregistrée : #${newOrder.id}` : `New order recorded: #${newOrder.id}`;
    addToast(msg, "order", "success");
  };

  // PRODUCT ACTIONS (REACTIVE & PERSISTENT)
  const addProduct = async (productData) => {
    const createdProduct = await createProductDB(productData);

    setProducts((prev) => [createdProduct, ...prev.filter((p) => p.id !== createdProduct.id)]);

    const msg = lang === "fr" 
      ? `Tableau "${productData.title}" créé avec succès (${createdProduct.id})`
      : `Panel "${productData.title}" created successfully (${createdProduct.id})`;
    addToast(msg, "product", "success");
    return createdProduct;
  };

  const updateProduct = async (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    await updateProductDB(id, updatedFields);

    const msg = lang === "fr" ? `Produit ${id} mis à jour.` : `Product ${id} updated.`;
    addToast(msg, "product", "info");
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await deleteProductDB(id);

    const msg = lang === "fr" ? `Produit ${id} archivé / supprimé.` : `Product ${id} archived / deleted.`;
    addToast(msg, "product", "warning");
  };

  const toggleProductStatus = async (id) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    const nextStatus = target.status === "Active" ? "Draft" : "Active";
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
    );

    await updateProductDB(id, { status: nextStatus });
    addToast(
      lang === "fr" ? `Statut produit ${id} changé en ${nextStatus}` : `Product ${id} status changed to ${nextStatus}`,
      "product",
      "info"
    );
  };

  // CATEGORY ACTIONS
  const addCategory = async (categoryData) => {
    const id = `cat-${Date.now()}`;
    const newCat = {
      id,
      ...categoryData,
      subcategories: categoryData.subcategories || []
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    await saveCategoriesDB(updated);

    const msg = lang === "fr" ? `Catégorie "${categoryData.name}" ajoutée.` : `Category "${categoryData.name}" added.`;
    addToast(msg, "category", "success");
  };

  const updateCategory = async (id, updatedFields) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    setCategories(updated);
    await saveCategoriesDB(updated);

    const msg = lang === "fr" ? `Hiérarchie catégorie mise à jour.` : `Category hierarchy updated.`;
    addToast(msg, "category", "info");
  };

  const deleteCategory = async (id) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    await saveCategoriesDB(updated);

    const msg = lang === "fr" ? `Catégorie supprimée.` : `Category deleted.`;
    addToast(msg, "category", "warning");
  };

  const reorderCategories = async (newOrderList) => {
    setCategories(newOrderList);
    await saveCategoriesDB(newOrderList);

    const msg = lang === "fr" ? `Nouvel ordre des catégories sauvegardé.` : `New category order saved.`;
    addToast(msg, "category", "info");
  };

  // AD SPEND ACTIONS (REACTIVE ROAS/CAC LOGGING)
  const updateAdSpend = async (fields, platformName = null) => {
    const updated = { ...adSpend, ...fields };
    setAdSpend(updated);
    await saveAdSpendDB(updated);

    const spendMsg = platformName 
      ? `Budget ${platformName} actualisé : ${fields[platformName.toLowerCase()] || 0} DNT (ROAS recalculé)`
      : `Budgets pub & COGS actualisés avec succès !`;
    addToast(spendMsg, "adspend", "success");
  };

  // CMS ACTIONS
  const updateCmsConfig = async (fields) => {
    const updated = { ...cmsConfig, ...fields };
    setCmsConfig(updated);
    await saveCmsConfigDB(updated);

    const msg = lang === "fr" ? `Bannières & configuration Hero enregistrées !` : `Hero banners & CMS config saved!`;
    addToast(msg, "system", "success");
  };

  // RE-INJECT SAMPLE DEMO DATA FOR TESTING
  const resetDemoData = async () => {
    setOrders(SAMPLE_DEMO_ORDERS);
    setProducts(SAMPLE_DEMO_PRODUCTS);
    setCategories(CATEGORIES_TREE);
    setAdSpend({ facebook: 1100, instagram: 650, tiktok: 450, google: 200, cogsPercentage: 35 });
    setCmsConfig(INITIAL_CMS_CONFIG);

    localStorage.setItem("td_admin_products", JSON.stringify(SAMPLE_DEMO_PRODUCTS));
    localStorage.setItem("td_admin_orders", JSON.stringify(SAMPLE_DEMO_ORDERS));
    localStorage.setItem("td_admin_adspend", JSON.stringify({ facebook: 1100, instagram: 650, tiktok: 450, google: 200, cogsPercentage: 35 }));

    addToast(lang === "fr" ? "Données de démonstration réinjectées !" : "Demo data re-injected!", "system", "info");
  };

  // PURGE DATA CLEAN SLATE FOR OFFICIAL PRODUCTION LAUNCH
  const purgeDataCleanSlate = async () => {
    setOrders([]);
    setProducts([]);
    setCategories(CATEGORIES_TREE);
    const zeroAdSpend = { facebook: 0, instagram: 0, tiktok: 0, google: 0, cogsPercentage: 35 };
    setAdSpend(zeroAdSpend);
    
    localStorage.setItem("td_admin_products", JSON.stringify([]));
    localStorage.setItem("td_admin_orders", JSON.stringify([]));
    localStorage.setItem("td_admin_adspend", JSON.stringify(zeroAdSpend));

    await saveAdSpendDB(zeroAdSpend);

    addToast(
      lang === "fr" ? "Base de données intégralement purgée ! Prêt pour le lancement officiel." : "Database purged clean! Ready for production launch.",
      "system",
      "warning"
    );
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        activeTab,
        setActiveTab,
        isDbConnected,
        isLoading,
        orders,
        products,
        categories,
        adSpend,
        cmsConfig,
        toasts,
        addToast,
        removeToast,
        updateOrderStatus,
        deleteOrder,
        addOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,
        updateAdSpend,
        updateCmsConfig,
        resetDemoData,
        purgeDataCleanSlate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
