"use client";

import { useState } from "react";
import { getTrackingRecord } from "@/lib/tracking";
import { TraceabilityRecord } from "@/lib/data";
import { Search, MapPin, Calendar, CheckCircle2, User, Truck, Sprout } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TraceabilityPage() {
  const [trackingId, setTrackingId] = useState("");
  const [record, setRecord] = useState<TraceabilityRecord | null>(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setError("");
    
    const id = trackingId.trim();
    if (!id) {
      setError("Please enter a tracking ID");
      setRecord(null);
      return;
    }

    const found = getTrackingRecord(id);

    if (found) {
      setRecord(found);
    } else {
      setRecord(null);
      setError("Data tidak ditemukan untuk ID tracking ini. Pastikan kode yang Anda masukkan benar.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 pt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Pelacakan Produk</h1>
          <p className="text-xl text-foreground/70">
            Lacak hasil bumi Anda dari ladang pertanian hingga ke meja makan Anda.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-card p-8 rounded-2xl shadow-sm border border-border mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Masukkan Kode Tracking (contoh: TRC-88219A)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 text-lg uppercase"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-foreground/40" />
            </div>
            <button 
              type="submit"
              className="px-8 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              Lacak Sekarang
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
        </div>

        {/* Results */}
        {hasSearched && record && (
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden animate-fade-in">
            <div className="bg-brand-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{record.productName}</h2>
                  <p className="text-brand-100 font-medium mt-1">ID: {record.id}</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="font-semibold">{record.status}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-brand-200"></div>

                {/* Timeline Items */}
                <div className="space-y-8">
                  {/* Planting */}
                  <div className="relative flex gap-6">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-brand-100 border-4 border-white flex items-center justify-center flex-shrink-0 text-brand-600 shadow-sm">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-lg font-bold text-foreground">Ditanam</h3>
                      <p className="text-foreground/60 text-sm mb-2">{new Date(record.plantingDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <div className="bg-background p-4 rounded-lg border border-border mt-2">
                        <div className="flex items-center gap-2 text-sm text-foreground/80 mb-1">
                          <User className="h-4 w-4 text-brand-600" /> Petani: <span className="font-semibold">{record.farmerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                          <MapPin className="h-4 w-4 text-brand-600" /> Lokasi: {record.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Harvest */}
                  <div className="relative flex gap-6">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-brand-100 border-4 border-white flex items-center justify-center flex-shrink-0 text-brand-600 shadow-sm">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-lg font-bold text-foreground">Dipanen & Pemeriksaan Kualitas</h3>
                      <p className="text-foreground/60 text-sm mb-2">{new Date(record.harvestDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-foreground/70">Lulus kontrol kualitas yang ketat. Grading dan pengemasan dilakukan dengan aman.</p>
                    </div>
                  </div>

                  {/* Distribution */}
                  <div className="relative flex gap-6">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-brand-600 border-4 border-white flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-lg font-bold text-foreground">Pusat Distribusi</h3>
                      <p className="text-foreground/60 text-sm mb-2">{new Date(record.distributionDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-foreground/70">Saat ini sedang didistribusikan ke tujuan pasar akhir.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </ProtectedRoute>
  );
}
