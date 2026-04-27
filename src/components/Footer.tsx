"use client";

import Link from "next/link";
import { Sprout, Mail, Phone, MapPin, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Custom SVGs for Social Icons since lucide-react might not have them in this version
const Facebook = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
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
    <footer className="bg-neutral-800 text-white border-t border-neutral-300 mt-auto relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-earth-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="bg-white/10 p-2 rounded-xl group-hover:bg-brand-500/20 transition-colors">
                <Sprout className="h-8 w-8 text-brand-400 group-hover:text-brand-400 transition-colors" />
              </div>
              <span className="font-poppins font-black text-2xl tracking-tight text-white transition-colors">FARMELO</span>
            </Link>
            <p className="text-neutral-300 text-base leading-relaxed">
              From Soil to Market, Seamlessly Connected. We empower farmers and connect them directly with buyers for a sustainable future.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Globe, Facebook, Twitter, Instagram].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="#" 
                  className="bg-white/5 p-2.5 rounded-full text-neutral-300 hover:text-white hover:bg-brand-500/40 transition-all border border-white/10 hover:border-brand-400/50"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:pl-8">
            <h3 className="font-poppins font-bold text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-brand-500 rounded-full"></span> Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Marketplace", path: "/marketplace" },
                { name: "Traceability", path: "/traceability" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-neutral-300 hover:text-white text-base transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/50 group-hover:bg-brand-400 transition-colors"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-poppins font-bold text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-brand-500 rounded-full"></span> Services
            </h3>
            <ul className="space-y-4">
              {["Soil Testing", "Crop Consultation", "Grading & Packaging", "Distribution Hub"].map((service) => (
                <li key={service} className="text-neutral-300 text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth-500"></span>
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-poppins font-bold text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-brand-500 rounded-full"></span> Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-neutral-300 text-base group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-brand-500/20 transition-colors shrink-0">
                  <MapPin className="h-5 w-5 text-brand-400" />
                </div>
                <span className="pt-1">Jl. Pertanian No. 123, Bandung, West Java, Indonesia</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-300 text-base group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-brand-500/20 transition-colors shrink-0">
                  <Phone className="h-5 w-5 text-brand-400" />
                </div>
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-300 text-base group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-brand-500/20 transition-colors shrink-0">
                  <Mail className="h-5 w-5 text-brand-400" />
                </div>
                <span>hello@farmelo.com</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-neutral-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} FARMELO. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link href="#" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
