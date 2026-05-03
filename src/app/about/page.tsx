import Image from "next/image";
import {
  CheckCircle2,
  Sprout,
  BarChart2,
  Truck,
  PackageX,
  Users,
  TestTube2,
  PackageCheck,
  QrCode,
  ChevronRight,
  Target,
  Mountain,
  Puzzle,
  Clock,
  Search,
  Leaf
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base pb-20">

      {/* Full-Width Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-20 overflow-hidden bg-base">
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
          <img
            src="/gambar-petani-about.jpg"
            alt="Tentang FARMELO Placeholder"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient to fade the image on the left side smoothly into the bg-base */}
          <div className="absolute inset-0 bg-gradient-to-r from-base via-base/90 to-transparent lg:via-base/20"></div>
          {/* Gradient for mobile readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent lg:hidden"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-2xl pt-10">
            <h2 className="text-xl md:text-2xl font-bold text-brand-500 tracking-widest mb-1 font-poppins uppercase">
              Tentang
            </h2>
            <h1 className="text-6xl md:text-[90px] font-black text-[#0A3215] tracking-tight mb-6 font-poppins leading-none">
              FARMELO
            </h1>
            <p className="text-lg md:text-[20px] text-neutral-800/90 mb-10 max-w-[480px] font-medium leading-relaxed font-sans">
              Mengintegrasikan sistem pertanian dari ladang hingga pasar secara efisien, transparan, dan berkelanjutan.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 flex flex-col gap-8 md:gap-12">

        {/* TENTANG FARMELO CARD */}
        <div className="bg-[#F8FBF8] border border-neutral-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="flex items-center gap-6 md:w-1/3 shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-brand-500 text-brand-500 flex items-center justify-center shrink-0">
              <Sprout className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A3215] font-poppins leading-tight">
              TENTANG<br />FARMELO
            </h2>
          </div>
          <div className="md:w-2/3 md:border-l border-neutral-300 md:pl-8">
            <p className="text-[#0A3215] leading-relaxed font-medium">
              FARMELO merupakan sistem terintegrasi yang menghubungkan petani, proses produksi, hingga distribusi ke pasar dalam satu ekosistem. FARMELO dirancang untuk mengatasi ketidakefisienan dalam rantai pasok pertanian melalui pendekatan berbasis data, pendampingan budidaya, serta sistem distribusi yang lebih singkat dan transparan.
            </p>
          </div>
        </div>

        {/* PERMASALAHAN VS SOLUSI */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Permasalahan */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 h-full shadow-sm">
            <h3 className="text-xl font-bold text-[#0A3215] font-poppins mb-8">PERMASALAHAN YANG DIANGKAT</h3>
            <ul className="space-y-6">
              {[
                { icon: <Sprout className="w-6 h-6 text-[#0A3215]" />, text: "Rendahnya produktivitas akibat pengelolaan lahan yang belum optimal" },
                { icon: <BarChart2 className="w-6 h-6 text-[#0A3215]" />, text: "Ketidaksesuaian antara produksi dan kebutuhan pasar" },
                { icon: <Truck className="w-6 h-6 text-[#0A3215]" />, text: "Rantai distribusi yang panjang dan tidak efisien" },
                { icon: <PackageX className="w-6 h-6 text-[#0A3215]" />, text: "Tingginya kehilangan hasil pascapanen" },
                { icon: <Users className="w-6 h-6 text-[#0A3215]" />, text: "Kurangnya transparansi produk kepada konsumen" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-neutral-600 font-medium text-[15px]">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex justify-center text-brand-600">
            <ChevronRight className="w-16 h-16 opacity-80" strokeWidth={3} />
          </div>

          {/* Solusi */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 h-full shadow-sm">
            <h3 className="text-xl font-bold text-[#0A3215] font-poppins mb-8">SOLUSI FARMELO</h3>
            <ul className="space-y-6">
              {[
                { icon: <TestTube2 className="w-6 h-6 text-[#0A3215]" />, text: "Analisis tanah dan rekomendasi budidaya berbasis data untuk hasil optimal" },
                { icon: <Users className="w-6 h-6 text-[#0A3215]" />, text: "Pendampingan produksi dan budidaya oleh tim ahli" },
                { icon: <PackageCheck className="w-6 h-6 text-[#0A3215]" />, text: "Standardisasi kualitas melalui grading dan packaging" },
                { icon: <Truck className="w-6 h-6 text-[#0A3215]" />, text: "Distribusi langsung ke pasar dengan rantai pasok efisien" },
                { icon: <QrCode className="w-6 h-6 text-[#0A3215]" />, text: "Sistem traceability berbasis QR Code untuk transparansi produk" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-neutral-600 font-medium text-[15px]">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* VISI & MISI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="bg-[#F8FBF8] border border-neutral-200 rounded-3xl p-8 flex flex-col sm:flex-row gap-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#0A3215] flex items-center justify-center shrink-0 text-white">
              <Target className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A3215] font-poppins mb-3">VISI</h3>
              <p className="text-neutral-600 font-medium">
                Menjadi sistem terintegrasi terdepan dalam menghubungkan pertanian dari hulu hingga hilir secara efisien, transparan, dan berkelanjutan.
              </p>
            </div>
          </div>

          <div className="bg-[#F8FBF8] border border-neutral-200 rounded-3xl p-8 flex flex-col sm:flex-row gap-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#0A3215] flex items-center justify-center shrink-0 text-white">
              <Mountain className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A3215] font-poppins mb-4">MISI</h3>
              <ul className="space-y-3">
                {[
                  "Meningkatkan produktivitas petani melalui pendekatan berbasis data",
                  "Mengoptimalkan efisiensi rantai pasok pertanian",
                  "Meningkatkan nilai tambah produk pertanian",
                  "Mewujudkan transparansi antara petani dan konsumen"
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#0A3215] shrink-0 mt-0.5" />
                    <span className="text-neutral-600 font-medium text-[14px]">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* NILAI KAMI */}
        <div className="mt-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-[#0A3215] mb-8 font-poppins">NILAI KAMI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Puzzle className="w-8 h-8 text-brand-600" />, title: "Integrasi", desc: "Menghubungkan seluruh rantai pasok pertanian dalam satu ekosistem." },
              { icon: <Clock className="w-8 h-8 text-brand-600" />, title: "Efisiensi", desc: "Mengurangi biaya dan waktu dalam setiap proses distribusi." },
              { icon: <Search className="w-8 h-8 text-brand-600" />, title: "Transparansi", desc: "Memberikan informasi produk yang jelas dan dapat dipercaya." },
              { icon: <Leaf className="w-8 h-8 text-brand-600" />, title: "Keberlanjutan", desc: "Mendukung praktik pertanian berkelanjutan untuk masa depan yang lebih baik." }
            ].map((nilai, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl border border-neutral-200 flex flex-col md:flex-row lg:flex-col items-center gap-4 text-center md:text-left lg:text-center shadow-sm hover:border-brand-300 transition-colors">
                <div className="w-20 h-20 rounded-full bg-[#F8FBF8] border-2 border-brand-100 flex items-center justify-center shrink-0">
                  {nilai.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A3215] mb-2">{nilai.title}</h3>
                  <p className="text-neutral-500 text-sm font-medium">{nilai.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Dummy Team Members */}
            {[
              { name: 'Eka Wahyu Belianna', role: 'Co-Founder & Specialist', photo: '/foto-berlin.jpg' },
              { name: 'Intan Desi Purnomo', role: 'Co-Founder & Specialist', photo: '/foto-intan.jpg' },
              { name: 'Riski Dwi Nurcahyo', role: 'Co-Founder & Specialist', photo: '/foto-riski.jpg' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-brand-600 text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
