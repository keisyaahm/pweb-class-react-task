import React, { useEffect, useState } from "react";

export default function ConfirmModal({
  isOpen,
  title = "Konfirmasi Tindakan",
  message = "Apakah Anda yakin ingin melanjutkan tindakan ini?",
  confirmLabel = "Ya, Lanjutkan",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onClose
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setSubmitError("");
  }, [isOpen]);

  async function handleConfirm() {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      setSubmitError(error.message || "Tindakan gagal diproses oleh server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="xp-modal-overlay" role="dialog" aria-modal="true">
      <div className="xp-modal-window" style={{ maxWidth: "400px" }}>
        <div className="xp-modal-titlebar">
          <span className="xp-modal-title">{title}</span>
          <button type="button" className="xp-titlebar-btn close" onClick={onClose} aria-label="Tutup">
            &#10005;
          </button>
        </div>
        <div className="xp-modal-body">
          <p style={{ marginBottom: "12px", lineHeight: "1.5" }}>{message}</p>
          {submitError && (
            <p role="alert" style={{ color: "#cc0000", fontSize: "11px", marginBottom: "10px", border: "1px solid #cc0000", padding: "4px 8px", background: "#fff0f0" }}>
              {submitError}
            </p>
          )}
          <div className="xp-modal-actions">
            <button type="button" className="xp-button" onClick={onClose} disabled={isSubmitting}>
              {cancelLabel}
            </button>
            <button
              type="button"
              className={`xp-button ${variant === "danger" ? "danger" : "warning"}`}
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
