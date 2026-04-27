import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 pt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Have questions or need support? We're here to help you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <div className="bg-[#DDECDF] border border-[#C5DBC8] rounded-2xl p-8 md:p-10 text-[#0A3215] shadow-sm h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none text-[#0A3215]">
                <MapPin className="h-48 w-48" />
              </div>
              
              <h2 className="text-3xl font-bold mb-8 text-[#0A3215]">Get in Touch</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white shadow-sm border border-brand-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1 text-[#0A3215]">Head Office</h3>
                    <p className="text-brand-700">Jl. Pertanian No. 123<br />Bandung, West Java<br />Indonesia 40111</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white shadow-sm border border-brand-100 rounded-lg">
                    <Phone className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1 text-[#0A3215]">Phone</h3>
                    <p className="text-brand-700">+62 812 3456 7890<br />Mon-Fri, 8am-5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white shadow-sm border border-brand-100 rounded-lg">
                    <Mail className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1 text-[#0A3215]">Email</h3>
                    <p className="text-brand-700">hello@farmelo.com<br />support@farmelo.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-brand-200 relative z-10">
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl font-bold transition-all shadow-sm"
                >
                  <MessageCircle className="h-6 w-6" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-sm border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input type="email" className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <select className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  <option>General Inquiry</option>
                  <option>Farmer Registration Support</option>
                  <option>Buyer Partnership</option>
                  <option>Technical Issue</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea rows={5} className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
              
              <button type="submit" className="w-full py-4 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 shadow-md">
                <Send className="h-5 w-5" /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
