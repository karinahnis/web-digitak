export default function Hero({ onNavigate }) {
  return (
    <div className="hero">
      <div className="wrap hero-main">
        <div className="hero-copy">
          <span className="eyebrow">Sejak 1999 · Cimahi, Jawa Barat</span>
          <h1 className="h-xl display">
            Sistem yang dipakai <em>setiap hari</em>, selama bertahun-tahun.
          </h1>
          <p className="lede">
            Digitak merancang, membangun, dan merawat sistem informasi untuk
            klien pemerintah dan swasta di seluruh Indonesia.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => onNavigate("layanan")}>
              Lihat Layanan
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate("kontak")}>
              Bicara dengan Kami
            </button>
          </div>
        </div>

        <div className="schema" aria-hidden="true">
          <div className="schema-node">
            <div className="sn-l">Lapisan 01</div>
            <div className="sn-t">Aplikasi</div>
            <div className="sn-d">ERP · Web · Mobile</div>
          </div>
          <div className="schema-link"></div>
          <div className="schema-node">
            <div className="sn-l">Lapisan 02</div>
            <div className="sn-t">Integrasi & Data</div>
            <div className="sn-d">API · Middleware · ETL</div>
          </div>
          <div className="schema-link"></div>
          <div className="schema-node">
            <div className="sn-l">Lapisan 03</div>
            <div className="sn-t">Infrastruktur</div>
            <div className="sn-d">Server · Jaringan · Hosting</div>
          </div>
        </div>
      </div>

      <div className="wrap hero-rail">
        <div className="stat-rail">
          <div className="stat"><div className="stat-v">26</div><div className="stat-l">Tahun beroperasi</div></div>
          <div className="stat"><div className="stat-v">6</div><div className="stat-l">Lini layanan</div></div>
          <div className="stat"><div className="stat-v">40+</div><div className="stat-l">Proyek diserahkan</div></div>
          <div className="stat"><div className="stat-v">5</div><div className="stat-l">Sektor industri</div></div>
        </div>
      </div>
    </div>
  );
}