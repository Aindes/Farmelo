"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sprout, TestTube2, PackageCheck, Truck, ShoppingBasket, ShieldCheck, ShoppingCart, Wheat, LayoutDashboard } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          
          // Mencegah skeleton loading nyangkut lama kalau koneksi internet ke Firestore lambat
          // Gunakan resolve alih-alih reject agar Next.js tidak memunculkan Error Overlay merah
          const timeoutPromise = new Promise((resolve) => 
            setTimeout(() => resolve({ isTimeout: true }), 3000)
          );
          
          const docSnap = await Promise.race([
            getDoc(docRef),
            timeoutPromise
          ]) as any;

          if (docSnap && docSnap.isTimeout) {
            console.warn("Firestore fetch timed out, defaulting to normal UI");
          } else if (docSnap && docSnap.exists()) {
            setUserRole(docSnap.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUserRole(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);
  const features = [
    {
      title: "Soil Testing",
      description: "Get accurate analysis of your soil health to optimize crop yield.",
      icon: <TestTube2 className="h-6 w-6 text-brand-500" />
    },
    {
      title: "Crop Consultation",
      description: "Expert advice on crop selection, pest control, and sustainable farming.",
      icon: <Sprout className="h-6 w-6 text-brand-500" />
    },
    {
      title: "Grading & Packaging",
      description: "Standardized quality control and eco-friendly packaging solutions.",
      icon: <PackageCheck className="h-6 w-6 text-brand-500" />
    },
    {
      title: "Distribution",
      description: "Efficient logistics ensuring fresh delivery from farm to market.",
      icon: <Truck className="h-6 w-6 text-brand-500" />
    },
    {
      title: "Marketplace",
      description: "Direct connection between farmers and buyers, eliminating middlemen.",
      icon: <ShoppingBasket className="h-6 w-6 text-brand-500" />
    },
    {
      title: "Traceability",
      description: "Transparent supply chain tracking for guaranteed freshness and origin.",
      icon: <ShieldCheck className="h-6 w-6 text-brand-500" />
    }
  ];

  const flowSteps = [
    { name: "Uji Tanah", icon: <TestTube2 className="h-8 w-8 text-brand-600" /> },
    { name: "Budidaya", icon: <Sprout className="h-8 w-8 text-brand-600" /> },
    { name: "Panen", icon: <Wheat className="h-8 w-8 text-brand-600" /> },
    { name: "Grading & Packing", icon: <PackageCheck className="h-8 w-8 text-brand-600" /> },
    { name: "Distribusi", icon: <Truck className="h-8 w-8 text-brand-600" /> },
    { name: "Pasar", icon: <ShoppingCart className="h-8 w-8 text-brand-600" /> }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-base">
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0">
          <img
            src="/petani-hero.jpg"
            alt="Farmer Background Placeholder"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient to fade the image on the left side smoothly into the bg-base */}
          <div className="absolute inset-0 bg-gradient-to-r from-base via-base/90 to-transparent lg:via-base/30"></div>
          {/* Gradient for mobile readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent lg:hidden"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl pt-10"
            >
              <h1 className="text-6xl md:text-[80px] font-black text-brand-500 tracking-tight mb-2 font-poppins leading-none">
                FARMELO
              </h1>

              <h2 className="text-3xl md:text-[40px] font-bold text-neutral-800 mb-6 font-poppins leading-[48px]">
                Dari Ladang ke Pasar,<br />Semua Terhubung
              </h2>

              <p className="text-lg md:text-[16px] text-neutral-800/80 mb-10 max-w-lg font-medium leading-relaxed">
                Sistem terintegrasi untuk meningkatkan efisiensi rantai pasok pertanian dan menciptakan nilai lebih bagi petani.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 h-[76px]">
                {loadingAuth ? (
                  <>
                    <div className="flex-1 bg-neutral-200/50 animate-pulse rounded-2xl h-full"></div>
                    <div className="flex-1 bg-neutral-200/50 animate-pulse rounded-2xl h-full"></div>
                  </>
                ) : userRole === "farmer" ? (
                  <Link href="/services" className="flex-1 h-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="h-full bg-brand-500 text-white rounded-2xl p-4 flex items-center gap-4 hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 border border-brand-400"
                    >
                      <div className="p-1">
                        <LayoutDashboard className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-semibold text-[15px] font-sans">Layanan Petani</span>
                        <span className="text-[12px] opacity-90 font-sans mt-0.5">Kelola lahan & layanan</span>
                      </div>
                    </motion.div>
                  </Link>
                ) : userRole === "buyer" ? (
                  <Link href="/marketplace" className="flex-1 h-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="h-full bg-white text-brand-600 rounded-2xl p-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors shadow-lg shadow-black/5 border border-brand-200"
                    >
                      <div className="p-1">
                        <ShoppingBasket className="h-7 w-7 text-brand-600" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-semibold text-[15px] font-sans">Mulai Belanja</span>
                        <span className="text-[12px] text-neutral-500 font-sans mt-0.5">Temukan produk pertanian segar</span>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link href="/register?role=farmer" className="flex-1 h-full">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-full bg-brand-500 text-white rounded-2xl p-4 flex items-center gap-4 hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 border border-brand-400"
                      >
                        <div className="p-1">
                          <Sprout className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="font-semibold text-[15px] font-sans">Gabung sebagai Petani</span>
                          <span className="text-[12px] opacity-90 font-sans mt-0.5">Kelola lahan & tingkatkan hasil</span>
                        </div>
                      </motion.div>
                    </Link>

                    <Link href="/register?role=buyer" className="flex-1 h-full">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-full bg-white text-neutral-800 rounded-2xl p-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors shadow-lg shadow-black/5 border border-neutral-300"
                      >
                        <div className="p-1">
                          <ShoppingCart className="h-7 w-7 text-neutral-600" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="font-semibold text-[15px] font-sans">Gabung sebagai Buyer</span>
                          <span className="text-[12px] text-neutral-500 font-sans mt-0.5">Dapatkan produk berkualitas</span>
                        </div>
                      </motion.div>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right Content - Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:flex justify-end self-end lg:pb-16"
            >
              <div className="bg-base/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl shadow-brand-500/10 border border-white max-w-sm relative z-20 mt-32 right-0 lg:-right-8">
                <div className="flex items-start gap-4 mb-3">
                  <div className="bg-brand-500/10 p-3 rounded-full shrink-0">
                    <Sprout className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="font-bold text-[18px] text-neutral-800 font-poppins leading-tight mt-1">Terintegrasi<br />Hulu ke Hilir</h3>
                </div>
                <p className="text-[14px] text-neutral-500 font-medium leading-relaxed pl-16">
                  Dari uji tanah, budidaya, panen, hingga sampai ke tangan pembeli.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-base relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-neutral-800 mb-6 font-poppins">Comprehensive Solutions</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium">
              We provide end-to-end services to ensure high quality produce and fair prices for everyone.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-card rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all border border-neutral-300/50 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-8 border border-brand-500/20 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-4 font-poppins">{feature.title}</h3>
                  <p className="text-neutral-500 leading-relaxed text-base font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-32 bg-white text-neutral-800 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-px bg-neutral-300/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-poppins">Alur Field to Market</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-xl font-medium">
              Sistem transparan yang menghubungkan setiap proses dari lahan pertanian langsung ke tangan Anda.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-2 lg:gap-6"
          >
            {flowSteps.map((step, index) => (
              <motion.div key={index} className="flex flex-col md:flex-row items-center" variants={itemVariants}>
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-brand-500/10 flex items-center justify-center shadow-sm relative group mb-4"
                  >
                    <div className="absolute inset-0 rounded-full bg-brand-500/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <div className="relative z-10">{step.icon}</div>
                  </motion.div>
                  <span className="font-bold text-[15px] lg:text-[16px] text-neutral-800 text-center font-sans whitespace-nowrap">{step.name}</span>
                </div>
                
                {index < flowSteps.length - 1 && (
                  <div className="my-4 md:my-0 md:mx-2 lg:mx-4 hidden md:flex items-center text-brand-500/60">
                    <svg width="40" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-[60px]">
                      <path d="M0 12H58M58 12L48 2M58 12L48 22" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
                    </svg>
                  </div>
                )}
                {/* Down arrow for mobile */}
                {index < flowSteps.length - 1 && (
                  <div className="my-4 md:hidden text-brand-500/60">
                    <ArrowRight className="h-6 w-6 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-base text-neutral-800 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-neutral-300"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-brand-500 rounded-b-full opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] leading-[56px] font-black mb-8 font-poppins"
          >
            Ready to Transform Your Farming Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[16px] mb-12 text-neutral-500 font-medium"
          >
            Join our growing network of smart farmers and conscious buyers today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {loadingAuth ? (
              <div className="inline-block px-10 py-5 w-56 h-16 bg-neutral-200/50 animate-pulse rounded-full"></div>
            ) : userRole === "farmer" ? (
              <Link href="/services">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 text-[16px] font-semibold rounded-full text-white bg-brand-500 shadow-xl hover:shadow-brand-500/20 transition-all inline-flex items-center gap-3 hover:bg-brand-600 font-sans"
                >
                  Buka Layanan <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Link>
            ) : userRole === "buyer" ? (
              <Link href="/marketplace">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 text-[16px] font-semibold rounded-full text-white bg-brand-500 shadow-xl hover:shadow-brand-500/20 transition-all inline-flex items-center gap-3 hover:bg-brand-600 font-sans"
                >
                  Mulai Belanja <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Link>
            ) : (
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 text-[16px] font-semibold rounded-full text-white bg-brand-500 shadow-xl hover:shadow-brand-500/20 transition-all inline-flex items-center gap-3 hover:bg-brand-600 font-sans"
                >
                  Get Started Now <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
