import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Badge from "../components/atoms/Badge";
import ProductModal from "../components/organisms/ProductModal";
import ConfirmModal from "../components/organisms/ConfirmModal";
import { formatRupiah } from "../data/initialProducts";

export default function ProductDetailPage({ products = [], isLoading = false, onSaveProduct, onDeleteProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === String(id));

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="xp-panel" style={{ textAlign: "center", padding: "32px" }}>
        <div className="xp-panel-title">Detail Produk</div>
        <div style={{ fontSize: "11px", color: "#555" }}>Memuat detail produk dari Express API...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="xp-panel" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
        <div className="xp-panel-title">Produk Tidak Ditemukan</div>
        <div style={{ padding: "24px 16px" }}>
          <div style={{ fontSize: "11px", color: "#555", marginBottom: "16px", lineHeight: "1.6" }}>
            Produk dengan ID <strong>#{id}</strong> tidak terdaftar dalam sistem inventaris atau mungkin telah dihapus.
          </div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <Link to="/products" className="xp-button primary">Kembali ke Katalog Produk</Link>
            <Link to="/" className="xp-button">Buka Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  async function handleSaveEdit(updatedData) {
    await onSaveProduct(updatedData);
    setIsEditModalOpen(false);
  }

  async function handleConfirmDelete() {
    await onDeleteProduct(product.id);
    navigate("/products");
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
        <div className="xp-breadcrumb">
          <Link to="/products">Produk</Link> &gt; {product.name}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button type="button" className="xp-button edit-btn" onClick={() => setIsEditModalOpen(true)}>
            Edit Produk
          </button>
          <button type="button" className="xp-button danger" onClick={() => setIsDeleteModalOpen(true)}>
            Hapus
          </button>
        </div>
      </div>

      <div className="xp-panel">
        <div className="xp-panel-title">{product.name}</div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
          <Badge variant="purple">{product.category}</Badge>
          <span style={{ fontFamily: "monospace", fontSize: "11px", border: "1px solid #aca899", padding: "1px 6px", background: "#fff" }}>
            SKU: {product.sku || `PRD-${product.id}`}
          </span>
          <span style={{ fontSize: "11px", color: "#777" }}>ID #{product.id}</span>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{formatRupiah(product.price)}</span>
          {"  "}
          {isOutOfStock ? (
            <Badge variant="danger">Stok Habis (0)</Badge>
          ) : isLowStock ? (
            <Badge variant="warning">Stok Menipis: Tersisa {product.stock} unit</Badge>
          ) : (
            <Badge variant="success">Tersedia ({product.stock} unit)</Badge>
          )}
        </div>

        <div className="xp-inset-box" style={{ marginBottom: "12px" }}>
          <div style={{ fontWeight: "bold", fontSize: "10px", textTransform: "uppercase", color: "#555", marginBottom: "6px" }}>Deskripsi Produk</div>
          <p style={{ lineHeight: "1.6" }}>
            {product.description || "Tidak ada deskripsi detail yang dicantumkan untuk produk ini."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "12px" }}>
          <div className="xp-inset-box" style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: "10px", color: "#555", marginBottom: "3px" }}>Kategori</div>
            <div style={{ fontWeight: "bold" }}>{product.category}</div>
          </div>
          <div className="xp-inset-box" style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: "10px", color: "#555", marginBottom: "3px" }}>Sisa Stok</div>
            <div style={{ fontWeight: "bold" }}>{product.stock} unit</div>
          </div>
          <div className="xp-inset-box" style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: "10px", color: "#555", marginBottom: "3px" }}>Terdaftar Pada</div>
            <div style={{ fontWeight: "bold" }}>
              {product.createdAt
                ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(product.createdAt))
                : "Tidak tersedia"}
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isEditModalOpen}
        initialData={product}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Produk Ini?"
        message={`Apakah Anda yakin ingin menghapus produk "${product.name}" secara permanen? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus Sekarang"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
