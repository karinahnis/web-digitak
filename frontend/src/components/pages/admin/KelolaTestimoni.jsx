import { useState } from "react";
import { Star } from "lucide-react";
import { initialTestimonials } from "../../../data/testimonials";

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function KelolaTestimoni() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const pendingCount = testimonials.filter((t) => !t.status).length;

  function toggleStatus(id) {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, status: t.status ? 0 : 1 } : t)));
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Moderasi Testimoni</h3>
        <div className="ph-actions">
          <span className="tag pending">{pendingCount} menunggu</span>
        </div>
      </div>
      <div className="panel-body">
        <p style={{ fontSize: 13.5, color: "var(--ink-3)", marginBottom: 16 }}>
          Testimoni yang dikirim lewat halaman publik masuk dalam keadaan tersembunyi. Aktifkan tombol untuk menampilkannya di situs.
        </p>
        <div className="mod-grid">
          {testimonials.map((t) => (
            <div className="mod" key={t.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="tm-stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={14} fill={n <= t.rating ? "currentColor" : "none"} className={n > t.rating ? "off" : ""} />
                  ))}
                </div>
                <span className={`tag ${t.status ? "on" : "off"}`} style={{ marginLeft: "auto" }}>
                  {t.status ? "Tampil" : "Tersembunyi"}
                </span>
              </div>
              <q style={{ fontSize: 14.5, lineHeight: 1.6 }}>{t.kutipan}</q>
              <div className="mod-foot">
                <span className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{initials(t.nama_klien)}</span>
                <span>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 600 }}>{t.nama_klien}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-3)" }}>
                    {new Date(t.created_at).toLocaleDateString("id-ID")}
                  </span>
                </span>
                <label className="sw" style={{ marginLeft: "auto" }}>
                  <input type="checkbox" checked={!!t.status} onChange={() => toggleStatus(t.id)} />
                  <span className="sw-track"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}