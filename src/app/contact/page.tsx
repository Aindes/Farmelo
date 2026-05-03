import { MapPin, Phone, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 pt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Hubungi Kami</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ada pertanyaan atau butuh bantuan? Kami di sini untuk membantu Anda berkembang.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Illustration & Contact Details */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-sm border border-border h-full flex flex-col relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            {/* Illustration */}
            <div className="w-full flex-1 flex flex-col items-center justify-center mb-8 relative z-10">
              <img 
                src="/contact-illustration-2.png" 
                alt="Contact Illustration" 
                className="w-full max-w-sm h-[320px] lg:h-[380px] object-contain drop-shadow-sm mix-blend-darken"
              />
            </div>
            
            {/* Contact Details */}
            <div className="space-y-6 w-full mt-auto relative z-10 border-t border-[#C5DBC8]/50 pt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-100/50 text-brand-600 rounded-lg shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-brand-600 mb-1">Kantor Pusat</h3>
                  <p className="text-foreground font-medium text-sm leading-relaxed">Prambon, Kabupaten Nganjuk,<br />Jawa Timur, Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-100/50 text-brand-600 rounded-lg shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-brand-600 mb-1">Nomor Telepon</h3>
                  <p className="text-foreground font-medium text-sm">085649146292</p>
                </div>
              </div>
              
              <div className="pt-2">
                <a 
                  href="https://wa.me/6285649146292" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white hover:bg-[#1EBE5D] rounded-xl font-bold transition-all shadow-md hover:-translate-y-1"
                >
                  <MessageCircle className="h-6 w-6" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-sm border border-border h-full flex flex-col">
            <h2 className="text-3xl font-bold text-foreground mb-2">Hubungi Kami</h2>
            <p className="text-foreground/70 mb-8">Kami siap membantu! Ada yang bisa kami bantu?</p>
            <form className="space-y-6 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nama Depan</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Budi" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nama Belakang</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Santoso" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subjek</label>
                <select className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option>Pertanyaan Umum</option>
                  <option>Bantuan Pendaftaran Petani</option>
                  <option>Kemitraan Pembeli</option>
                  <option>Masalah Teknis</option>
                </select>
              </div>
              
              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-sm font-medium text-foreground">Pesan</label>
                <textarea className="w-full flex-1 p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none" placeholder="Bagaimana kami bisa membantu Anda?"></textarea>
              </div>
              
              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 shadow-md">
                  <Send className="h-5 w-5" /> Kirim Pesan
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
