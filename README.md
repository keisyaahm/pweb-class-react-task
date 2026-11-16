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
- Layout responsif: jendela aplikasi melebar pada desktop dan berubah menjadi 2 kolom atau 1 kolom pada layar kecil

## Instalasi dan Menjalankan

```bash
npm install
npm run dev
```

Buka browser di **http://localhost:5173** untuk mengecek aplikasi secara lokal.

Untuk membuat build produksi:

```bash
npm run build
```

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

| No | Skenario | Langkah | Hasil yang Diharapkan | Hasil Aktual |
|----|----------|---------|----------------------|--------------|
| 1 | Melihat daftar produk | Buka halaman utama | Menampilkan 5 produk dalam grid 3 kolom | Sesuai |
| 2 | Mencari produk | Ketik nama di kolom pencarian | Daftar produk terfilter sesuai kata kunci | Sesuai |
| 3 | Menambah produk | Klik "+ Tambah Produk", isi form, klik "Simpan Produk" | Produk baru muncul di grid | Sesuai |
| 4 | Validasi harga kosong | Tambah produk tanpa isi harga, klik "Simpan Produk" | Muncul pesan "Harga harus lebih dari 0" | Sesuai |
| 5 | Mengedit produk | Klik "Edit" pada kartu produk, ubah data, klik "Simpan Perubahan" | Data produk diperbarui | Sesuai |
| 6 | Menghapus produk | Klik "Hapus" pada kartu produk, klik "Hapus Produk" | Produk dihapus dari daftar | Sesuai |
| 7 | Membatalkan hapus | Klik "Hapus" lalu klik "Batal" | Produk tetap ada | Sesuai |
| 8 | Pencarian tidak ditemukan | Ketik kata yang tidak ada | Tampil pesan "Produk tidak ditemukan" | Sesuai |

## Bukti Pengujian

Screenshot berikut diambil dari aplikasi yang berjalan di `http://localhost:5173` menggunakan browser Chrome melalui script Puppeteer:

1. Halaman utama: [01-halaman-utama.png](docs/evidence/01-halaman-utama.png)
2. Pencarian produk: [02-pencarian-produk.png](docs/evidence/02-pencarian-produk.png)
3. Modal tambah produk: [03-modal-tambah-produk.png](docs/evidence/03-modal-tambah-produk.png)
4. Validasi harga kosong: [04-validasi-harga-kosong.png](docs/evidence/04-validasi-harga-kosong.png)
5. Produk baru ditambahkan: [05-produk-baru-ditambahkan.png](docs/evidence/05-produk-baru-ditambahkan.png)
6. Modal edit produk: [06-modal-edit-produk.png](docs/evidence/06-modal-edit-produk.png)
7. Produk berhasil diedit: [07-produk-berhasil-diedit.png](docs/evidence/07-produk-berhasil-diedit.png)
8. Modal hapus produk: [08-modal-hapus-produk.png](docs/evidence/08-modal-hapus-produk.png)
9. Membatalkan hapus: [09-batal-hapus-produk.png](docs/evidence/09-batal-hapus-produk.png)
10. Produk berhasil dihapus: [10-produk-berhasil-dihapus.png](docs/evidence/10-produk-berhasil-dihapus.png)
11. Pencarian tidak ditemukan: [11-pencarian-tidak-ditemukan.png](docs/evidence/11-pencarian-tidak-ditemukan.png)
