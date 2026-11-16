import { useState } from 'react'
import { useProducts } from '../context/ProductContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import AddModal from '../components/AddModal.jsx'
import EditModal from '../components/EditModal.jsx'
import DeleteModal from '../components/DeleteModal.jsx'

function ProductsPage() {
  const { products, addProduct, updateProduct, removeProduct } = useProducts()
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleAdd = ({ name, price, quantity }) => {
    addProduct({ name, price, quantity })
    setShowAdd(false)
  }

  const handleEdit = ({ name, price, quantity }) => {
    updateProduct(editTarget.id, { name, price, quantity })
    setEditTarget(null)
  }

  const handleDelete = () => {
    removeProduct(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="xp-panel">
        <div className="xp-panel-title">Manajemen Produk</div>

        <div className="page-header">
          <div className="page-header-text">
            <h1>Manajemen Produk</h1>
            <p>Kelola daftar produk dan harga dalam satu tempat.</p>
          </div>
          <button className="xp-button primary" onClick={() => setShowAdd(true)}>
            + Tambah Produk
          </button>
        </div>

        <div className="search-row">
          <SearchBar value={query} onChange={setQuery} />
          <span className="product-count">{products.length} produk</span>
        </div>

        <div className="product-grid">
          {filtered.length === 0 ? (
            <div className="empty-state">Produk tidak ditemukan.</div>
          ) : (
            filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))
          )}
        </div>

        <div className="display-info">
          Menampilkan {filtered.length} dari {products.length} produk
        </div>
      </div>

      {showAdd && (
        <AddModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}

      {editTarget && (
        <EditModal
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleEdit}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  )
}

export default ProductsPage
