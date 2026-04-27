"use client";

import { useState, useEffect } from "react";
import { TestTube2, Sprout, PackageCheck, Truck, ShieldCheck, MapPin, Activity, CalendarDays, ArrowRight, X, MessageCircle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesPage() {
  const [userName, setUserName] = useState<string>("Petani");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ isTimeout: true }), 3000));
          const docSnap = await Promise.race([getDoc(docRef), timeoutPromise]) as any;

          if (docSnap && !docSnap.isTimeout && docSnap.exists()) {
            setUserName(docSnap.data().name || "Petani");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const services = [
    {
      title: "Uji Kesehatan Tanah",
      description: "Analisis unsur hara dan rekomendasi pupuk yang tepat untuk lahan Anda.",
      details: "Layanan ini mencakup pengambilan sampel tanah dan pengujian laboratorium lengkap untuk menentukan kadar NPK, pH, dan bahan organik. Anda akan menerima laporan digital dan rekomendasi pemupukan presisi.",
      icon: <TestTube2 className="h-7 w-7 text-brand-600" />,
      color: "bg-[#E2EFE4]"
    },
    {
      title: "Jadwal Konsultasi",
      description: "Berdiskusi langsung dengan pakar agronomi kami mengenai hama dan perawatan.",
      details: "Dapatkan bimbingan teknis langsung dari ahli pertanian FARMELO. Konsultasi mencakup manajemen hama terpadu, pemilihan benih, dan optimalisasi sistem irigasi.",
      icon: <Sprout className="h-7 w-7 text-brand-600" />,
      color: "bg-[#DDECDF]",
      isWA: true
    },
    {
      title: "Permintaan Grading",
      description: "Pengecekan kualitas panen sebelum didistribusikan ke jaringan buyer.",
      details: "Sertifikasi kualitas hasil panen Anda untuk mendapatkan harga jual premium. Tim kami akan melakukan pengecekan visual, kadar air, dan ukuran sesuai standar pasar modern.",
      icon: <PackageCheck className="h-7 w-7 text-brand-600" />,
      color: "bg-[#DAEBDD]"
    },
    {
      title: "Jadwal Penjemputan",
      description: "Lacak armada logistik yang akan menjemput hasil panen dari lahan Anda.",
      details: "Fasilitas transportasi dari lahan langsung ke gudang distribusi. Layanan ini menjamin kesegaran produk dengan sistem logistik yang terencana.",
      icon: <Truck className="h-7 w-7 text-brand-600" />,
      color: "bg-[#D8ECD9]"
    },
    {
      title: "Data Traceability",
      description: "Catat riwayat tanam hingga panen untuk meningkatkan nilai jual ke konsumen.",
      details: "Rekam jejak digital mulai dari benih hingga panen. Memberikan transparansi penuh kepada konsumen akhir dan meningkatkan kepercayaan terhadap produk Anda.",
      icon: <ShieldCheck className="h-7 w-7 text-brand-600" />,
      color: "bg-[#C5DBC8]"
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-base pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Layanan */}
          <div className="mb-12 pt-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-800 mb-2 font-poppins tracking-tight">
                Layanan FARMELO
              </h1>
              {loading ? (
                <div className="h-6 w-48 bg-neutral-200 animate-pulse rounded"></div>
              ) : (
                <p className="text-xl text-brand-600 font-medium">Selamat datang, {userName}!</p>
              )}
            </motion.div>
          </div>

          {/* Actionable Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className={`${service.color} rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all border border-brand-100 flex flex-col relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.04] transform translate-x-4 -translate-y-4 scale-150 text-[#0A3215]">
                  {service.icon}
                </div>
                
                <div className="bg-white/80 backdrop-blur w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/40">
                  {service.icon}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-[#0A3215] mb-2 font-poppins">{service.title}</h3>
                  <p className="text-[#0A3215]/70 text-sm font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <button 
                  onClick={() => setSelectedService(service)}
                  className="mt-6 w-full py-3 bg-white hover:bg-brand-50 border border-brand-100 rounded-xl font-bold text-brand-600 transition-colors flex items-center justify-center gap-2 group-hover:border-brand-300"
                >
                  Ajukan Layanan <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center text-brand-600">
                    {selectedService.icon}
                  </div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <h2 className="text-3xl font-black text-neutral-800 mb-4 font-poppins">
                  {selectedService.title}
                </h2>
                
                <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                  {selectedService.details}
                </p>

                {selectedService.isWA ? (
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Hubungi Admin Kami</p>
                    <a 
                      href="https://wa.me/6281234567890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 transition-all text-lg"
                    >
                      <MessageCircle className="h-6 w-6" /> Chat via WhatsApp
                    </a>
                  </div>
                ) : (
                  <button className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 transition-all text-lg">
                    Konfirmasi Pengajuan
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
}
