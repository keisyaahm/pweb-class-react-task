function ProductCard({ product, onEdit, onDelete }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)

  return (
    <div className="product-card">
      <div className="product-id">ID: {product.id}</div>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{formatPrice(product.price)}</div>
      <div className="card-actions">
        <button className="xp-button edit-btn" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="xp-button danger" onClick={() => onDelete(product)}>
          Hapus
        </button>
      </div>
    </div>
  )
}

export default ProductCard
