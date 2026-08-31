const reasons = [
  { no: "01", title: "Satu Pintu", desc: "Analisis, desain, pengembangan, hingga jaminan mutu ditangani satu tim yang sama. Tidak ada bola yang jatuh di antara vendor." },
  { no: "02", title: "Fokus Kebutuhan", desc: "Kami mulai dari proses bisnis Anda, bukan dari daftar fitur. Rekomendasi teknologi menyesuaikan tujuan, bukan sebaliknya." },
  { no: "03", title: "Dirawat, Bukan Ditinggal", desc: "Pemeliharaan rutin, pembaruan, dan dukungan teknis tersedia setelah serah terima. Sistem yang hidup butuh perawatan." },
];

export default function WhyDigitak() {
  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Kenapa Digitak</span>
            <h2 className="h-lg display">Mitra teknologi, bukan sekadar vendor.</h2>
            <p className="lede">
              Selama bertahun-tahun kami menjaga kepercayaan klien dan membangun hubungan jangka
              panjang — sebagian besar proyek kami berlanjut menjadi kerja sama pemeliharaan.
            </p>
          </div>
        </div>
        <div className="grid grid-3">
          {reasons.map((r) => (
            <div className="cell" key={r.no}>
              <div className="value-i">{r.no}</div>
              <h3 className="h-sm">{r.title}</h3>
              <p style={{ fontSize: 14, color: "var(--ink-2)" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}