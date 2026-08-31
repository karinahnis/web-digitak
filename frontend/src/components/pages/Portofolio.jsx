import { useState } from "react";
import { initialPortfolios as portfolios, covers } from "../../data/portfolios";

export default function Portofolio() {
  const [kategori, setKategori] = useState("Semua");
  const visible = portfolios.filter((p) => p.status === 1);
  const kategoris = ["Semua", ...new Set(visible.map((p) => p.kategori))];
  const filtered = kategori === "Semua" ? visible : visible.filter((p) => p.kategori === kategori);

  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Portofolio</span>
            <h2 className="h-xl display">Proyek yang sudah berjalan.</h2>
          </div>
        </div>
        <div className="pf-filters">
          {kategoris.map((k) => (
            <button
              key={k}
              className={`pf-filter ${kategori === k ? "active" : ""}`}
              onClick={() => setKategori(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="pf-grid">
          {filtered.map((p) => {
            const i = portfolios.indexOf(p);
            return (
              <div className="pf" key={p.id}>
                <span className="pf-cover" style={{ background: covers[i % covers.length] }}>
                  <span className="pfc-n">{String(p.id).padStart(2, "0")}</span>
                  <span className="tag">{p.kategori}</span>
                </span>
                <span className="pf-body">
                  <h3>{p.judul_proyek}</h3>
                  <span className="pf-klien">{p.klien}</span>
                  <p>{p.deskripsi}</p>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}