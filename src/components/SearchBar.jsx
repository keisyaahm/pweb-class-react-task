function SearchBar({ value, onChange }) {
  return (
    <input
      className="xp-input search-input"
      type="text"
      placeholder="Cari nama produk..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchBar
