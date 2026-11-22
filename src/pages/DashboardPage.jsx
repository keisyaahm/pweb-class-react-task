import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";
import StatCard from "../components/molecules/StatCard";
import { formatRupiah } from "../data/initialProducts";

export default function DashboardPage({ products = [], onOpenCreate }) {
  const totalProducts = products.length;
  const totalStock = products.reduce((total, product) => total + Number(product.stock || 0), 0);
  const totalAssetValue = products.reduce(
    (total, product) => total + Number(product.price || 0) * Number(product.stock || 0),
    0
  );
  const averagePrice = totalProducts
    ? Math.round(products.reduce((total, product) => total + Number(product.price || 0), 0) / totalProducts)
    : 0;

  const lowStockProducts = products.filter((product) => Number(product.stock) <= 5);
  const categoryCount = products.reduce((result, product) => {
    result[product.category] = (result[product.category] || 0) + 1;
    return result;
  }, {});

  return (
    <div>
      <div className="xp-panel">
        <div className="xp-panel-title">Dashboard Produk</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
          <div style={{ fontSize: "11px", color: "#555" }}>Ringkasan data produk yang tersimpan di PostgreSQL.</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <Link to="/products" className="xp-button">Lihat Produk</Link>
            <button type="button" className="xp-button primary" onClick={onOpenCreate}>+ Tambah Produk</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px", marginBottom: "14px" }}>
          <StatCard title="Jumlah Produk" value={totalProducts} subtitle="Jenis produk" />
          <StatCard title="Total Stok" value={totalStock.toLocaleString("id-ID")} subtitle="Unit tersedia" />
          <StatCard title="Nilai Inventaris" value={formatRupiah(totalAssetValue)} subtitle="Harga dikali stok" />
          <StatCard title="Rata-rata Harga" value={formatRupiah(averagePrice)} subtitle="Per produk" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "10px" }}>
          <div className="xp-inset-box" style={{ padding: "0" }}>
            <div style={{ background: "#ece9d8", padding: "4px 10px", borderBottom: "1px solid #aca899", fontWeight: "bold", fontSize: "11px" }}>
              Produk Terbaru
            </div>
            {products.slice(0, 5).map((product) => (
              <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderBottom: "1px solid #f0ede6" }}>
                <div>
                  <div style={{ fontWeight: "bold" }}>{product.name}</div>
                  <div style={{ fontSize: "10px", color: "#666" }}>{product.category} &middot; {product.stock} unit</div>
                </div>
                <Link to={`/products/${product.id}`} style={{ color: "#0a246a", textDecoration: "underline", fontSize: "11px" }}>Detail</Link>
              </div>
            ))}
          </div>

          <div className="xp-inset-box" style={{ padding: "0" }}>
            <div style={{ background: "#ece9d8", padding: "4px 10px", borderBottom: "1px solid #aca899", fontWeight: "bold", fontSize: "11px" }}>
              Stok Menipis
            </div>
            {lowStockProducts.length === 0 ? (
              <div style={{ padding: "10px", fontSize: "11px", color: "#555" }}>Tidak ada stok menipis.</div>
            ) : (
              lowStockProducts.map((product) => (
                <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderBottom: "1px solid #f0ede6" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</div>
                    <div style={{ fontSize: "10px", color: "#666" }}>{product.sku}</div>
                  </div>
                  <span style={{ color: "#cc8800", fontWeight: "bold", fontSize: "11px", flexShrink: 0 }}>Sisa {product.stock}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="xp-panel">
        <div className="xp-panel-title">Jumlah per Kategori</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "8px" }}>
          {Object.entries(categoryCount).map(([category, count]) => (
            <div key={category} className="xp-inset-box" style={{ padding: "6px 10px" }}>
              <div style={{ fontSize: "10px", color: "#555" }}>{category}</div>
              <div style={{ fontWeight: "bold", fontSize: "13px" }}>{count} produk</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
