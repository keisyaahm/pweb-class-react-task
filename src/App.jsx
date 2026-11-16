import { useState } from 'react'
import { initialProducts } from './data/products.js'
import ProductCard from './components/ProductCard.jsx'
import SearchBar from './components/SearchBar.jsx'
import AddModal from './components/AddModal.jsx'
import EditModal from './components/EditModal.jsx'
import DeleteModal from './components/DeleteModal.jsx'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [deleteProduct, setDeleteProduct] = useState(null)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  const nextId = () => Math.max(...products.map((p) => p.id), 0) + 1

  const handleAdd = ({ name, price }) => {
    setProducts((prev) => [...prev, { id: nextId(), name, price }])
    setShowAdd(false)
  }

  const handleEdit = ({ name, price }) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? { ...p, name, price } : p))
    )
    setEditProduct(null)
  }

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id))
    setDeleteProduct(null)
  }

  return (
    <div>
      <div className="xp-window">
        <div className="xp-titlebar">
          <div className="xp-titlebar-left">
            <span className="xp-titlebar-icon">🛒</span>
            <span className="xp-titlebar-title">48ORINESHOP - Manajemen Produk</span>
          </div>
          <div className="xp-titlebar-buttons">
            <button className="xp-titlebar-btn minimize">_</button>
            <button className="xp-titlebar-btn maximize">□</button>
            <button className="xp-titlebar-btn close">x</button>
          </div>
        </div>

        <div className="xp-menubar">
          <span className="xp-menubar-item">File</span>
          <span className="xp-menubar-item">Edit</span>
          <span className="xp-menubar-item">Tampilan</span>
          <span className="xp-menubar-item">Bantuan</span>
        </div>

        <div className="xp-window-content">
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
                    onEdit={setEditProduct}
                    onDelete={setDeleteProduct}
                  />
                ))
              )}
            </div>

            <div className="display-info">
              Menampilkan {filtered.length} dari {products.length} produk
            </div>
          </div>
        </div>
      </div>

      {showAdd && (
        <AddModal onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}

      {editProduct && (
        <EditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleEdit}
        />
      )}

      {deleteProduct && (
        <DeleteModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}

export default App
