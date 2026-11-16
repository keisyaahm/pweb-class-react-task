function AppearancePage({ compact, onChange }) {
  return (
    <div className="xp-panel">
      <div className="xp-panel-title">Pengaturan Tampilan</div>

      <div className="about-section">
        <h1>Tampilan Aplikasi</h1>
        <p>Pilih jarak antarelemen yang paling nyaman untuk digunakan.</p>
      </div>

      <div className="appearance-options">
        <button
          className={`appearance-option ${!compact ? 'selected' : ''}`}
          onClick={() => onChange(false)}
        >
          <span className="appearance-option-title">Standar</span>
          <span>Ukuran kartu dan jarak normal.</span>
        </button>
        <button
          className={`appearance-option ${compact ? 'selected' : ''}`}
          onClick={() => onChange(true)}
        >
          <span className="appearance-option-title">Ringkas</span>
          <span>Lebih banyak produk terlihat dalam satu layar.</span>
        </button>
      </div>
    </div>
  )
}

export default AppearancePage
