import { useProducts } from '../context/ProductContext.jsx'

function AboutPage() {
  const { products } = useProducts()
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)

  return (
    <div className="xp-panel">
      <div className="xp-panel-title">Tentang Aplikasi</div>

      <div className="about-section">
        <h1>Tentang 48ORINESHOP</h1>
        <p>
          Aplikasi manajemen produk sederhana yang dibangun dengan React untuk
          memenuhi materi Fundamental React: komponen, JSX, state, props, event,
          Context, useEffect, dan routing.
        </p>
      </div>

      <div className="about-stat-grid">
        <div className="about-stat">
          <span className="about-stat-label">Total Stok</span>
          <span className="about-stat-value">{totalQuantity}</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-label">Total Produk</span>
          <span className="about-stat-value">{products.length}</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-label">Total Nilai Stok</span>
          <span className="about-stat-value">{formatPrice(totalValue)}</span>
        </div>
      </div>

      <div className="about-section">
        <h2>Konsep React yang Dipakai</h2>
        <ul className="about-list">
          <li>Komponen fungsional dan komposisi antarkomponen</li>
          <li>JSX: ekspresi, kondisi, serta list dengan key</li>
          <li>State dan pembaruan UI secara deklaratif</li>
          <li>Props dan event handler untuk aliran data satu arah</li>
          <li>Context untuk berbagi state global tanpa prop drilling</li>
          <li>useEffect untuk menyimpan data ke localStorage</li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage
