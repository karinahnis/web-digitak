import { initialServices as services } from "../data/services";

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand" style={{ marginBottom: 14 }}>
              <span className="brand-mark">digita<b>k</b></span>
              <span className="brand-sub">PT Metanouva<br />Informatika</span>
            </div>
            <p style={{ fontSize: 14, opacity: 0.7, maxWidth: "34ch" }}>
              Solusi perangkat lunak dan infrastruktur TI untuk instansi dan perusahaan di Indonesia sejak 1999.
            </p>
          </div>
          <div className="foot-col">
            <h4>Navigasi</h4>
            <ul>
              <li><button onClick={() => onNavigate("beranda")}>Beranda</button></li>
              <li><button onClick={() => onNavigate("tentang")}>Tentang Kami</button></li>
              <li><button onClick={() => onNavigate("layanan")}>Layanan</button></li>
              <li><button onClick={() => onNavigate("portofolio")}>Portofolio</button></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Layanan</h4>
            <ul>
              {services.map((s) => <li key={s.id}>{s.nama_layanan}</li>)}
            </ul>
          </div>
          <div className="foot-col">
            <h4>Kontak</h4>
            <ul>
              <li><a href="mailto:info@digitak.id">info@digitak.id</a></li>
              <li><a href="tel:+62226626000">+62 22 6626 000</a></li>
              <li style={{ opacity: 0.7, fontSize: 13.5, lineHeight: 1.5 }}>
                Jl. Gn. Batu Dalam, Komplek Citra Asri Permai No. C-26, Cimahi Utara, Jawa Barat 40514
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 PT Metanouva Informatika</span>
          <span>Konten dikelola melalui Panel Admin Digitak</span>
        </div>
      </div>
    </footer>
  );
}