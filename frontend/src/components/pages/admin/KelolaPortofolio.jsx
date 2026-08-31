import { useState } from "react";
import { Plus, Pencil, Eye } from "lucide-react";
import { initialPortfolios, covers } from "../../../data/portfolios";
import Drawer from "../../ui/Drawer";

export default function KelolaPortofolio() {
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [kategori, setKategori] = useState("");
  const [drawerId, setDrawerId] = useState(undefined);
  const [form, setForm] = useState({ judul_proyek: "", klien: "", kategori: "Web Development", deskripsi: "" });

  const kategoris = [...new Set(portfolios.map((p) => p.kategori))];
  const filtered = portfolios.filter((p) => !kategori || p.kategori === kategori);
  const isOpen = drawerId !== undefined;
  const editing = typeof drawerId === "number" ? portfolios.find((p) => p.id === drawerId) : null;

  function openForm(id) {
    const p = id ? portfolios.find((x) => x.id === id) : { judul_proyek: "", klien: "", kategori: "Web Development", deskripsi: "" };
    setForm(p);
    setDrawerId(id ?? null);
  }

  function save() {
    if (!form.judul_proyek.trim()) return;
    if (editing) {
      setPortfolios(portfolios.map((p) => (p.id === editing.id ? { ...p, ...form } : p)));
    } else {
      setPortfolios([...portfolios, { ...form, id: Date.now(), status: 1 }]);
    }
    setDrawerId(undefined);
  }

  function toggleStatus(id) {
    setPortfolios(portfolios.map((p) => (p.id === id ? { ...p, status: p.status ? 0 : 1 } : p)));
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Daftar Portofolio</h3>
        <div className="ph-actions">
          <select className="inp" style={{ width: "auto" }} value={kategori} onChange={(e) => setKategori(e.target.value)}>
            <option value="">Semua kategori</option>
            {kategoris.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          <button className="btn btn-primary btn-sm" onClick={() => openForm()}>
            <Plus size={14} /> Tambah Proyek
          </button>
        </div>
      </div>
      <div className="panel-body flush">
        <div className="tablewrap">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Proyek</th>
                <th>Klien</th>
                <th>Kategori</th>
                <th>Status</th>
                <th className="t-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="empty">Belum ada proyek pada kategori ini.</td></tr>
              )}
              {filtered.map((p) => {
                const i = portfolios.indexOf(p);
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="ic-cell">
                        <span className="ic-box" style={{ background: covers[i % covers.length] }}></span>
                        <div>
                          <div className="t-main">{p.judul_proyek}</div>
                          <div className="t-sub">{p.deskripsi}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13.5 }}>{p.klien}</td>
                    <td><span className="tag">{p.kategori}</span></td>
                    <td>
                      <label className="sw">
                        <input type="checkbox" checked={!!p.status} onChange={() => toggleStatus(p.id)} />
                        <span className="sw-track"></span>
                        <span className="sw-label">{p.status ? "Tampil" : "Sembunyi"}</span>
                      </label>
                    </td>
                    <td className="t-right">
                      <span className="rowbtns">
                        <button className="iconbtn" title="Ubah" onClick={() => openForm(p.id)}><Pencil size={15} /></button>
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
        eyebrow={editing ? "PUT /portfolios/" + editing.id : "POST /portfolios"}
        title={editing ? "Ubah Proyek" : "Tambah Proyek"}
        onClose={() => setDrawerId(undefined)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setDrawerId(undefined)}>Batal</button>
            <button className="btn btn-primary" onClick={save}>Simpan</button>
          </>
        }
      >
        <div className="field">
          <label>Judul Proyek</label>
          <input className="inp" value={form.judul_proyek} onChange={(e) => setForm({ ...form, judul_proyek: e.target.value })} placeholder="mis. Aplikasi Mobile Kasir" />
        </div>
        <div className="field">
          <label>Klien</label>
          <input className="inp" value={form.klien} onChange={(e) => setForm({ ...form, klien: e.target.value })} placeholder="Nama instansi atau perusahaan" />
        </div>
        <div className="field">
          <label>Kategori</label>
          <select className="inp" value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}>
            {kategoris.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Deskripsi</label>
          <textarea className="inp" rows={5} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
        </div>
      </Drawer>
    </div>
  );
}