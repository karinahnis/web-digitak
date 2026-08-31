import { initialPortfolios as portfolios, covers } from "../data/portfolios";

export default function PortfolioGrid({ onNavigate }) {
  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Portofolio</span>
            <h2 className="h-lg display">Pekerjaan terbaru.</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("portofolio")}>
            Semua proyek
          </button>
        </div>
        <div className="pf-grid">
          {portfolios.filter((p) => p.status === 1).slice(0, 3).map((p, i) => (
            <button className="pf" key={p.id}>
              <span className="pf-cover" style={{ background: covers[i % covers.length] }}>
                <span className="pfc-n">{String(p.id).padStart(2, "0")}</span>
                <span className="tag">{p.kategori}</span>
              </span>
              <span className="pf-body">
                <h3>{p.judul_proyek}</h3>
                <span className="pf-klien">{p.klien}</span>
                <p>{p.deskripsi}</p>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}