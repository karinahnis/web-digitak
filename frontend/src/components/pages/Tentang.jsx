import { companyInfo as ci } from "../../data/companyInfo";

export default function Tentang() {
  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Tentang Kami</span>
            <h2 className="h-xl display">Dua puluh enam tahun membangun perangkat lunak di Indonesia.</h2>
          </div>
        </div>
        <div className="about-split">
          <p className="lede">{ci.tentang_kami}</p>
          <div className="info-block">
            <div className="info-item"><span className="il">Visi</span><span className="iv">{ci.visi}</span></div>
            <div className="info-item"><span className="il">Misi</span><span className="iv">{ci.misi}</span></div>
          </div>
        </div>
      </div>

      <hr className="rule" />

      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Nilai-nilai</span>
            <h2 className="h-lg display">Yang kami pegang saat mengerjakan proyek.</h2>
          </div>
        </div>
        <div className="grid grid-2">
          {ci.values.map((v) => (
            <div className="cell" key={v.id}>
              <h3 className="h-sm">{v.judul}</h3>
              <p style={{ fontSize: 14, color: "var(--ink-2)" }}>{v.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="rule" />

      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Temukan Kami</span>
            <h2 className="h-lg display">Kantor kami di Cimahi.</h2>
          </div>
        </div>
        <div className="about-split">
          <div className="info-block">
            <div className="info-item"><span className="il">Alamat</span><span className="iv">{ci.alamat}</span></div>
            <div className="info-item"><span className="il">Email</span><span className="iv"><a href={`mailto:${ci.email}`}>{ci.email}</a></span></div>
            <div className="info-item"><span className="il">Telepon</span><span className="iv"><a href={`tel:${ci.telepon.replace(/\s/g, "")}`}>{ci.telepon}</a></span></div>
            <div className="info-item"><span className="il">Jam Operasional</span><span className="iv">Senin–Jumat, 08.00–17.00 WIB</span></div>
          </div>
          <iframe
            title="Lokasi Kantor Digitak"
            src="https://www.google.com/maps?q=PT+Metanouva+Informatika+Cimahi&output=embed"
            style={{ width: "100%", height: "100%", minHeight: 280, border: "1px solid var(--line)", borderRadius: 3 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}