function DeleteModal({ product, onClose, onConfirm }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-window">
        <div className="modal-titlebar">
          <span className="modal-titlebar-title">Hapus Produk</span>
          <button className="xp-titlebar-btn close" onClick={onClose}>x</button>
        </div>
        <div className="modal-body">
          <h2>Hapus Produk?</h2>
          <p>Produk yang dihapus tidak dapat dikembalikan.</p>
          <div className="modal-product-preview">
            <div className="preview-id">ID: {product.id}</div>
            <div className="preview-name">{product.name}</div>
            <div className="preview-price">{formatPrice(product.price)}</div>
          </div>
          <div className="modal-actions">
            <button className="xp-button" onClick={onClose}>Batal</button>
            <button className="xp-button danger" onClick={onConfirm}>Hapus Produk</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
