import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { TUNISIAN_GOVERNORATES } from "../../data/mockData";
import { 
  X, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Phone, 
  User, 
  MapPin, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const ExpressCheckoutModal = () => {
  const { 
    lang, 
    isExpressOrderModalOpen, 
    setIsExpressOrderModalOpen, 
    expressCheckoutItem, 
    setExpressCheckoutItem,
    cart, 
    clearCart, 
    addOrder 
  } = useApp();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    governorate: "Tunis",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [errors, setErrors] = useState({});

  if (!isExpressOrderModalOpen) return null;

  // Determine line items: either single express item, or all cart items
  const items = expressCheckoutItem
    ? [expressCheckoutItem]
    : cart.map((i) => ({
        productId: i.productId,
        title: i.title,
        finish: i.finish,
        dimension: i.dimension,
        unitPrice: i.unitPrice,
        quantity: i.quantity || 1,
        image: i.image,
        customImage: i.customImage
      }));

  const subtotal = items.reduce((acc, curr) => acc + (curr.unitPrice * (curr.quantity || 1)), 0);
  const FREE_SHIPPING_THRESHOLD = 120;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 7;
  const totalAmount = subtotal + shippingFee;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = lang === "fr" ? "Veuillez saisir votre nom et prénom." : "Full name is required.";
    }
    const phoneClean = formData.phone.replace(/\s+/g, "");
    if (!phoneClean || !/^[2459]\d{7}$/.test(phoneClean)) {
      errs.phone = lang === "fr" 
        ? "Numéro de téléphone tunisien valide requis (8 chiffres, ex: 98 123 456)." 
        : "Valid 8-digit Tunisian phone number required.";
    }
    if (!formData.address.trim()) {
      errs.address = lang === "fr" ? "Adresse complète de livraison requise." : "Delivery address is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const orderId = `CMD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newOrderPayload = {
        id: orderId,
        customerName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        governorate: formData.governorate,
        totalAmount,
        status: "Pending",
        items: items.map((it) => ({
          title: it.title,
          finish: it.finish || "Avec Cadre",
          dimension: it.dimension || "A3",
          quantity: it.quantity || 1,
          price: it.unitPrice,
          total: it.unitPrice * (it.quantity || 1),
          image: it.image || it.customImage || null,
          custom_image: it.customImage || null
        })),
        custom_image: items.find((i) => i.customImage)?.customImage || null,
        notes: formData.notes.trim(),
        createdAt: new Date().toISOString()
      };

      await addOrder(newOrderPayload);

      // Clear cart if this was a cart checkout
      if (!expressCheckoutItem) {
        clearCart();
      }

      setCreatedOrder(newOrderPayload);
    } catch (err) {
      console.error("Order submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsExpressOrderModalOpen(false);
    setExpressCheckoutItem(null);
    setCreatedOrder(null);
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      governorate: "Tunis",
      notes: ""
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative my-auto max-h-[94vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600 fill-amber-100" />
            <div>
              <h3 className="font-black text-lg text-stone-900 font-['Outfit',sans-serif]">
                {createdOrder 
                  ? (lang === "fr" ? "Commande Validée avec Succès !" : "Order Confirmed Successfully!")
                  : (lang === "fr" ? "Formulaire de Commande Express" : "Instant Express Checkout")}
              </h3>
              <p className="text-xs text-stone-500">
                {lang === "fr" ? "Paiement en espèces à la livraison" : "Cash on delivery anywhere in Tunisia"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {createdOrder ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black tracking-wider">
                  NUMÉRO DE COMMANDE : #{createdOrder.id}
                </span>
                <h4 className="text-2xl font-black text-stone-900 mt-3 font-['Outfit',sans-serif]">
                  {lang === "fr" ? "Merci pour votre confiance !" : "Thank you for your order!"}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                  {lang === "fr" 
                    ? `Votre commande #${createdOrder.id} a été enregistrée. Notre équipe vous contactera au ${createdOrder.phone} avant l'expédition.`
                    : `Your order #${createdOrder.id} has been registered. Our team will contact you at ${createdOrder.phone} before dispatch.`}
                </p>
              </div>

              {/* Order Recap Card */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left space-y-3 max-w-md mx-auto text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>{lang === "fr" ? "Client" : "Customer"} :</span>
                  <strong className="text-stone-900">{createdOrder.customerName}</strong>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>{lang === "fr" ? "Gouvernorat" : "Governorate"} :</span>
                  <strong className="text-stone-900">{createdOrder.governorate}</strong>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>{lang === "fr" ? "Adresse" : "Address"} :</span>
                  <span className="text-stone-900 font-medium text-right max-w-[200px] truncate">{createdOrder.address}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                  <span>{lang === "fr" ? "Total à Payer à la Livraison" : "Amount on Delivery"} :</span>
                  <span className="text-amber-700">{createdOrder.totalAmount} DNT</span>
                </div>
              </div>

              {/* Close / WhatsApp button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors"
                >
                  {lang === "fr" ? "Retour à la Galerie" : "Back to Gallery"}
                </button>
                <a
                  href={`https://wa.me/21650000000?text=Bonjour,%20je%20viens%20de%20passer%20la%20commande%20${createdOrder.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === "fr" ? "Suivi WhatsApp" : "WhatsApp Support"}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Order Input Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Items Breakdown Box */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  {lang === "fr" ? "Récapitulatif de votre sélection" : "Selected Items"}
                </p>
                <div className="divide-y divide-stone-200/60 max-h-44 overflow-y-auto pr-1">
                  {items.map((it, idx) => (
                    <div key={idx} className="py-2.5 flex items-center gap-3">
                      <img
                        src={it.image || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80"}
                        alt={it.title}
                        className="w-12 h-14 rounded-lg object-cover bg-stone-200 shrink-0 border border-stone-300"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{it.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-white text-stone-700 border border-stone-300">
                            {it.finish || "Avec Cadre"}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-amber-100 text-amber-900">
                            {it.dimension || "A3"}
                          </span>
                          <span className="text-[11px] text-stone-500 font-semibold">
                            × {it.quantity || 1}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-stone-900 shrink-0">
                        {it.unitPrice * (it.quantity || 1)} DNT
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal, Shipping, Total */}
                <div className="pt-2 border-t border-stone-200 text-xs space-y-1 text-stone-600">
                  <div className="flex justify-between">
                    <span>{lang === "fr" ? "Sous-total" : "Subtotal"}</span>
                    <span className="font-bold text-stone-900">{subtotal} DNT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "fr" ? "Livraison (24 gouvernorats)" : "Shipping (Tunisia)"}</span>
                    <span className="font-bold text-stone-900">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-black uppercase">
                          {lang === "fr" ? "Gratuit" : "Free"}
                        </span>
                      ) : (
                        `${shippingFee} DNT`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-stone-200 text-sm font-black text-stone-900">
                    <span>{lang === "fr" ? "Net à payer" : "Total Amount"}</span>
                    <span className="text-amber-700 text-base">{totalAmount} DNT</span>
                  </div>
                </div>
              </div>

              {/* Customer Delivery Fields */}
              <div className="space-y-4">
                {/* Nom & Prénom */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    {lang === "fr" ? "Nom & Prénom" : "Full Name"} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={lang === "fr" ? "ex: Mohamed Ben Ali" : "e.g. John Doe"}
                      className={`w-full pl-9 pr-4 py-2.5 text-xs bg-stone-50 border rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-amber-500/30 transition-all ${
                        errors.fullName ? "border-rose-400 bg-rose-50/20" : "border-stone-300"
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Numéro de Téléphone */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    {lang === "fr" ? "Numéro de Téléphone" : "Phone Number"} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="ex: 28 450 123 / 50 123 456"
                      className={`w-full pl-9 pr-4 py-2.5 text-xs bg-stone-50 border rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-amber-500/30 transition-all ${
                        errors.phone ? "border-rose-400 bg-rose-50/20" : "border-stone-300"
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    {lang === "fr" ? "Le livreur vous contactera sur ce numéro avant la livraison." : "Courier will call this number before arrival."}
                  </p>
                </div>

                {/* Gouvernorat */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    {lang === "fr" ? "Gouvernorat (24 Régions)" : "Governorate"} *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-amber-500/30 transition-all cursor-pointer"
                    >
                      {TUNISIAN_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Adresse Complète */}
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    {lang === "fr" ? "Adresse Complète de Livraison" : "Full Delivery Address"} *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={lang === "fr" ? "Rue, numéro maison/bâtiment, quartier, ville..." : "Street, building number, area..."}
                    className={`w-full p-3 text-xs bg-stone-50 border rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-amber-500/30 transition-all ${
                      errors.address ? "border-rose-400 bg-rose-50/20" : "border-stone-300"
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
                </div>

                {/* Remarques / Instructions */}
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">
                    {lang === "fr" ? "Remarques ou instructions de livraison (Optionnel)" : "Delivery Notes (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={lang === "fr" ? "ex: Appeler avant midi, livrer à l'étage..." : "e.g. Call before arrival..."}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>
                  {isSubmitting
                    ? (lang === "fr" ? "Validation en cours..." : "Processing...")
                    : (lang === "fr" 
                        ? `Confirmer la Commande (${totalAmount} DNT) →` 
                        : `Confirm Order (${totalAmount} DNT) →`)}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === "fr" ? "Paiement 100% sécurisé en espèces à la livraison" : "100% Cash on Delivery payment"}</span>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
