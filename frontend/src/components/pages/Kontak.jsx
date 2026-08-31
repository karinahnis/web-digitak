import { useState } from "react";
import { companyInfo as ci } from "../../data/companyInfo";

export default function Kontak() {
  const [form, setForm] = useState({ nama: "", email: "", perusahaan: "", pesan: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Pesan terkirim:", form);
    setSent(true);
    setForm({ nama: "", email: "", perusahaan: "", pesan: "" });
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Kontak</span>
            <h2 className="h-xl display">Ceritakan kebutuhan Anda.</h2>
            <p className="lede">
              Kami membalas setiap pesan dalam satu hari kerja. Semakin jelas
              konteksnya, semakin cepat kami bisa memberi jawaban yang berguna.
            </p>
          </div>
        </div>

        <div className="contact-grid">
          <form className="form-stack" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="c-nama">Nama</label>
                <input className="inp" id="c-nama" name="nama" required placeholder="Nama lengkap" value={form.nama} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input className="inp" id="c-email" name="email" type="email" required placeholder="nama@perusahaan.co.id" value={form.email} onChange={handleChange} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-perusahaan">Perusahaan</label>
              <input className="inp" id="c-perusahaan" name="perusahaan" placeholder="Nama instansi atau perusahaan" value={form.perusahaan} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="c-pesan">Pesan</label>
              <textarea className="inp" id="c-pesan" name="pesan" required rows={6} placeholder="Sistem apa yang ingin Anda bangun atau perbaiki?" value={form.pesan} onChange={handleChange} />
            </div>
            <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              {sent ? "Terkirim ✓" : "Kirim Pesan"}
            </button>
          </form>

          <div className="info-block">
            <div className="info-item"><span className="il">Email</span><span className="iv">{ci.email}</span></div>
            <div className="info-item"><span className="il">Telepon</span><span className="iv">{ci.telepon}</span></div>
            <div className="info-item"><span className="il">Alamat</span><span className="iv">{ci.alamat}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}