# 48ORINESHOP - Manajemen Produk

Aplikasi manajemen produk berbasis React dengan tema antarmuka Windows XP Luna. Dibuat sebagai tugas praktikum Pemrograman Web menggunakan React dan Vite.

## Teknologi

- React 18
- Vite 6
- CSS murni (tanpa framework CSS)

## Fitur

- Tampilkan daftar produk dalam grid 3 kolom
- Tambah produk baru melalui popup modal
- Edit data produk yang sudah ada
- Hapus produk dengan konfirmasi
- Pencarian produk berdasarkan nama secara real-time
- Tema antarmuka Windows XP Luna (title bar biru, tombol 3D, font Tahoma)

## Instalasi dan Menjalankan

```bash
npm install
npm run dev
```

Buka browser di `http://localhost:5173`

## Struktur Proyek

```
src/
  components/
    ProductCard.jsx   - Kartu produk dengan tombol Edit dan Hapus
    SearchBar.jsx     - Input pencarian produk
    AddModal.jsx      - Popup tambah produk baru
    EditModal.jsx     - Popup edit data produk
    DeleteModal.jsx   - Popup konfirmasi hapus produk
  data/
    products.js       - Data produk awal
  App.jsx             - Komponen utama dan manajemen state
  index.css           - Gaya global tema Windows XP Luna
  main.jsx            - Titik masuk aplikasi
```

## Skenario Pengujian

| No | Skenario | Langkah | Hasil yang Diharapkan |
|----|----------|---------|----------------------|
| 1 | Melihat daftar produk | Buka halaman utama | Menampilkan 5 produk dalam grid 3 kolom |
| 2 | Mencari produk | Ketik nama di kolom pencarian | Daftar produk terfilter sesuai kata kunci |
| 3 | Menambah produk | Klik "+ Tambah Produk", isi form, klik "Simpan Produk" | Produk baru muncul di grid |
| 4 | Validasi harga kosong | Tambah produk tanpa isi harga, klik "Simpan Produk" | Muncul pesan "Harga harus lebih dari 0" |
| 5 | Mengedit produk | Klik "Edit" pada kartu produk, ubah data, klik "Simpan Perubahan" | Data produk diperbarui |
| 6 | Menghapus produk | Klik "Hapus" pada kartu produk, klik "Hapus Produk" | Produk dihapus dari daftar |
| 7 | Membatalkan hapus | Klik "Hapus" lalu klik "Batal" | Produk tetap ada |
| 8 | Pencarian tidak ditemukan | Ketik kata yang tidak ada | Tampil pesan "Produk tidak ditemukan" |
