import { NavLink, Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function App() {
  return (
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
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'xp-menubar-item active' : 'xp-menubar-item'
          }
        >
          Produk
        </NavLink>
        <NavLink
          to="/tentang"
          className={({ isActive }) =>
            isActive ? 'xp-menubar-item active' : 'xp-menubar-item'
          }
        >
          Tentang
        </NavLink>
        <span className="xp-menubar-item">Tampilan</span>
        <span className="xp-menubar-item">Bantuan</span>
      </div>

      <div className="xp-window-content">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/tentang" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
