import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="xp-panel" style={{ maxWidth: "500px", margin: "40px auto", textAlign: "center" }}>
      <div className="xp-panel-title">Error 404 - Halaman Tidak Ditemukan</div>
      <div style={{ padding: "24px 16px" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>❓</div>
        <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
          Halaman Tidak Ditemukan
        </div>
        <p style={{ fontSize: "11px", color: "#555", marginBottom: "20px", lineHeight: "1.5" }}>
          Alamat URL yang Anda tuju tidak terdaftar dalam rute aplikasi atau mungkin telah dipindahkan.
        </p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <Link to="/products" className="xp-button primary">
            Kembali ke Produk
          </Link>
          <Link to="/" className="xp-button">
            Menuju Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
