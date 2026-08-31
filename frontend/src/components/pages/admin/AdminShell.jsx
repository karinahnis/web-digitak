import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import Dashboard from "./Dashboard";
import Inbox from "./Inbox";
import KelolaInfo from "./KelolaInfo";
import KelolaLayanan from "./KelolaLayanan";
import KelolaPortofolio from "./KelolaPortofolio";
import KelolaTestimoni from "./KelolaTestimoni";

const PAGE_META = {
  dashboard: { eyebrow: "Ringkasan", title: "Dasbor" },
  pesan: { eyebrow: "Ringkasan", title: "Pesan Masuk" },
  info: { eyebrow: "Konten", title: "Info Perusahaan" },
  layanan: { eyebrow: "Konten", title: "Layanan" },
  portofolio: { eyebrow: "Konten", title: "Portofolio" },
  testimoni: { eyebrow: "Konten", title: "Testimoni" },
};

export default function AdminShell({ onLogout }) {
  const [adminPage, setAdminPage] = useState("dashboard");
  const meta = PAGE_META[adminPage];

  return (
    <div className="admin-shell">
      <AdminSidebar activeAdminPage={adminPage} onNavigate={setAdminPage} onLogout={onLogout} />
      <div className="admin-main">
        <AdminTopbar eyebrow={meta.eyebrow} title={meta.title} />
        <div className="admin-body">
          {adminPage === "dashboard" && <Dashboard onNavigate={setAdminPage} />}
          {adminPage === "pesan" && <Inbox />}
          {adminPage === "info" && <KelolaInfo />}
          {adminPage === "layanan" && <KelolaLayanan />}
          {adminPage === "portofolio" && <KelolaPortofolio />}
          {adminPage === "testimoni" && <KelolaTestimoni />}
        </div>
      </div>
    </div>
  );
}