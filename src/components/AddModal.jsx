import { useState } from 'react'

function AddModal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [priceError, setPriceError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsedPrice = Number(price)
    if (!name.trim()) return
    if (!parsedPrice || parsedPrice <= 0) {
      setPriceError('Harga harus lebih dari 0')
      return
    }
    setPriceError('')
    onSave({ name: name.trim(), price: parsedPrice })
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-window">
        <div className="modal-titlebar">
          <span className="modal-titlebar-title">Tambah Produk</span>
          <button className="xp-titlebar-btn close" onClick={onClose}>x</button>
        </div>
        <div className="modal-body">
          <h2>Tambah Produk</h2>
          <p>Masukkan informasi produk baru.</p>
          <form onSubmit={handleSubmit}>
            <div className="modal-field">
              <label>Nama Produk</label>
              <input
                className="xp-input"
                style={{ width: '100%' }}
                placeholder="Contoh: Pulpen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="modal-field">
              <label>Harga (Rp)</label>
              <input
                className="xp-input"
                style={{ width: '100%' }}
                type="number"
                min="1"
                placeholder="Contoh: 5000"
                value={price}
                onChange={(e) => { setPrice(e.target.value); setPriceError('') }}
              />
              {priceError && <span className="field-error">{priceError}</span>}
            </div>
            <div className="modal-actions">
              <button type="button" className="xp-button" onClick={onClose}>Batal</button>
              <button type="submit" className="xp-button primary">Simpan Produk</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddModal
