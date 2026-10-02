import React from "react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, 
  FolderTree, 
  DollarSign, 
  ShoppingBag, 
  Sparkles, 
  X,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const category = toast.category || "system";

          // Accent colors & icons based on event category
          let borderStyle = "border-slate-700 text-slate-200";
          let bgGradient = "from-slate-900 via-slate-900 to-slate-950";
          let IconComponent = Sparkles;
          let iconColor = "text-slate-400";

          if (category === "product") {
            borderStyle = "border-cyan-500/50 text-cyan-200";
            bgGradient = "from-cyan-950/90 via-slate-900 to-slate-950";
            IconComponent = Layers;
            iconColor = "text-cyan-400";
          } else if (category === "category") {
            borderStyle = "border-purple-500/50 text-purple-200";
            bgGradient = "from-purple-950/90 via-slate-900 to-slate-950";
            IconComponent = FolderTree;
            iconColor = "text-purple-400";
          } else if (category === "adspend") {
            borderStyle = "border-amber-500/50 text-amber-200";
            bgGradient = "from-amber-950/90 via-slate-900 to-slate-950";
            IconComponent = DollarSign;
            iconColor = "text-amber-400";
          } else if (category === "order") {
            borderStyle = "border-emerald-500/50 text-emerald-200";
            bgGradient = "from-emerald-950/90 via-slate-900 to-slate-950";
            IconComponent = ShoppingBag;
            iconColor = "text-emerald-400";
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto flex items-center gap-3.5 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl bg-gradient-to-r ${bgGradient} ${borderStyle}`}
            >
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 shrink-0">
                <IconComponent className={`w-4 h-4 ${iconColor}`} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-white leading-snug">
                  {toast.message}
                </p>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                  {category} event
                </span>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
