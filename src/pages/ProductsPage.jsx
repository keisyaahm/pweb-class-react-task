import React, { useState, useMemo } from "react";
import ProductGrid from "../components/organisms/ProductGrid";
import ProductList from "../components/organisms/ProductList";
import ProductModal from "../components/organisms/ProductModal";
import ConfirmModal from "../components/organisms/ConfirmModal";
import { CATEGORIES } from "../data/initialProducts";

export default function ProductsPage({
  products = [],
  onSaveProduct,
  onDeleteProduct,
  displayMode = "grid",
  onChangeDisplayMode
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [sortBy, setSortBy] = useState("default");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "Semua Kategori" || product.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          (product.sku && product.sku.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "stock-asc": return a.stock - b.stock;
          case "stock-desc": return b.stock - a.stock;
          case "name-asc": return a.name.localeCompare(b.name);
          default: return b.id - a.id;
        }
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  function handleOpenCreate() {
    setEditingProduct(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  function handleOpenDelete(product) {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  }

  async function handleConfirmDelete() {
    if (productToDelete) {
      await onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  }

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedCategory("Semua Kategori");
    setSortBy("default");
  }

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "Semua Kategori" || sortBy !== "default";

  return (
    <div>
      <div className="xp-panel">
        <div className="xp-panel-title">Daftar Produk</div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          <div style={{ fontSize: "11px", color: "#555" }}>Tambah, edit, cari, dan hapus data produk.</div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button
              type="button"
              className={displayMode === "grid" ? "xp-button primary" : "xp-button"}
              style={{ minWidth: "auto", padding: "2px 8px" }}
              onClick={() => onChangeDisplayMode("grid")}
              title="Tampilan Grid"
              aria-label="Grid Mode"
            >
              Grid
            </button>
            <button
              type="button"
              className={displayMode === "list" ? "xp-button primary" : "xp-button"}
              style={{ minWidth: "auto", padding: "2px 8px" }}
              onClick={() => onChangeDisplayMode("list")}
              title="Tampilan Tabel"
              aria-label="List Mode"
            >
              Tabel
            </button>
            <button type="button" className="xp-button primary" onClick={handleOpenCreate}>
              + Tambah Produk
            </button>
          </div>
        </div>

        <div className="xp-toolbar">
          <input
            type="text"
            className="xp-input"
            placeholder="Cari berdasarkan nama, SKU, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: "2" }}
          />
          <select
            className="xp-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ flex: "1" }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="xp-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ flex: "1" }}
          >
            <option value="default">Urutan: Terbaru</option>
            <option value="price-asc">Harga: Terendah</option>
            <option value="price-desc">Harga: Tertinggi</option>
            <option value="stock-asc">Stok: Tersedikit</option>
            <option value="stock-desc">Stok: Terbanyak</option>
            <option value="name-asc">Nama: A - Z</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "#555", marginTop: "6px", marginBottom: "10px" }}>
          <span>
            Menampilkan <strong>{filteredProducts.length}</strong> dari <strong>{products.length}</strong> produk
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              style={{ color: "#cc0000", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontSize: "11px" }}
            >
              Reset Filter
            </button>
          )}
        </div>

        {displayMode === "grid" ? (
          <ProductGrid
            products={filteredProducts}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        ) : (
          <ProductList
            products={filteredProducts}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        initialData={editingProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveProduct}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Konfirmasi Hapus Produk"
        message={
          productToDelete
            ? `Apakah Anda yakin ingin menghapus produk "${productToDelete.name}" (SKU: ${productToDelete.sku}) dari sistem? Data yang terhapus tidak dapat dipulihkan.`
            : "Hapus produk ini?"
        }
        confirmLabel="Ya, Hapus Produk"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
