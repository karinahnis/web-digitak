export default function Navbar({ activePage, onNavigate }) {
  const menu = [
    { key: "beranda", label: "Beranda" },
    { key: "tentang", label: "Tentang" },
    { key: "layanan", label: "Layanan" },
    { key: "portofolio", label: "Portofolio" },
    { key: "testimoni", label: "Testimoni" },
  ];

  return (
    <nav className="site-nav">
      <div className="wrap">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("beranda");
          }}
        >
          <span className="brand-mark">
            digita<b>k</b>
          </span>

          <span className="brand-sub">
            PT Metanouva
            <br />
            Informatika
          </span>
        </a>

        <div className="navlinks">
          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              aria-current={activePage === item.key ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        <a
          className="btn btn-primary btn-sm"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("kontak");
          }}
        >
          Hubungi Kami
        </a>
      </div>
    </nav>
  );
}