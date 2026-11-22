import React from "react";
import ProductCard from "../molecules/ProductCard";

export default function ProductGrid({ products = [], onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="xp-inset-box" style={{ textAlign: "center", padding: "32px" }}>
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Tidak ada produk ditemukan</div>
        <div style={{ fontSize: "11px", color: "#666" }}>
          Coba ganti kata kunci pencarian atau bersihkan filter kategori yang aktif.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "10px" }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
