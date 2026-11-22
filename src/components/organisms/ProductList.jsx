import React from "react";
import { Link } from "react-router-dom";
import Badge from "../atoms/Badge";
import { formatRupiah } from "../../data/initialProducts";

export default function ProductList({ products = [], onEdit, onDelete }) {
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
    <div className="xp-inset-box" style={{ padding: "0", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
          <thead>
            <tr style={{ background: "#ece9d8", borderBottom: "1px solid #aca899" }}>
              <th style={{ padding: "5px 10px", textAlign: "left", fontWeight: "bold" }}>SKU</th>
              <th style={{ padding: "5px 10px", textAlign: "left", fontWeight: "bold" }}>Nama Produk</th>
              <th style={{ padding: "5px 10px", textAlign: "left", fontWeight: "bold" }}>Kategori</th>
              <th style={{ padding: "5px 10px", textAlign: "right", fontWeight: "bold" }}>Harga</th>
              <th style={{ padding: "5px 10px", textAlign: "center", fontWeight: "bold" }}>Stok</th>
              <th style={{ padding: "5px 10px", textAlign: "center", fontWeight: "bold" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const isLowStock = product.stock > 0 && product.stock <= 5;
              const isOutOfStock = product.stock <= 0;
              return (
                <tr key={product.id} style={{ borderBottom: "1px solid #e0ddd5", background: index % 2 === 0 ? "#fff" : "#f5f3ee" }}>
                  <td style={{ padding: "5px 10px", fontFamily: "monospace", color: "#555" }}>
                    {product.sku || `PRD-${product.id}`}
                  </td>
                  <td style={{ padding: "5px 10px" }}>
                    <div style={{ fontWeight: "bold" }}>{product.name}</div>
                    <div style={{ color: "#777", fontSize: "10px" }}>{product.description}</div>
                  </td>
                  <td style={{ padding: "5px 10px" }}>
                    <Badge variant="purple">{product.category}</Badge>
                  </td>
                  <td style={{ padding: "5px 10px", textAlign: "right", fontWeight: "bold" }}>
                    {formatRupiah(product.price)}
                  </td>
                  <td style={{ padding: "5px 10px", textAlign: "center" }}>
                    {isOutOfStock ? (
                      <Badge variant="danger">Habis</Badge>
                    ) : isLowStock ? (
                      <Badge variant="warning">{product.stock} unit</Badge>
                    ) : (
                      <span style={{ fontWeight: "bold" }}>{product.stock} unit</span>
                    )}
                  </td>
                  <td style={{ padding: "5px 10px", textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "3px", justifyContent: "center" }}>
                      <Link to={`/products/${product.id}`} className="xp-button edit-btn" style={{ minWidth: "auto", padding: "1px 7px" }}>
                        Detail
                      </Link>
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        title="Edit Produk"
                        className="xp-button edit-btn"
                        style={{ minWidth: "auto", padding: "1px 7px" }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product)}
                        title="Hapus Produk"
                        className="xp-button danger"
                        style={{ minWidth: "auto", padding: "1px 7px" }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
