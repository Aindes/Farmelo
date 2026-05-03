"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout, ShoppingCart, User } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const baseLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/about" },
  ];

  const contactLink = { name: "Hubungi Kami", path: "/contact" };

  const privateLinks = [
    { name: "Layanan", path: "/services" },
    { name: "Pasar", path: "/marketplace" },
    { name: "Pelacakan", path: "/traceability" },
  ];

  const navLinks = user 
    ? [...baseLinks, ...privateLinks, contactLink] 
    : [...baseLinks, contactLink];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled ? "pt-4 px-4" : "pt-0 px-0"
        }`}
      >
        <div className={`mx-auto w-full transition-all duration-300 ${
          scrolled ? "max-w-7xl glass rounded-full shadow-lg border border-neutral-300/40" : "max-w-full bg-white/80 backdrop-blur-md border-b border-neutral-300/50"
        }`}>
          <div className={`flex justify-between items-center ${scrolled ? "h-16 px-6" : "h-20 px-8"}`}>
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/logo.png" alt="FARMELO Logo" className="h-10 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors group"
                  >
                    <span className={`relative z-10 ${isActive ? "text-brand-600 font-semibold" : "text-neutral-500 group-hover:text-brand-500"}`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-brand-500/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link href="/cart" className="relative p-2 rounded-full bg-brand-500/10 text-brand-600 hover:bg-brand-500/20 transition-colors flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5" />
                      <AnimatePresence>
                        {cartItemCount > 0 && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 bg-warning text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                          >
                            {cartItemCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300/50 bg-white/50 text-sm font-medium text-neutral-800 shadow-sm">
                    <User className="h-4 w-4 text-brand-500" />
                    <span>{user.email?.split("@")[0]}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-5 py-2 text-sm font-semibold text-brand-600 bg-brand-500/10 rounded-full hover:bg-brand-500/20 transition-colors shadow-sm"
                  >
                    Keluar
                  </motion.button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-bold text-neutral-500 hover:text-brand-500 transition-colors"
                  >
                    Masuk
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/register"
                      className="px-6 py-2.5 text-sm font-bold text-white bg-brand-500 rounded-full shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all hover:bg-brand-600"
                    >
                      Daftar
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-brand-500/10 text-brand-600 hover:bg-brand-500/20 transition-colors focus:outline-none"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-20 md:h-24"></div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 left-4 right-4 z-40 glass rounded-3xl overflow-hidden shadow-2xl border border-white/40"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                    pathname === link.path
                      ? "bg-brand-500/10 text-brand-600"
                      : "text-neutral-500 hover:bg-brand-500/5 hover:text-brand-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-neutral-300/50">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-4 py-2 text-brand-600 bg-brand-500/10 rounded-2xl">
                      <User className="h-5 w-5" />
                      <span className="font-bold">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-center px-4 py-3 rounded-2xl text-base font-bold text-error bg-error/10 hover:bg-error/20 transition-colors"
                    >
                      Keluar
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-4 py-3 bg-white border border-neutral-300 text-neutral-800 rounded-2xl text-base font-bold shadow-sm"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-4 py-3 bg-brand-500 text-white rounded-2xl text-base font-bold shadow-md hover:bg-brand-600 transition-colors"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
