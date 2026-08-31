import { useState } from "react";
import { Search, Plus, Pencil, Eye, Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare } from "lucide-react";
import { initialServices } from "../../../data/services";
import Drawer from "../../ui/Drawer";

const icons = { Server, GraduationCap, Network, LayoutGrid, Code2, MessagesSquare };

export default function KelolaLayanan() {
  const [services, setServices] = useState(initialServices);
  const [q, setQ] = useState("");
  const [drawerId, setDrawerId] = useState(undefined); // undefined = tertutup, null = tambah baru, angka = edit
  const [form, setForm] = useState({ nama_layanan: "", deskripsi_singkat: "", deskripsi_detail: "" });

  const filtered = services.filter((s) => s.nama_layanan.toLowerCase().includes(q.toLowerCase()));
  const isOpen = drawerId !== undefined;
  const editing = typeof drawerId === "number" ? services.find((s) => s.id === drawerId) : null;

  function openForm(id) {
    const s = id ? services.find((x) => x.id === id) : { nama_layanan: "", deskripsi_singkat: "", deskripsi_detail: "" };
    setForm(s);
    setDrawerId(id ?? null);
  }

  function save() {
    if (!form.nama_layanan.trim()) return;
    if (editing) {
      setServices(services.map((s) => (s.id === editing.id ? { ...s, ...form } : s)));
    } else {
      setServices([...services, { ...form, id: Date.now(), icon: "LayoutGrid", status: 1, created_at: new Date().toISOString() }]);
    }
    setDrawerId(undefined);
  }

  function toggleStatus(id) {
    setServices(services.map((s) => (s.id === id ? { ...s, status: s.status ? 0 : 1 } : s)));
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Daftar Layanan</h3>
        <div className="ph-actions">
          <div className="searchbox">
            <Search size={15} />
            <input className="inp" type="search" placeholder="Cari layanan…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => openForm()}>
            <Plus size={14} /> Tambah Layanan
          </button>
        </div>
      </div>
      <div className="panel-body flush">
        <div className="tablewrap">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Layanan</th>
                <th>Ikon</th>
                <th>Dibuat</th>
                <th>Status</th>
                <th className="t-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="empty">Tidak ada layanan yang cocok.</td></tr>
              )}
              {filtered.map((s) => {
                const Icon = icons[s.icon];
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="ic-cell">
                        <span className="ic-box">{Icon && <Icon size={18} />}</span>
                        <div>
                          <div className="t-main">{s.nama_layanan}</div>
                          <div className="t-sub">{s.deskripsi_singkat}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="tag" style={{ fontSize: 10 }}>{s.icon.toLowerCase()}.svg</span></td>
                    <td style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
                      {new Date(s.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td>
                      <label className="sw">
                        <input type="checkbox" checked={!!s.status} onChange={() => toggleStatus(s.id)} />
                        <span className="sw-track"></span>
                        <span className="sw-label">{s.status ? "Tampil" : "Sembunyi"}</span>
                      </label>
                    </td>
                    <td className="t-right">
                      <span className="rowbtns">
                        <button className="iconbtn" title="Ubah" onClick={() => openForm(s.id)}><Pencil size={15} /></button>
                        <button className="iconbtn" title="Pratinjau"><Eye size={15} /></button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer
        open={isOpen}
        eyebrow={editing ? "PUT /services/" + editing.id : "POST /services"}
        title={editing ? "Ubah Layanan" : "Tambah Layanan"}
        onClose={() => setDrawerId(undefined)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setDrawerId(undefined)}>Batal</button>
            <button className="btn btn-primary" onClick={save}>Simpan</button>
          </>
        }
      >
        <div className="field">
          <label>Nama Layanan</label>
          <input className="inp" value={form.nama_layanan} onChange={(e) => setForm({ ...form, nama_layanan: e.target.value })} placeholder="mis. UI/UX Design" />
        </div>
        <div className="field">
          <label>Deskripsi Singkat</label>
          <textarea className="inp" rows={2} value={form.deskripsi_singkat} onChange={(e) => setForm({ ...form, deskripsi_singkat: e.target.value })} placeholder="Satu kalimat untuk kartu di halaman layanan." />
        </div>
        <div className="field">
          <label>Deskripsi Detail</label>
          <textarea className="inp" rows={6} value={form.deskripsi_detail} onChange={(e) => setForm({ ...form, deskripsi_detail: e.target.value })} placeholder="Penjelasan lengkap untuk halaman detail." />
        </div>
      </Drawer>
    </div>
  );
}