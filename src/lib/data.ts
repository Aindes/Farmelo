export interface Product {
  id: string;
  name: string;
  price: number;
  qualityGrade: string;
  category: string;
  location: string;
  dateAdded: string;
  image: string;
  farmerId: string;
  farmerName: string;
}

export interface TraceabilityRecord {
  id: string;
  productId: string;
  productName: string;
  farmerName: string;
  plantingDate: string;
  harvestDate: string;
  distributionDate: string;
  location: string;
  status: string;
}

export const dummyProducts: Product[] = [
  {
    id: "p1",
    name: "Cabai Merah Premium",
    price: 45000,
    qualityGrade: "Grade A",
    category: "Rempah",
    location: "Jawa Barat",
    dateAdded: "2023-11-01",
    image: "/D1.jpg",
    farmerId: "f1",
    farmerName: "Budi Santoso",
  },
  {
    id: "p2",
    name: "Sawi Hijau Segar",
    price: 15000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Tengah",
    dateAdded: "2023-11-10",
    image: "/D2.jpg",
    farmerId: "f2",
    farmerName: "Ahmad Yani",
  },
  {
    id: "p3",
    name: "Tomat Cherry",
    price: 25000,
    qualityGrade: "Grade B",
    category: "Buah",
    location: "Jawa Barat",
    dateAdded: "2023-10-15",
    image: "/D3.jpg",
    farmerId: "f1",
    farmerName: "Budi Santoso",
  },
  {
    id: "p4",
    name: "Buncis",
    price: 18000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Timur",
    dateAdded: "2023-11-12",
    image: "/D4.jpg",
    farmerId: "f3",
    farmerName: "Siti Aminah",
  },
  {
    id: "p5",
    name: "Kentang Russet",
    price: 22000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Sumatera Utara",
    dateAdded: "2023-11-05",
    image: "/D5.jpg",
    farmerId: "f4",
    farmerName: "Joko Widodo",
  },
  {
    id: "p6",
    name: "Bawang Putih Organik",
    price: 32000,
    qualityGrade: "Grade A",
    category: "Rempah",
    location: "Jawa Tengah",
    dateAdded: "2023-11-15",
    image: "/D6.jpg",
    farmerId: "f2",
    farmerName: "Ahmad Yani",
  },
  {
    id: "p7",
    name: "Jagung Manis",
    price: 12000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Barat",
    dateAdded: "2023-11-18",
    image: "/D7.jpg",
    farmerId: "f1",
    farmerName: "Budi Santoso",
  },
  {
    id: "p8",
    name: "Wortel Organik",
    price: 18000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Barat",
    dateAdded: "2023-11-20",
    image: "/D8.jpg",
    farmerId: "f5",
    farmerName: "Dedi Suherman",
  },
  {
    id: "p9",
    name: "Bawang Merah Super",
    price: 28000,
    qualityGrade: "Grade A",
    category: "Rempah",
    location: "Nusa Tenggara Barat",
    dateAdded: "2023-11-22",
    image: "/D9.jpg",
    farmerId: "f6",
    farmerName: "Made Wirawan",
  },
];

export interface Supply {
  id: string;
  name: string;
  price: number;
  category: string;
  location: string;
  dateAdded: string;
  image: string;
  supplierName: string;
}

export const dummySupplies: Supply[] = [
  {
    id: "s1",
    name: "Pupuk NPK Mutiara 16-16-16 (50kg)",
    price: 850000,
    category: "Pupuk",
    location: "Jawa Barat",
    dateAdded: "2023-10-01",
    image: "/E1.jpg",
    supplierName: "PT Pupuk Tani Sejahtera",
  },
  {
    id: "s2",
    name: "Benih Tomat Premium (10g)",
    price: 45000,
    category: "Benih",
    location: "Jawa Tengah",
    dateAdded: "2023-11-02",
    image: "/E2.jpg",
    supplierName: "Agro Seed Nusantara",
  },
  {
    id: "s3",
    name: "Kompos Organik (10kg)",
    price: 35000,
    category: "Pupuk",
    location: "Jawa Timur",
    dateAdded: "2023-10-20",
    image: "/E3.jpg",
    supplierName: "Bumi Subur Organik",
  },
  {
    id: "s4",
    name: "Cangkul Baja Super",
    price: 120000,
    category: "Alat",
    location: "Jawa Barat",
    dateAdded: "2023-09-15",
    image: "/E4.jpg",
    supplierName: "Toko Besi Tani",
  },
  {
    id: "s5",
    name: "Pestisida Nabati Minyak Mimba (1L)",
    price: 75000,
    category: "Pestisida",
    location: "Sumatera Utara",
    dateAdded: "2023-11-11",
    image: "/E5.jpg",
    supplierName: "Green Care Pest",
  },
  {
    id: "s6",
    name: "Sprayer Elektrik 16L",
    price: 550000,
    category: "Alat",
    location: "Jawa Timur",
    dateAdded: "2023-11-15",
    image: "/E6.jpg",
    supplierName: "Agro Tech Solution",
  },
  {
    id: "s7",
    name: "Benih Cabai F1 Hybrid",
    price: 65000,
    category: "Benih",
    location: "Jawa Tengah",
    dateAdded: "2023-11-20",
    image: "/E7.png",
    supplierName: "Agro Seed Nusantara",
  },
  {
    id: "s8",
    name: "Pupuk Urea Non-Subsidi",
    price: 450000,
    category: "Pupuk",
    location: "Kalimantan Selatan",
    dateAdded: "2023-11-25",
    image: "/E8.jpg",
    supplierName: "Pupuk Kalimantan",
  },
  {
    id: "s9",
    name: "Mesin Potong Rumput",
    price: 1850000,
    category: "Alat",
    location: "Jakarta",
    dateAdded: "2023-11-28",
    image: "/E9.jpg",
    supplierName: "Toko Mesin Tani",
  },
];

export const dummyTraceability: Record<string, TraceabilityRecord> = {
  "TRC-88219A": {
    id: "TRC-88219A",
    productId: "p1",
    productName: "Cabai Merah Premium",
    farmerName: "Budi Santoso",
    plantingDate: "2023-08-15",
    harvestDate: "2023-11-20",
    distributionDate: "2023-11-22",
    location: "Lembang, Jawa Barat",
    status: "Tiba di Pasar",
  },
  "TRC-55421B": {
    id: "TRC-55421B",
    productId: "p2",
    productName: "Sawi Hijau Segar",
    farmerName: "Ahmad Yani",
    plantingDate: "2023-10-05",
    harvestDate: "2023-11-18",
    distributionDate: "2023-11-19",
    location: "Pangalengan, Jawa Barat",
    status: "Dalam Perjalanan",
  }
};
