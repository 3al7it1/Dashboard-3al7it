import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Image as ImageIcon 
} from "lucide-react";

export const LightboxModal = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  title = "Aperçu Haute-Résolution", 
  subtitle = "", 
  orderId = "", 
  dimensions = "" 
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Reset zoom on open
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setIsCopied(false);
      setIsDownloading(false);
    }
  }, [isOpen, imageUrl]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : 1));
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy URL:", err);
    }
  };

  const handleDirectDownload = async () => {
    setIsDownloading(true);
    const cleanFileName = `3AL7IT_${orderId ? `CMD_${orderId}_` : ""}${dimensions ? `${dimensions.replace(/\s+/g, "_")}_` : ""}HD.png`;

    try {
      // Attempt blob download to preserve maximum resolution
      const response = await fetch(imageUrl, { mode: "cors" });
      if (!response.ok) throw new Error("CORS or network error");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = cleanFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback for cross-origin or standard URLs
      console.warn("Blob fetch download failed, using standard anchor fallback:", err);
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = cleanFileName;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-xl animate-fadeIn">
        
        {/* Top Control Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800/80 shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white font-mono">
                  {title}
                </h3>
                {dimensions && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {dimensions}
                  </span>
                )}
                {orderId && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                    #{orderId}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {subtitle || "Fichier d'impression haute-définition 300 DPI pour le studio de fabrication"}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            
            {/* Zoom Toggle */}
            <button
              onClick={handleZoomToggle}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title={zoomLevel === 1 ? "Zoom 200%" : "Adapter à l'écran"}
            >
              {zoomLevel === 1 ? <ZoomIn className="w-4 h-4 text-amber-400" /> : <ZoomOut className="w-4 h-4 text-amber-400" />}
              <span className="hidden sm:inline font-mono">{zoomLevel === 1 ? "200%" : "Ajuster"}</span>
            </button>

            {/* Copy URL */}
            <button
              onClick={handleCopyUrl}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Copier le lien public"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{isCopied ? "Copié !" : "Copier URL"}</span>
            </button>

            {/* Open Raw in New Tab */}
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Direct High-Res Download Button */}
            <button
              onClick={handleDirectDownload}
              disabled={isDownloading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Download className={`w-4 h-4 ${isDownloading ? "animate-bounce" : ""}`} />
              <span>{isDownloading ? "Téléchargement..." : "Télécharger HD"}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-all cursor-pointer ml-2"
              title="Fermer (Échap)"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* Main Canvas / Image Area */}
        <div 
          className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 cursor-zoom-in"
          onClick={handleZoomToggle}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: zoomLevel, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="Custom Artwork Preview"
              className={`rounded-2xl shadow-2xl object-contain border border-slate-700/80 transition-transform duration-200 select-none ${
                zoomLevel === 1 ? "max-h-[80vh] max-w-[85vw]" : "max-w-none cursor-grab active:cursor-grabbing"
              }`}
            />
          </motion.div>
        </div>

        {/* Bottom Info Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-slate-500" />
            <span>Aperçu plein écran sans compression • Cliquez sur l'image pour basculer le zoom</span>
          </div>
          <div className="font-mono text-[11px] text-amber-400/90">
            Échap pour quitter
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
};