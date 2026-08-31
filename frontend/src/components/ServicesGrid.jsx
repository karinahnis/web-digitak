import { Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare } from "lucide-react";
import { initialServices as services } from "../data/services";

const icons = {
  Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare,
};

export default function ServicesGrid({ onNavigate }) {
  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Layanan</span>
            <h2 className="h-lg display">Enam hal yang kami kerjakan dengan serius.</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("layanan")}>
            Semua layanan
          </button>
        </div>
        <div className="grid grid-3">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <div className="cell" key={s.id}>
                <Icon size={22} color="var(--accent)" />
                <h3 className="h-sm">{s.nama_layanan}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)" }}>{s.deskripsi_singkat}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}