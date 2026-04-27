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
    name: "Red Chili Premium",
    price: 45000,
    qualityGrade: "Grade A",
    category: "Rempah",
    location: "Jawa Barat",
    dateAdded: "2023-11-01",
    image: "https://images.unsplash.com/photo-1590680076043-424a1b02b545?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f1",
    farmerName: "Budi Santoso",
  },
  {
    id: "p2",
    name: "Fresh Mustard Greens",
    price: 15000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Tengah",
    dateAdded: "2023-11-10",
    image: "https://images.unsplash.com/photo-1628773822503-ae4a8960fa01?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f2",
    farmerName: "Ahmad Yani",
  },
  {
    id: "p3",
    name: "Cherry Tomatoes",
    price: 25000,
    qualityGrade: "Grade B",
    category: "Buah",
    location: "Jawa Barat",
    dateAdded: "2023-10-15",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f1",
    farmerName: "Budi Santoso",
  },
  {
    id: "p4",
    name: "Green Beans",
    price: 18000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Timur",
    dateAdded: "2023-11-12",
    image: "https://images.unsplash.com/photo-1590311825124-73ec5233cb0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f3",
    farmerName: "Siti Aminah",
  },
  {
    id: "p5",
    name: "Russet Potato",
    price: 22000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Sumatera Utara",
    dateAdded: "2023-11-05",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f4",
    farmerName: "Joko Widodo",
  },
  {
    id: "p6",
    name: "Organic Garlic",
    price: 32000,
    qualityGrade: "Grade A",
    category: "Rempah",
    location: "Jawa Tengah",
    dateAdded: "2023-11-15",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f2",
    farmerName: "Ahmad Yani",
  },
  {
    id: "p7",
    name: "Sweet Corn",
    price: 12000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Barat",
    dateAdded: "2023-11-18",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f1",
    farmerName: "Budi Santoso",
  },
  {
    id: "p8",
    name: "Organic Carrots",
    price: 18000,
    qualityGrade: "Grade A",
    category: "Sayuran",
    location: "Jawa Barat",
    dateAdded: "2023-11-20",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    farmerId: "f5",
    farmerName: "Dedi Suherman",
  },
  {
    id: "p9",
    name: "Red Onion Super",
    price: 28000,
    qualityGrade: "Grade A",
    category: "Rempah",
    location: "Nusa Tenggara Barat",
    dateAdded: "2023-11-22",
    image: "https://images.unsplash.com/photo-1508747703725-71977713d542?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
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
    name: "NPK Mutiara Fertilizer 16-16-16 (50kg)",
    price: 850000,
    category: "Pupuk",
    location: "Jawa Barat",
    dateAdded: "2023-10-01",
    image: "https://images.unsplash.com/photo-1592424090710-1c39050868f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "PT Pupuk Tani Sejahtera",
  },
  {
    id: "s2",
    name: "Premium Tomato Seeds (10g)",
    price: 45000,
    category: "Benih",
    location: "Jawa Tengah",
    dateAdded: "2023-11-02",
    image: "https://images.unsplash.com/photo-1595804561081-3aa0bc8801d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Agro Seed Nusantara",
  },
  {
    id: "s3",
    name: "Organic Compost (10kg)",
    price: 35000,
    category: "Pupuk",
    location: "Jawa Timur",
    dateAdded: "2023-10-20",
    image: "https://images.unsplash.com/photo-1611130383184-780c1021bc27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Bumi Subur Organik",
  },
  {
    id: "s4",
    name: "Heavy Duty Farming Hoe",
    price: 120000,
    category: "Alat",
    location: "Jawa Barat",
    dateAdded: "2023-09-15",
    image: "https://images.unsplash.com/photo-1615569420063-e380fb142a73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Toko Besi Tani",
  },
  {
    id: "s5",
    name: "Bio-Pesticide Neem Oil (1L)",
    price: 75000,
    category: "Pestisida",
    location: "Sumatera Utara",
    dateAdded: "2023-11-11",
    image: "https://images.unsplash.com/photo-1628186175628-98eec6476103?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Green Care Pest",
  },
  {
    id: "s6",
    name: "Electric Sprayer 16L",
    price: 550000,
    category: "Alat",
    location: "Jawa Timur",
    dateAdded: "2023-11-15",
    image: "https://images.unsplash.com/photo-1592832122594-c0c6bad718b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Agro Tech Solution",
  },
  {
    id: "s7",
    name: "Chili F1 Seeds Hybrid",
    price: 65000,
    category: "Benih",
    location: "Jawa Tengah",
    dateAdded: "2023-11-20",
    image: "https://images.unsplash.com/photo-1595804561081-3aa0bc8801d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Agro Seed Nusantara",
  },
  {
    id: "s8",
    name: "Urea Fertilizer Non-Subsidy",
    price: 450000,
    category: "Pupuk",
    location: "Kalimantan Selatan",
    dateAdded: "2023-11-25",
    image: "https://images.unsplash.com/photo-1592424090710-1c39050868f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Pupuk Kalimantan",
  },
  {
    id: "s9",
    name: "Grass Cutter Machine",
    price: 1850000,
    category: "Alat",
    location: "Jakarta",
    dateAdded: "2023-11-28",
    image: "https://images.unsplash.com/photo-1615569420063-e380fb142a73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    supplierName: "Toko Mesin Tani",
  },
];

export const dummyTraceability: Record<string, TraceabilityRecord> = {
  "TRC-88219A": {
    id: "TRC-88219A",
    productId: "p1",
    productName: "Red Chili Premium",
    farmerName: "Budi Santoso",
    plantingDate: "2023-08-15",
    harvestDate: "2023-11-20",
    distributionDate: "2023-11-22",
    location: "Lembang, West Java",
    status: "Delivered to Market",
  },
  "TRC-55421B": {
    id: "TRC-55421B",
    productId: "p2",
    productName: "Fresh Mustard Greens",
    farmerName: "Ahmad Yani",
    plantingDate: "2023-10-05",
    harvestDate: "2023-11-18",
    distributionDate: "2023-11-19",
    location: "Pangalengan, West Java",
    status: "In Transit",
  }
};
