"use client";

import { useState, useEffect } from "react";
import { dummyProducts, dummySupplies } from "@/lib/data";
import { ShoppingCart, Search, Check, LayoutGrid, Leaf, Apple, Cherry, Wheat, MoreHorizontal, Pickaxe, TestTube, Bug, Sprout, X, Trash2, Plus, Minus, ArrowRight, ExternalLink } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";

export default function MarketplacePage() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount } = useCart();
  
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
  const [priceRange, setPriceRange] = useState("Semua Harga");
  const [sortBy, setSortBy] = useState("Terbaru");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string>("buyer");
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ isTimeout: true }), 3000));
          const docSnap = await Promise.race([getDoc(docRef), timeoutPromise]) as any;

          if (docSnap && !docSnap.isTimeout && docSnap.exists()) {
            setUserRole(docSnap.data().role);
          }
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
      setLoadingRole(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setAddedItems((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter(id => id !== item.id));
    }, 2000);
  };

  const handleCheckout = () => {
    // Generate a random tracking code like TRC-88219A
    const randomCode = `TRC-${Math.floor(10000 + Math.random() * 90000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    setTrackingCode(randomCode);
    setIsCartOpen(false);
    
    // Memberi waktu drawer untuk menutup sebelum memunculkan modal sukses
    setTimeout(() => {
      setIsCheckoutSuccess(true);
      clearCart();
    }, 400);
  };

  // Define categories based on role
  const buyerCategories = [
    { name: "Semua", icon: <LayoutGrid className="w-5 h-5 mb-1" /> },
    { name: "Sayuran", icon: <Leaf className="w-5 h-5 mb-1" /> },
    { name: "Buah", icon: <Apple className="w-5 h-5 mb-1" /> },
    { name: "Rempah", icon: <Cherry className="w-5 h-5 mb-1" /> },
    { name: "Biji-bijian", icon: <Wheat className="w-5 h-5 mb-1" /> },
    { name: "Lainnya", icon: <MoreHorizontal className="w-5 h-5 mb-1" /> }
  ];

  const farmerCategories = [
    { name: "Semua", icon: <LayoutGrid className="w-5 h-5 mb-1" /> },
    { name: "Pupuk", icon: <TestTube className="w-5 h-5 mb-1" /> },
    { name: "Benih", icon: <Sprout className="w-5 h-5 mb-1" /> },
    { name: "Alat", icon: <Pickaxe className="w-5 h-5 mb-1" /> },
    { name: "Pestisida", icon: <Bug className="w-5 h-5 mb-1" /> }
  ];

  const categories = userRole === "farmer" ? farmerCategories : buyerCategories;
  const rawItems = userRole === "farmer" ? dummySupplies : dummyProducts;

  // Filter Logic
  let filteredItems = rawItems.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "Semua" || p.category === selectedCategory;
    const matchLocation = selectedLocation === "Semua Lokasi" || p.location === selectedLocation;
    let matchPrice = true;
    if (priceRange === "Di bawah Rp 20.000") matchPrice = p.price < 20000;
    else if (priceRange === "Rp 20.000 - Rp 50.000") matchPrice = p.price >= 20000 && p.price <= 50000;
    else if (priceRange === "Di atas Rp 50.000") matchPrice = p.price > 50000;

    return matchSearch && matchCategory && matchLocation && matchPrice;
  });

  // Sort Logic
  filteredItems = filteredItems.sort((a, b) => {
    if (sortBy === "Terbaru") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    if (sortBy === "Terlama") return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
    if (sortBy === "Harga Terendah") return a.price - b.price;
    if (sortBy === "Harga Tertinggi") return b.price - a.price;
    return 0;
  });

  const uniqueLocations = ["Semua Lokasi", ...Array.from(new Set(rawItems.map(item => item.location)))];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const SproutIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar Filter Area */}
            <aside className="w-full lg:w-1/4 lg:sticky lg:top-28 space-y-8">
              {/* Cari Produk */}
              <div>
                <h3 className="font-bold text-[#0A3215] mb-3">Cari Produk</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Cari kebutuhan tani, bibit, atau lainnya..." 
                    className="w-full pl-4 pr-10 py-3 border border-neutral-200 rounded-xl bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500/50 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute right-3 top-3.5 h-5 w-5 text-neutral-400" />
                </div>
              </div>

              {/* Kategori Pills */}
              <div>
                <h3 className="font-bold text-[#0A3215] mb-3">Kategori</h3>
                <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
                  {!loadingRole && categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex-shrink-0 flex flex-col items-center justify-center p-3 w-20 rounded-xl transition-all ${
                        selectedCategory === cat.name 
                          ? "bg-[#E2EFE4] text-[#0A3215] shadow-sm font-bold" 
                          : "bg-white text-neutral-500 hover:bg-neutral-50 font-medium"
                      }`}
                    >
                      {cat.name === "Benih" ? <SproutIcon className="w-6 h-6 mb-1" /> : cat.icon}
                      <span className="text-xs">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div>
                <h3 className="font-bold text-[#0A3215] mb-4">Filter</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-[#0A3215] w-1/3">Lokasi</span>
                    <select className="w-2/3 p-2.5 border border-neutral-200 rounded-lg text-sm bg-white text-neutral-700 outline-none focus:border-brand-500 shadow-sm" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                      {uniqueLocations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-[#0A3215] w-1/3">Rentang Harga</span>
                    <select className="w-2/3 p-2.5 border border-neutral-200 rounded-lg text-sm bg-white text-neutral-700 outline-none focus:border-brand-500 shadow-sm" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                      <option value="Semua Harga">Semua Harga</option>
                      <option value="Di bawah Rp 20.000">Di bawah Rp 20.000</option>
                      <option value="Rp 20.000 - Rp 50.000">Rp 20.000 - Rp 50.000</option>
                      <option value="Di atas Rp 50.000">Di atas Rp 50.000</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-[#0A3215] w-1/3">Urutkan</span>
                    <select className="w-2/3 p-2.5 border border-neutral-200 rounded-lg text-sm bg-white text-neutral-700 outline-none focus:border-brand-500 shadow-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="Terbaru">Terbaru</option>
                      <option value="Terlama">Terlama</option>
                      <option value="Harga Terendah">Harga Terendah</option>
                      <option value="Harga Tertinggi">Harga Tertinggi</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Product Area */}
            <main className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200">
                <h2 className="text-2xl font-black text-[#0A3215] font-poppins">
                  {userRole === "farmer" ? "Kebutuhan Tani" : "Hasil Panen Segar"}
                </h2>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 border border-brand-500/20 rounded-xl bg-brand-50/50 text-brand-600 flex items-center gap-2 font-bold shadow-sm hover:bg-brand-100 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{cartItemCount} Produk</span>
                </button>
              </div>

              {loadingRole ? (
                <div className="flex justify-center py-20"><div className="animate-pulse h-10 w-10 bg-brand-200 rounded-full"></div></div>
              ) : filteredItems.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item: any) => {
                    const isAdded = addedItems.includes(item.id);
                    return (
                      <motion.div key={item.id} variants={itemVariants} whileHover={{ y: -8 }} className="bg-white rounded-[1.5rem] p-3 shadow-sm hover:shadow-xl transition-all flex flex-col border border-neutral-200/60 group">
                        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-[1.2rem]">
                          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-brand-600 shadow-sm">
                            {userRole === "farmer" ? item.category : item.qualityGrade}
                          </div>
                        </div>
                        <div className="px-2 flex-grow flex flex-col">
                          <h3 className="font-poppins font-bold text-lg text-neutral-800 mb-1 group-hover:text-brand-500 transition-colors line-clamp-2">{item.name}</h3>
                          <p className="text-xs text-neutral-500 mb-3 font-medium">{item.location} • {userRole === "farmer" ? `Pemasok: ${item.supplierName}` : `Petani: ${item.farmerName}`}</p>
                          <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                            <span className="font-black text-xl text-neutral-800 font-poppins">Rp {item.price.toLocaleString('id-ID')}<span className="text-xs font-semibold text-neutral-500 ml-1">{userRole === "farmer" ? "" : "/kg"}</span></span>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAddToCart(item)} disabled={isAdded} className={`p-2.5 rounded-xl transition-all ${isAdded ? "bg-[#DDECDF] text-[#0A3215]" : "bg-white text-brand-600 border border-brand-200 hover:bg-brand-50"}`}>
                              {isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-neutral-200 shadow-sm">
                  <Search className="h-10 w-10 text-brand-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-800 mb-2 font-poppins">Produk tidak ditemukan</h3>
                  <p className="text-neutral-500 text-sm">Coba ubah filter atau kata kunci pencarian Anda.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col">
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-50 p-2 rounded-lg text-brand-600"><ShoppingCart className="h-6 w-6" /></div>
                  <h2 className="text-xl font-bold text-[#0A3215]">Keranjang Saya</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400"><X className="h-6 w-6" /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 group">
                      <div className="h-20 w-20 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-neutral-800 text-sm mb-1 leading-tight">{item.product.name}</h4>
                        <p className="text-xs text-neutral-500 mb-2">Rp {item.product.price.toLocaleString('id-ID')}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-neutral-50 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="p-1 hover:bg-white rounded-md transition-colors"><Minus className="h-3 w-3" /></button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-white rounded-md transition-colors"><Plus className="h-3 w-3" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-neutral-300 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300"><ShoppingCart className="h-8 w-8" /></div>
                    <p className="text-neutral-500 font-medium">Keranjang masih kosong</p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-[#FDFDFD] border-t border-neutral-100 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-neutral-500">Total</span>
                  <span className="font-black text-2xl text-[#0A3215]">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all text-lg"
                >
                  Checkout Sekarang <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 mb-8 relative group">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Kode Tracking Anda</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-2xl font-black text-brand-600 font-mono tracking-wider">{trackingCode}</div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(trackingCode);
                      const btn = document.getElementById('copy-btn');
                      if (btn) btn.innerText = 'Copied!';
                      setTimeout(() => { if (btn) btn.innerText = 'Copy'; }, 2000);
                    }}
                    className="text-[10px] bg-white border border-neutral-200 px-2 py-1 rounded-md font-bold text-neutral-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <span id="copy-btn">Copy</span>
                  </button>
                </div>
                <p className="text-[10px] text-neutral-400 font-medium mt-2">*Simpan kode ini untuk melacak status pengiriman</p>
              </div>

              <div className="space-y-3">
                <Link href="/traceability" onClick={() => setIsCheckoutSuccess(false)}>
                  <button className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all">
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
