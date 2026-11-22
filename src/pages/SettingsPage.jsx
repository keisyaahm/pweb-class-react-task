import React, { useState } from "react";
import ConfirmModal from "../components/organisms/ConfirmModal";

export default function SettingsPage({
  displayMode = "grid",
  onChangeDisplayMode,
  products = [],
  onResetData
}) {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [successNotice, setSuccessNotice] = useState("");

  const dataSize = new Blob([JSON.stringify(products)]).size;

  async function handleResetConfirm() {
    await onResetData();
    setSuccessNotice("Data inventaris produk berhasil direset ke data seeder awal!");
    setTimeout(() => setSuccessNotice(""), 4000);
  }

  function handleExportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `products_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSuccessNotice("Berkas JSON inventaris berhasil diekspor ke perangkat Anda.");
    setTimeout(() => setSuccessNotice(""), 4000);
  }

  return (
    <div>
      {successNotice && (
        <div style={{ background: "#dff0d8", border: "1px solid #3c763d", color: "#2d4a1e", padding: "6px 12px", fontSize: "11px", marginBottom: "10px", fontWeight: "bold" }}>
          {successNotice}
        </div>
      )}

      <div className="xp-panel">
        <div className="xp-panel-title">Pengaturan - Tampilan Daftar Produk</div>
        <div style={{ fontSize: "11px", color: "#555", marginBottom: "12px" }}>
          Pilihan ini tersimpan di browser dan langsung memengaruhi tampilan halaman Produk.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div
            onClick={() => onChangeDisplayMode("grid")}
            className="xp-inset-box"
            style={{
              cursor: "pointer",
              background: displayMode === "grid" ? "#ddeeff" : "#fff",
              border: displayMode === "grid" ? "2px solid #0a246a" : undefined,
              padding: "10px 14px"
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              Tampilan Kartu {displayMode === "grid" && <span style={{ color: "#0a246a", fontSize: "10px" }}>[Dipilih]</span>}
            </div>
            <div style={{ fontSize: "11px", color: "#555" }}>Produk ditampilkan dalam beberapa kolom.</div>
          </div>

          <div
            onClick={() => onChangeDisplayMode("list")}
            className="xp-inset-box"
            style={{
              cursor: "pointer",
              background: displayMode === "list" ? "#ddeeff" : "#fff",
              border: displayMode === "list" ? "2px solid #0a246a" : undefined,
              padding: "10px 14px"
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              Tampilan Tabel {displayMode === "list" && <span style={{ color: "#0a246a", fontSize: "10px" }}>[Dipilih]</span>}
            </div>
            <div style={{ fontSize: "11px", color: "#555" }}>Produk ditampilkan dalam baris tabel.</div>
          </div>
        </div>
      </div>

      <div className="xp-panel">
        <div className="xp-panel-title">Status Data</div>
        <div style={{ fontSize: "11px", color: "#555", marginBottom: "12px" }}>
          Data produk berasal dari Express API dan PostgreSQL. Preferensi tampilan disimpan di browser.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "14px" }}>
          <div className="xp-inset-box" style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: "10px", color: "#555" }}>Jumlah Produk</div>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{products.length} barang</div>
          </div>
          <div className="xp-inset-box" style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: "10px", color: "#555" }}>Ukuran Data</div>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>{(dataSize / 1024).toFixed(2)} KB</div>
          </div>
          <div className="xp-inset-box" style={{ padding: "8px 12px" }}>
            <div style={{ fontSize: "10px", color: "#555" }}>Penyimpanan</div>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>PostgreSQL</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", borderTop: "1px solid #aca899", paddingTop: "10px" }}>
          <button type="button" className="xp-button" onClick={handleExportJSON}>
            Ekspor Data (.JSON)
          </button>
          <button type="button" className="xp-button danger" onClick={() => setIsResetModalOpen(true)}>
            Reset ke Data Seeder Awal
          </button>
        </div>
      </div>

      <div className="xp-inset-box" style={{ fontSize: "11px", lineHeight: "1.6" }}>
        <strong>Mekanisme Navigasi dan Siklus Hidup State:</strong>
        <br />
        Navigasi antar route internal dilakukan melalui <code>Link</code> atau <code>NavLink</code> tanpa memuat ulang dokumen HTML.
        State produk dikelola di <code>App.jsx</code> dan disinkronkan melalui REST API Express ke PostgreSQL.
        Preferensi grid/list tetap disimpan di <code>localStorage</code>.
      </div>

      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Reset Data Inventaris?"
        message="Tindakan ini akan mengembalikan seluruh daftar produk ke data seeder awal (8 produk seeder). Seluruh produk yang Anda tambahkan atau edit secara manual akan dikembalikan ke kondisi semula."
        confirmLabel="Ya, Reset Data Sekarang"
        variant="warning"
        onConfirm={handleResetConfirm}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
