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
      title: "Uji tanah dan penyakit tanaman",
      description: "Analisis kondisi tanah untuk mengetahui kebutuhan nutrisi dan meningkatkan produktivitas, serta konsultasi mengenai penyakit tanaman beserta rekomendasinya.",
      image: "/C1.jpg",
      color: "bg-[#E2EFE4]"
    },
    {
      title: "Pendampingan budidaya",
      description: "Pendampingan dari tahap perencanaan hingga panen untuk hasil optimal.",
      image: "/C2.jpg",
      color: "bg-[#DDECDF]"
    },
    {
      title: "Grading & packaging",
      description: "Standarisasi kualitas hasil panen agar siap bersaing di pasar.",
      image: "/C3.jpg",
      color: "bg-[#DAEBDD]"
    },
    {
      title: "Distribusi Terintegrasi",
      description: "Distribusi produk secara efisien dan tepat waktu ke pasar atau buyer.",
      image: "/C4.jpg",
      color: "bg-[#D8ECD9]"
    },
    {
      title: "Market place dan offline market",
      description: "Menghubungkan petani dengan buyer secara langsung dan aman baik secara online/offline.",
      image: "/C5.jpg",
      color: "bg-[#D5E9D6]"
    },
    {
      title: "Traceability",
      description: "Sistem pelacakan produk dari lahan hingga konsumen.",
      image: "/C6.jpg",
      color: "bg-[#C5DBC8]"
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-base pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Layanan */}
          <div className="mb-12 pt-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-800 mb-4 font-poppins tracking-tight">
                Layanan FARMELO
              </h1>
              {loading ? (
                <div className="h-6 w-48 bg-neutral-200 animate-pulse rounded mx-auto"></div>
              ) : (
                <p className="text-xl text-brand-600 font-medium">Selamat datang, {userName}!</p>
              )}
              <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
                Pilih layanan yang Anda butuhkan untuk mengoptimalkan hasil pertanian dan jangkauan pasar Anda.
              </p>
            </motion.div>
          </div>

          {/* Actionable Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                className={`${service.color} rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-brand-100 flex flex-col relative overflow-hidden group`}
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0A3215] mb-3 font-poppins">{service.title}</h3>
                  <p className="text-[#0A3215]/70 text-sm font-medium leading-relaxed mb-8 flex-1">
                    {service.description}
                  </p>
                  
                  <a 
                    href="https://wa.me/6285649146292" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-white hover:bg-brand-50 border border-brand-100 rounded-2xl font-bold text-brand-600 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:border-brand-300"
                  >
                    Ajukan Layanan <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
