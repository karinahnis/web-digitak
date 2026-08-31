export default function CtaBand({ onNavigate }) {
  return (
    <div className="wrap">
      <div className="section tight">
        <div className="cta-band">
          <h2 className="display">Mari susun sistem yang masih berguna lima tahun lagi.</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => onNavigate("kontak")}>Kirim Pesan</button>
            <a className="btn btn-ghost" href="mailto:info@digitak.id">info@digitak.id</a>
          </div>
        </div>
      </div>
    </div>
  );
}