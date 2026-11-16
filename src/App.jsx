import { useEffect, useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import AppearancePage from './pages/AppearancePage.jsx'

function App() {
  const [compact, setCompact] = useState(
    () => localStorage.getItem('48orineshop-view') === 'compact'
  )

  useEffect(() => {
    localStorage.setItem('48orineshop-view', compact ? 'compact' : 'standard')
  }, [compact])

  return (
    <div className={`xp-window ${compact ? 'compact-view' : ''}`}>
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
        <NavLink
          to="/tampilan"
          className={({ isActive }) =>
            isActive ? 'xp-menubar-item active' : 'xp-menubar-item'
          }
        >
          Tampilan
        </NavLink>
        <a
          className="xp-menubar-item"
          href="https://www.linkedin.com/home?originalSubdomain=id"
          target="_blank"
          rel="noreferrer"
        >
          Bantuan
        </a>
      </div>

      <div className="xp-window-content">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route
            path="/tampilan"
            element={<AppearancePage compact={compact} onChange={setCompact} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
