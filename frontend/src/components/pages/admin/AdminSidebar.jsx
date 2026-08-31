import { LayoutDashboard, Inbox, Building2, Grid3x3, Briefcase, Quote, LogOut } from "lucide-react";

const menu = [
  { group: "Ringkasan", items: [
    { key: "dashboard", label: "Dasbor", icon: LayoutDashboard },
    { key: "pesan", label: "Pesan Masuk", icon: Inbox, badge: 3 },
  ]},
  { group: "Konten", items: [
    { key: "info", label: "Info Perusahaan", icon: Building2 },
    { key: "layanan", label: "Layanan", icon: Grid3x3 },
    { key: "portofolio", label: "Portofolio", icon: Briefcase },
    { key: "testimoni", label: "Testimoni", icon: Quote },
  ]},
];

export default function AdminSidebar({ activeAdminPage, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <span className="brand-mark">digita<b>k</b></span>
        <span className="brand-sub">Panel<br />Admin</span>
      </div>

      {menu.map((g) => (
        <div className="sb-group" key={g.group}>
          <div className="sb-label">{g.group}</div>
          {g.items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className="sb-item"
                aria-current={activeAdminPage === item.key ? "page" : undefined}
                onClick={() => onNavigate(item.key)}
              >
                <Icon />
                {item.label}
                {item.badge && <span className="sb-badge">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      ))}

      <div className="sb-foot">
        <div className="avatar">AD</div>
        <div>
          <div className="n">admin01</div>
          <div className="e">admin@digitak.id</div>
        </div>
        <button className="out" title="Keluar" onClick={onLogout}>
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}