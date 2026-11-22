import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ totalProducts = 0 }) {
  const menuClass = ({ isActive }) =>
    isActive ? "xp-menubar-item active" : "xp-menubar-item";

  return (
    <nav className="xp-menubar">
      <NavLink to="/" end className={menuClass}>
        Dashboard
      </NavLink>
      <NavLink to="/products" className={menuClass}>
        Produk ({totalProducts})
      </NavLink>
      <NavLink to="/settings" className={menuClass}>
        Pengaturan
      </NavLink>
    </nav>
  );
}
