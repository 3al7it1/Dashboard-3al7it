import React from "react";
import { useApp } from "../../context/AppContext";
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Zap, 
  CheckCircle2 
} from "lucide-react";

export const CartDrawer = () => {
  const { 
    lang, 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartItemQty, 
    removeFromCart, 
    clearCart,
    setExpressCheckoutItem,
    setIsExpressOrderModalOpen 
  } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + (curr.unitPrice * (curr.quantity || 1)), 0);
  const FREE_SHIPPING_THRESHOLD = 120;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 7;
  const grandTotal = subtotal + shippingFee;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleCheckoutAll = () => {
    setIsCartOpen(false);
    // null expressCheckoutItem means checkout ALL items in cart
    setExpressCheckoutItem(null);
    setIsExpressOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h3 className="font-black text-lg text-stone-900 font-['Outfit',sans-serif]">
                {lang === "fr" ? "Mon Panier" : "Shopping Cart"}
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-amber-50/80 px-6 py-3 border-b border-amber-200/60">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                {subtotal >= FREE_SHIPPING_THRESHOLD
                  ? (lang === "fr" ? "🎉 Félicitations ! Livraison Gratuite activée" : "🎉 Free Shipping unlocked!")
                  : (lang === "fr" 
                      ? `Plus que ${FREE_SHIPPING_THRESHOLD - subtotal} DNT pour la livraison gratuite`
                      : `Add ${FREE_SHIPPING_THRESHOLD - subtotal} DNT more for free shipping`)}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/80 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-stone-800 text-base">
                    {lang === "fr" ? "Votre panier est vide" : "Your cart is empty"}
                  </p>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    {lang === "fr" 
                      ? "Explorez nos collections et découvrez nos finitions de prestige pour embellir vos murs." 
                      : "Explore our collection and discover luxury wall art finishes."}
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                >
                  {lang === "fr" ? "Continuer mes achats" : "Start Shopping"}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.key || item.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{item.title}</h4>
                    
                    {/* Finish & Dimension Badges */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                        {item.finish}
                      </span>
                      <span className="px-1.5 py-0.5 text-[10px] font-black rounded-md bg-amber-100 text-amber-900">
                        {item.dimension}
                      </span>
                    </div>

                    {/* Price and Quantity Adjuster */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-black text-stone-900">
                        {item.unitPrice * (item.quantity || 1)} DNT
                      </span>

                      <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                        <button
                          onClick={() => updateCartItemQty(item.key || item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-white transition-colors"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-black text-stone-800">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateCartItemQty(item.key || item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-white transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.key || item.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        title={lang === "fr" ? "Supprimer" : "Remove"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{lang === "fr" ? "Sous-total" : "Subtotal"}</span>
                  <span className="font-bold text-stone-900">{subtotal} DNT</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "fr" ? "Frais de livraison" : "Shipping"}</span>
                  <span className="font-bold text-stone-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-extrabold uppercase">
                        {lang === "fr" ? "Gratuit" : "Free"}
                      </span>
                    ) : (
                      `${shippingFee} DNT`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm">
                  <span className="font-black text-stone-900">
                    {lang === "fr" ? "Total TTC" : "Total"}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-stone-900">{grandTotal}</span>
                    <span className="text-xs font-black text-amber-700">DNT</span>
                  </div>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleCheckoutAll}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>
                  {lang === "fr" ? "Passer la Commande Express" : "Proceed to Express Checkout"}
                </span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  {lang === "fr" ? "Paiement à la livraison" : "Cash on delivery"}
                </span>
                <span>•</span>
                <span>{lang === "fr" ? "Colis vérifiable" : "Open & check on arrival"}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
