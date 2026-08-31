import { useState } from "react";
import { Search } from "lucide-react";
import { Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare } from "lucide-react";
import { initialServices as services } from "../../data/services";

const icons = { Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare };

export default function Layanan({ onNavigate, onSelectService }) {
  const [q, setQ] = useState("");
  const filtered = services.filter((s) =>
    s.nama_layanan.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Layanan</span>
            <h2 className="h-xl display">Dari konsultasi sampai perawatan.</h2>
            <p className="lede">
              Setiap lini layanan dikerjakan tim yang sama, sehingga rekomendasi di tahap
              konsultasi benar-benar bisa kami jalankan sendiri.
            </p>
          </div>
          <div className="searchbox">
            <Search size={15} />
            <input
              className="inp"
              type="search"
              placeholder="Cari layanan…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-3">
          {filtered.map((s) => {
            const Icon = icons[s.icon];
            return (
              <button
                className="cell cell-link"
                key={s.id}
                onClick={() => { onSelectService(s.id); onNavigate("layanan-detail"); }}
              >
                <Icon size={22} color="var(--accent)" />
                <h3 className="h-sm">{s.nama_layanan}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)" }}>{s.deskripsi_singkat}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}