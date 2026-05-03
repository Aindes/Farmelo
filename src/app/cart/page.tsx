"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Check, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";

import { saveTrackingRecord } from "@/lib/tracking";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  const handleCheckout = () => {
    const randomCode = `TRC-${Math.floor(10000 + Math.random() * 90000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    
    // Save to localStorage so it can be tracked in Traceability page
    if (cart.length > 0) {
      const firstItem = cart[0].product;
      const newRecord = {
        id: randomCode,
        productId: firstItem.id,
        productName: firstItem.name,
        farmerName: (firstItem as any).farmerName || (firstItem as any).supplierName || "Petani Farmelo",
        plantingDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        harvestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        distributionDate: new Date().toISOString().split('T')[0],
        location: firstItem.location,
        status: "Diproses",
      };
      
      saveTrackingRecord(newRecord);
    }

    setTrackingCode(randomCode);
    setIsCheckoutSuccess(true);
    clearCart();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-base pt-8 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-10 mb-12 border-b border-neutral-300/50 pb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black text-neutral-800 mb-3 tracking-tight font-poppins">Keranjang Anda</h1>
            <p className="text-neutral-500 font-medium text-lg">Tinjau produk pilihan Anda dan lanjutkan ke pembayaran.</p>
          </motion.div>

          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white/50 backdrop-blur-md rounded-[3rem] border border-neutral-300 shadow-sm"
            >
              <div className="bg-brand-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-brand-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3 font-poppins">Keranjang Anda kosong</h3>
              <p className="text-neutral-500 text-lg mb-8 max-w-md mx-auto">Sepertinya Anda belum menambahkan produk apapun ke keranjang. Mari temukan produk pertanian terbaik!</p>
              <Link href="/marketplace">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-brand-500 text-white rounded-full font-bold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:bg-brand-600 transition-all border border-brand-400 inline-flex items-center gap-2"
                >
                  Ke Pasar <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div 
                      key={item.product.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      className="flex flex-col sm:flex-row items-center gap-6 bg-card p-5 rounded-[2rem] shadow-sm hover:shadow-md border border-neutral-300/50 transition-shadow"
                    >
                      <div className="relative w-full sm:w-32 h-32 rounded-[1.5rem] overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-grow text-center sm:text-left w-full">
                        <h3 className="font-poppins font-bold text-xl text-neutral-800 mb-1">{item.product.name}</h3>
                        <p className="text-sm font-medium text-neutral-500 mb-4">Rp {item.product.price.toLocaleString("id-ID")} / kg</p>
                        
                        <div className="flex items-center justify-center sm:justify-start gap-4">
                          <div className="flex items-center bg-base rounded-full border border-neutral-300 p-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-2 rounded-full bg-white shadow-sm hover:bg-neutral-300/20 transition-colors text-neutral-800"
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>
                            <span className="font-bold w-10 text-center text-neutral-800">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 rounded-full bg-white shadow-sm hover:bg-neutral-300/20 transition-colors text-neutral-800"
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0">
                        <p className="font-poppins font-bold text-xl text-brand-600 mb-0 sm:mb-6">
                          Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-error hover:text-red-700 transition-colors p-3 bg-error/10 hover:bg-error/20 rounded-full"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-brand-500 text-white p-8 rounded-[2rem] shadow-xl h-fit sticky top-28 border border-brand-400"
              >
                <h2 className="text-2xl font-poppins font-bold mb-6">Ringkasan Pesanan</h2>
                <div className="space-y-4 text-base font-medium mb-8">
                  <div className="flex justify-between items-center opacity-90">
                    <span>Subtotal</span>
                    <span>Rp {cartTotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center opacity-90">
                    <span>Pengiriman</span>
                    <span className="text-brand-100">Dihitung saat checkout</span>
                  </div>
                  <div className="border-t border-brand-400/50 pt-6 mt-6 flex justify-between items-center">
                    <span className="font-bold text-xl font-poppins">Total</span>
                    <span className="font-poppins font-bold text-3xl text-white">Rp {cartTotal.toLocaleString("id-ID")}</span>
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full py-4 bg-white text-brand-600 rounded-2xl font-bold text-lg hover:shadow-lg transition-all mb-4 border border-white/80"
                >
                  Lanjutkan ke Pembayaran
                </motion.button>
                
                <Link href="/marketplace">
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    className="w-full text-center py-4 border border-brand-400 text-white rounded-2xl font-bold transition-colors"
                  >
                    Lanjut Belanja
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {isCheckoutSuccess && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-8 text-center">
              <div className="w-20 h-20 bg-[#E2EFE4] text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 stroke-[3]" />
              </div>
              <h2 className="text-3xl font-black text-neutral-800 mb-2 font-poppins">Pesanan Berhasil!</h2>
              <p className="text-neutral-500 mb-8 font-medium leading-relaxed">Pesanan Anda telah kami terima dan sedang diproses oleh petani mitra kami.</p>
              
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-8">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Kode Tracking Anda</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-2xl font-black text-brand-600 font-mono tracking-wider">{trackingCode}</div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(trackingCode);
                      const btn = document.getElementById('cart-copy-btn');
                      if (btn) btn.innerText = 'Copied!';
                      setTimeout(() => { if (btn) btn.innerText = 'Copy'; }, 2000);
                    }}
                    className="text-[10px] bg-white border border-neutral-200 px-2 py-1 rounded-md font-bold text-neutral-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <span id="cart-copy-btn">Copy</span>
                  </button>
                </div>
                <p className="text-[10px] text-neutral-400 font-medium mt-2">*Simpan kode ini untuk melacak status pengiriman</p>
              </div>

              <div className="space-y-3">
                <Link href="/traceability" onClick={() => setIsCheckoutSuccess(false)}>
                  <button className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-brand-500/20 transition-all">
                    Lacak di Traceability <ExternalLink className="h-4 w-4" />
                  </button>
                </Link>
                <button onClick={() => setIsCheckoutSuccess(false)} className="w-full py-4 bg-white text-neutral-500 font-bold hover:bg-neutral-50 rounded-2xl transition-all">Tutup</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
}
