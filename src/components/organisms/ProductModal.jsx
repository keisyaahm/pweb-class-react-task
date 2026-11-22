import React, { useState, useEffect } from "react";
import { CATEGORIES } from "../../data/initialProducts";

export default function ProductModal({ isOpen, onClose, onSave, initialData = null }) {
  const isEdit = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: "",
    category: "Alat Tulis",
    price: "",
    stock: "",
    sku: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "Alat Tulis",
        price: initialData.price ?? "",
        stock: initialData.stock ?? "",
        sku: initialData.sku || "",
        description: initialData.description || ""
      });
    } else {
      setFormData({
        name: "",
        category: "Alat Tulis",
        price: "",
        stock: "",
        sku: "",
        description: ""
      });
    }
    setErrors({});
    setSubmitError("");
  }, [initialData, isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama produk wajib diisi.";
    if (formData.price === "" || isNaN(Number(formData.price)) || Number(formData.price) < 0)
      newErrors.price = "Harga harus berupa angka positif.";
    if (formData.stock === "" || isNaN(Number(formData.stock)) || Number(formData.stock) < 0)
      newErrors.stock = "Stok harus berupa angka positif.";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const payload = {
        ...(isEdit ? { id: initialData.id } : {}),
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sku: formData.sku.trim() || undefined,
        description: formData.description.trim()
      };
      await onSave(payload);
      onClose();
    } catch (error) {
      setSubmitError(error.message || "Gagal menyimpan produk ke server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldStyle = { marginBottom: "10px" };
  const labelStyle = { display: "block", fontWeight: "bold", fontSize: "11px", marginBottom: "3px" };
  const errorStyle = { color: "#cc0000", fontSize: "10px", marginTop: "2px" };
  const hintStyle = { color: "#666", fontSize: "10px", marginTop: "2px" };
  const gridTwo = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" };

  return (
    <div className="xp-modal-overlay" role="dialog" aria-modal="true">
      <div className="xp-modal-window" style={{ maxWidth: "520px", width: "100%" }}>
        <div className="xp-modal-titlebar">
          <span className="xp-modal-title">{isEdit ? "Edit Produk" : "Tambah Produk Baru"}</span>
          <button type="button" className="xp-titlebar-btn close" onClick={onClose} aria-label="Tutup">
            &#10005;
          </button>
        </div>
        <div className="xp-modal-body">
          <form onSubmit={handleSubmit}>
            <div style={fieldStyle}>
              <label htmlFor="product-name" style={labelStyle}>Nama Produk *</label>
              <input
                id="product-name"
                className="xp-input"
                placeholder="Contoh: Buku Tulis Hardcover B5"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoFocus
              />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>

            <div style={gridTwo}>
              <div style={fieldStyle}>
                <label htmlFor="product-category" style={labelStyle}>Kategori *</label>
                <select
                  id="product-category"
                  className="xp-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.filter((c) => c !== "Semua Kategori").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div style={fieldStyle}>
                <label htmlFor="product-sku" style={labelStyle}>Kode SKU (Opsional)</label>
                <input
                  id="product-sku"
                  className="xp-input"
                  placeholder="Misal: AT-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
                <div style={hintStyle}>Biarkan kosong untuk auto-generate</div>
              </div>
            </div>

            <div style={gridTwo}>
              <div style={fieldStyle}>
                <label htmlFor="product-price" style={labelStyle}>Harga (Rp) *</label>
                <input
                  id="product-price"
                  className="xp-input"
                  type="number"
                  min="0"
                  step="500"
                  placeholder="25000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                {errors.price && <div style={errorStyle}>{errors.price}</div>}
              </div>
              <div style={fieldStyle}>
                <label htmlFor="product-stock" style={labelStyle}>Jumlah Stok (Unit) *</label>
                <input
                  id="product-stock"
                  className="xp-input"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="10"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
                {errors.stock && <div style={errorStyle}>{errors.stock}</div>}
              </div>
            </div>

            <div style={fieldStyle}>
              <label htmlFor="product-desc" style={labelStyle}>Deskripsi Produk</label>
              <textarea
                id="product-desc"
                className="xp-textarea"
                rows={3}
                placeholder="Spesifikasi atau informasi tambahan mengenai produk..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {submitError && (
              <div role="alert" style={{ border: "1px solid #cc0000", background: "#fff0f0", color: "#cc0000", padding: "5px 8px", fontSize: "11px", marginBottom: "10px" }}>
                {submitError}
              </div>
            )}

            <div className="xp-modal-actions">
              <button type="button" className="xp-button" onClick={onClose} disabled={isSubmitting}>
                Batal
              </button>
              <button type="submit" className="xp-button primary" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Produk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
