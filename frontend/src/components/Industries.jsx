const industries = [
  { title: "Sektor Publik", desc: "Perizinan terpadu, portal layanan warga, dan integrasi data lintas dinas." },
  { title: "Keuangan", desc: "Integrasi core banking, kanal pembayaran, dan pelaporan regulator." },
  { title: "Pendidikan", desc: "Sistem informasi akademik, penerimaan mahasiswa, dan manajemen aset kampus." },
  { title: "Kesehatan", desc: "Rekam medis, dashboard pengawasan mutu, dan pelaporan fasilitas kesehatan." },
  { title: "Utilitas", desc: "Manajemen aset lapangan, penagihan pelanggan, dan pemantauan jaringan." },
];

export default function Industries({ onNavigate }) {
  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Industri</span>
            <h2 className="h-lg display">Solusi yang dirancang untuk sektor yang berbeda-beda.</h2>
          </div>
        </div>
        <div className="grid grid-3">
          {industries.map((it) => (
            <div className="cell" key={it.title}>
              <div className="value-i">{it.title}</div>
              <p style={{ fontSize: 14, color: "var(--ink-2)" }}>{it.desc}</p>
            </div>
          ))}
          <div className="cell" style={{ background: "var(--surface-2)", justifyContent: "center" }}>
            <p style={{ fontSize: 14, color: "var(--ink-2)" }}>
              Sektor Anda tidak ada di sini? Ceritakan kebutuhannya — kami mulai dari proses, bukan dari template.
            </p>
            <button className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => onNavigate("kontak")}>
              Hubungi kami
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}