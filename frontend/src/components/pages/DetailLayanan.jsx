import { Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare } from "lucide-react";
import { initialServices as services } from "../../data/services";

const icons = { Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare };

export default function DetailLayanan({ serviceId, onNavigate }) {
  const s = services.find((x) => x.id === serviceId);
  if (!s) return null;
  const Icon = icons[s.icon];

  return (
    <div className="wrap">
      <div className="section">
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 20 }}>
          <button className="btn-ghost" style={{ border: "none", padding: 0, background: "none", cursor: "pointer" }} onClick={() => onNavigate("beranda")}>Beranda</button>
          {" / "}
          <button className="btn-ghost" style={{ border: "none", padding: 0, background: "none", cursor: "pointer" }} onClick={() => onNavigate("layanan")}>Layanan</button>
          {" / "}{s.nama_layanan}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <Icon size={32} color="var(--accent)" />
          <h1 className="h-xl display" style={{ margin: 0 }}>{s.nama_layanan}</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40, marginTop: 28 }}>
          <div>
            <p style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.65, marginBottom: 16 }}>{s.deskripsi_singkat}</p>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.7 }}>{s.deskripsi_detail}</p>
          </div>
          <div className="info-block" style={{ alignSelf: "start" }}>
            <div className="info-item"><span className="il">Cocok untuk</span><span className="iv">Instansi pemerintah, BUMD, dan perusahaan menengah–besar</span></div>
            <div className="info-item"><span className="il">Kategori</span><span className="iv">Layanan Digitak</span></div>
          </div>
        </div>

        <div className="cta-band" style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 22 }}>Butuh layanan ini?</h2>
          <button className="btn btn-primary" onClick={() => onNavigate("kontak")}>Hubungi Kami</button>
        </div>
      </div>
    </div>
  );
}