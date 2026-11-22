export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Buku Tulis Campus B5 50 Lembar",
    category: "Alat Tulis",
    price: 8500,
    stock: 45,
    sku: "AT-B5-001",
    description: "Buku tulis bergaris ukuran B5 dengan kertas berkualitas 70 GSM tebal dan tidak mudah tembus tinta.",
    createdAt: "2026-11-01"
  },
  {
    id: 2,
    name: "Pulpen Gel Erasable 0.5mm Hitam",
    category: "Alat Tulis",
    price: 6000,
    stock: 3,
    sku: "AT-PG-002",
    description: "Pulpen gel tinta hitam yang dapat dihapus menggunakan karet khusus di ujung tutup pulpen tanpa merusak kertas.",
    createdAt: "2026-11-02"
  },
  {
    id: 3,
    name: "Mouse Wireless Ergonomis Silent Click",
    category: "Elektronik",
    price: 135000,
    stock: 18,
    sku: "EL-MW-003",
    description: "Mouse nirkabel 2.4GHz dengan desain ergonomis, tombol silent click halus, dan sensor optik presisi hingga 1600 DPI.",
    createdAt: "2026-11-03"
  },
  {
    id: 4,
    name: "Keyboard Mekanikal Compact 68 Keys",
    category: "Elektronik",
    price: 450000,
    stock: 8,
    sku: "EL-KB-004",
    description: "Keyboard mekanikal layout 68% dengan switch brown tactile, konektivitas kabel Type-C lepas-pasang, dan lampu latar RGB.",
    createdAt: "2026-11-04"
  },
  {
    id: 5,
    name: "Stapler Heavy Duty No. 10",
    category: "Perlengkapan Kantor",
    price: 28000,
    stock: 2,
    sku: "PK-ST-005",
    description: "Stapler logam tahan banting dengan kapasitas jilid hingga 20 lembar kertas HVS menggunakan isi staples ukuran nomor 10.",
    createdAt: "2026-11-05"
  },
  {
    id: 6,
    name: "Kertas HVS A4 80 GSM PaperOne (1 Rim)",
    category: "Perlengkapan Kantor",
    price: 54000,
    stock: 25,
    sku: "PK-HVS-006",
    description: "Kertas HVS putih bersih ukuran A4 dengan gramatur 80 GSM, isi 500 lembar per rim untuk kebutuhan print dan fotokopi harian.",
    createdAt: "2026-11-06"
  },
  {
    id: 7,
    name: "Buku Pemrograman Web Modern dengan React",
    category: "Buku & Bacaan",
    price: 95000,
    stock: 12,
    sku: "BK-PWM-007",
    description: "Buku panduan komprehensif membangun aplikasi web interaktif berbasis Single-Page Application (SPA) menggunakan React dan Tailwind.",
    createdAt: "2026-11-07"
  },
  {
    id: 8,
    name: "Tas Laptop Ransel Anti-Air 15.6 Inch",
    category: "Aksesoris",
    price: 189000,
    stock: 4,
    sku: "AK-TL-008",
    description: "Ransel laptop kompartemen ganda berbahan polyester oxford tahan air dilengkapi bantalan busa tebal pelindung guncangan.",
    createdAt: "2026-11-08"
  }
];

export const CATEGORIES = [
  "Semua Kategori",
  "Alat Tulis",
  "Elektronik",
  "Perlengkapan Kantor",
  "Buku & Bacaan",
  "Aksesoris"
];

export const STORAGE_KEY_PRODUCTS = "pweb_products_data_v1";
export const STORAGE_KEY_SETTINGS = "pweb_products_settings_v1";

export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number || 0);
}
