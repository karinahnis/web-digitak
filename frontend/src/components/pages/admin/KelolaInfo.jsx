import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { companyInfo as initialCi } from "../../../data/companyInfo";
import Drawer from "../../ui/Drawer";

export default function KelolaInfo() {
  const [ci, setCi] = useState(initialCi);
  const [saved, setSaved] = useState(false);
  const [drawerId, setDrawerId] = useState(undefined);
  const [vform, setVform] = useState({ judul: "", deskripsi: "" });

  function updateField(key, value) {
    setCi({ ...ci, [key]: value });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function openValueForm(id) {
    const v = id ? ci.values.find((x) => x.id === id) : { judul: "", deskripsi: "" };
    setVform(v);
    setDrawerId(id ?? null);
  }

  function saveValue() {
    if (!vform.judul.trim()) return;
    if (typeof drawerId === "number") {
      setCi({ ...ci, values: ci.values.map((v) => (v.id === drawerId ? { ...v, ...vform } : v)) });
    } else {
      setCi({ ...ci, values: [...ci.values, { ...vform, id: Date.now() }] });
    }
    setDrawerId(undefined);
  }

  function deleteValue(id) {
    if (!window.confirm("Hapus nilai ini?")) return;
    setCi({ ...ci, values: ci.values.filter((v) => v.id !== id) });
  }

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h3>Profil Perusahaan</h3>
          <div className="ph-actions">
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div className="form-stack">
            <div className="field">
              <label>Tentang Kami</label>
              <textarea className="inp" rows={5} value={ci.tentang_kami} onChange={(e) => updateField("tentang_kami", e.target.value)} />
            </div>
            <div className="form-row">
              <div className="field">
                <label>Visi</label>
                <textarea className="inp" rows={3} value={ci.visi} onChange={(e) => updateField("visi", e.target.value)} />
              </div>
              <div className="field">
                <label>Misi</label>
                <textarea className="inp" rows={3} value={ci.misi} onChange={(e) => updateField("misi", e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Email</label>
                <input className="inp" type="email" value={ci.email} onChange={(e) => updateField("email", e.target.value)} />
              </div>
              <div className="field">
                <label>Telepon</label>
                <input className="inp" value={ci.telepon} onChange={(e) => updateField("telepon", e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Alamat</label>
              <textarea className="inp" rows={2} value={ci.alamat} onChange={(e) => updateField("alamat", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <div className="panel-head">
          <h3>Nilai-nilai Perusahaan</h3>
          <div className="ph-actions">
            <button className="btn btn-primary btn-sm" onClick={() => openValueForm()}>
              <Plus size={14} /> Tambah Nilai
            </button>
          </div>
        </div>
        <div className="panel-body flush">
          <div className="vlist">
            {ci.values.map((v, i) => (
              <div className="vrow" key={v.id}>
                <span className="vh">{String(i + 1).padStart(2, "0")}</span>
                <span className="vt">
                  <span className="n" style={{ display: "block" }}>{v.judul}</span>
                  <span className="d">{v.deskripsi}</span>
                </span>
                <span className="rowbtns">
                  <button className="iconbtn" title="Ubah" onClick={() => openValueForm(v.id)}><Pencil size={15} /></button>
                  <button className="iconbtn danger" title="Hapus" onClick={() => deleteValue(v.id)}><Trash2 size={15} /></button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Drawer
        open={drawerId !== undefined}
        eyebrow={typeof drawerId === "number" ? "PUT /company-info/values/" + drawerId : "POST /company-info/values"}
        title={typeof drawerId === "number" ? "Ubah Nilai" : "Tambah Nilai"}
        onClose={() => setDrawerId(undefined)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setDrawerId(undefined)}>Batal</button>
            <button className="btn btn-primary" onClick={saveValue}>Simpan</button>
          </>
        }
      >
        <div className="field">
          <label>Judul</label>
          <input className="inp" value={vform.judul} onChange={(e) => setVform({ ...vform, judul: e.target.value })} placeholder="mis. Integritas" />
        </div>
        <div className="field">
          <label>Deskripsi</label>
          <textarea className="inp" rows={4} value={vform.deskripsi} onChange={(e) => setVform({ ...vform, deskripsi: e.target.value })} />
        </div>
      </Drawer>
    </>
  );
}