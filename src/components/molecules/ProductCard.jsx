import React from "react";
import { Link } from "react-router-dom";
import Badge from "../atoms/Badge";
import { formatRupiah } from "../../data/initialProducts";

export default function ProductCard({ product, onEdit, onDelete }) {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="xp-product-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <Badge variant="purple">{product.category}</Badge>
        {isOutOfStock ? (
          <Badge variant="danger">Stok Habis</Badge>
        ) : isLowStock ? (
          <Badge variant="warning">Sisa {product.stock}</Badge>
        ) : (
          <Badge variant="success">Tersedia ({product.stock})</Badge>
        )}
      </div>

      <div className="xp-product-id">{product.sku || `PRD-${product.id}`}</div>
      <div className="xp-product-name">{product.name}</div>
      <div style={{ fontSize: "11px", color: "#555", marginBottom: "8px", minHeight: "28px" }}>
        {product.description || "Tidak ada deskripsi tambahan."}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #aca899", paddingTop: "6px", marginBottom: "8px" }}>
        <div>
          <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase" }}>Harga</div>
          <div className="xp-product-price">{formatRupiah(product.price)}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "10px", color: "#666", textTransform: "uppercase" }}>Stok</div>
          <div style={{ fontWeight: "bold", color: isLowStock ? "#cc8800" : "#000" }}>
            {product.stock} unit
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #aca899", paddingTop: "6px" }}>
        <Link to={`/products/${product.id}`} className="xp-button edit-btn" style={{ minWidth: "auto", padding: "2px 8px", fontSize: "11px" }}>
          Detail
        </Link>
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            type="button"
            onClick={() => onEdit(product)}
            title="Edit Produk"
            className="xp-button edit-btn"
            style={{ minWidth: "auto", padding: "2px 8px" }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            title="Hapus Produk"
            className="xp-button danger"
            style={{ minWidth: "auto", padding: "2px 8px" }}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
