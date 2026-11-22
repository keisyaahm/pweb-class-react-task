import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";

export default function AppLayout({ totalProducts = 0, isLoading = false, apiError = "", onRetry }) {
  return (
    <div className="xp-window">
      <div className="xp-titlebar">
        <div className="xp-titlebar-left">
          <span className="xp-titlebar-icon">🛒</span>
          <span className="xp-titlebar-title">48ORINESHOP - Manajemen Produk</span>
        </div>
        <div className="xp-titlebar-buttons">
          <button type="button" className="xp-titlebar-btn minimize" aria-label="Minimize">_</button>
          <button type="button" className="xp-titlebar-btn maximize" aria-label="Maximize">□</button>
          <button type="button" className="xp-titlebar-btn close" aria-label="Close">✕</button>
        </div>
      </div>

      <Navbar totalProducts={totalProducts} />

      {isLoading && (
        <div style={{ background: "#fffbe6", borderBottom: "1px solid #e0c000", padding: "4px 12px", fontSize: "11px", textAlign: "center" }}>
          Mengambil data dari Express API...
        </div>
      )}

      {apiError && !isLoading && (
        <div style={{ background: "#fff0f0", borderBottom: "1px solid #cc0000", padding: "4px 12px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ color: "#cc0000", fontWeight: "bold" }}>{apiError}</span>
          <button type="button" onClick={onRetry} className="xp-button danger" style={{ minWidth: "auto", padding: "2px 8px" }}>
            Coba Lagi
          </button>
        </div>
      )}

      <div className="xp-window-content">
        <Outlet />
      </div>

      <div className="xp-statusbar">
        Keisya Halimah Mulia &middot; Pemrograman Web C &middot; ITS
      </div>
    </div>
  );
}
