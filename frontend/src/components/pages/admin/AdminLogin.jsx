export default function AdminLogin({ onLogin }) {
  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }

  return (
    <div className="admin-login">
      <div className="login-art">
        <div className="brand">
          <span className="brand-mark" style={{ color: "var(--sidebar-ink)" }}>digita<b style={{ color: "var(--accent-2)" }}>k</b></span>
          <span className="brand-sub" style={{ color: "var(--sidebar-ink-2)" }}>PT Metanouva<br />Informatika</span>
        </div>
        <div>
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>Panel Admin</span>
          <h2 className="display" style={{ marginTop: 12 }}>Isi situs, dikelola dari satu tempat.</h2>
          <p style={{ marginTop: 16, opacity: 0.7, maxWidth: "40ch", fontSize: 15 }}>
            Ubah profil perusahaan, layanan, portofolio, dan testimoni — perubahan langsung tampil di situs publik.
          </p>
        </div>
        <div className="eyebrow" style={{ color: "var(--sidebar-ink-2)" }}>Sesi berlaku 4 jam · JWT</div>
      </div>

      <div className="login-form">
        <form className="login-card" onSubmit={handleSubmit}>
          <div>
            <span className="eyebrow">Masuk</span>
            <h2 className="h-md display" style={{ marginTop: 8 }}>Selamat datang kembali.</h2>
          </div>
          <div className="field">
            <label htmlFor="l-email">Email</label>
            <input className="inp" id="l-email" type="email" defaultValue="admin@digitak.id" required />
          </div>
          <div className="field">
            <label htmlFor="l-pass">Kata Sandi</label>
            <input className="inp" id="l-pass" type="password" defaultValue="demo-password" required />
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }}>Masuk</button>
          <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center" }}>
            Prototipe — tombol apa pun akan membuka panel.
          </p>
        </form>
      </div>
    </div>
  );
}