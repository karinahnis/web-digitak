import { useState } from "react";
import { Star } from "lucide-react";
import { initialTestimonials as testimonials } from "../../data/testimonials";

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function TestimoniPage() {
  const [form, setForm] = useState({ nama: "", rating: "5", kutipan: "" });
  const [sent, setSent] = useState(false);
  const visible = testimonials.filter((t) => t.status === 1);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Testimoni baru:", form);
    setSent(true);
    setForm({ nama: "", rating: "5", kutipan: "" });
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Testimoni</span>
            <h2 className="h-xl display">Suara klien, apa adanya.</h2>
          </div>
        </div>
        <div className="tm-grid">
          {visible.map((t) => (
            <figure className="tm" key={t.id}>
              <div className="tm-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={14} fill={n <= t.rating ? "currentColor" : "none"} className={n > t.rating ? "off" : ""} />
                ))}
              </div>
              <q>{t.kutipan}</q>
              <figcaption className="tm-by">
                <span className="avatar">{initials(t.nama_klien)}</span>
                <span>
                  <span className="n" style={{ display: "block" }}>{t.nama_klien}</span>
                  <span className="d">{t.peran}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <hr className="rule" />

      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Tulis Testimoni</span>
            <h2 className="h-lg display">Pernah bekerja sama dengan kami?</h2>
            <p className="lede">
              Ceritakan pengalaman Anda. Testimoni akan tampil di halaman ini setelah ditinjau tim kami.
            </p>
          </div>
        </div>
        <form className="form-stack" style={{ maxWidth: 620 }} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="t-nama">Nama Klien</label>
              <input className="inp" id="t-nama" required placeholder="Nama lengkap Anda" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="t-rating">Rating</label>
              <select className="inp" id="t-rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                <option value="5">5 — Sangat memuaskan</option>
                <option value="4">4 — Memuaskan</option>
                <option value="3">3 — Cukup</option>
                <option value="2">2 — Kurang</option>
                <option value="1">1 — Tidak memuaskan</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="t-kutipan">Kutipan</label>
            <textarea className="inp" id="t-kutipan" required placeholder="Bagaimana pengalaman Anda bekerja sama dengan Digitak?" value={form.kutipan} onChange={(e) => setForm({ ...form, kutipan: e.target.value })} />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
            {sent ? "Terkirim ✓" : "Kirim Testimoni"}
          </button>
        </form>
      </div>
    </div>
  );
}