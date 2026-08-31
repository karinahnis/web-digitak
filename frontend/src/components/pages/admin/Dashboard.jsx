import { initialMessages } from "../../../data/messages";

const chartData = [
  { m: "Mar", v: 8 }, { m: "Apr", v: 11 }, { m: "Mei", v: 9 },
  { m: "Jun", v: 14 }, { m: "Jul", v: 12 }, { m: "Agu", v: 18 },
];

export default function Dashboard({ onNavigate }) {
  const max = Math.max(...chartData.map((c) => c.v));
  const recent = initialMessages.slice(0, 4);

  return (
    <>
      <div className="tiles">
        <div className="tile hi">
          <span className="tl">Pesan Belum Dibaca</span>
          <span className="tv">3</span>
          <span className="td">dari 6 pesan masuk</span>
        </div>
        <div className="tile ok">
          <span className="tl">Layanan Tampil</span>
          <span className="tv">6</span>
          <span className="td">dari 6 layanan</span>
        </div>
        <div className="tile ok">
          <span className="tl">Portofolio Tampil</span>
          <span className="tv">7</span>
          <span className="td">dari 8 proyek</span>
        </div>
        <div className="tile pn">
          <span className="tl">Testimoni Menunggu</span>
          <span className="tv">2</span>
          <span className="td">perlu ditinjau</span>
        </div>
      </div>

      <div className="dash-split">
        <div className="panel">
          <div className="panel-head">
            <h3>Pesan masuk per bulan</h3>
            <span className="tag">2026</span>
          </div>
          <div className="panel-body">
            <div className="chart">
              {chartData.map((c) => (
                <div className="bar" key={c.m}>
                  <div className="bar-fill" style={{ height: `${Math.round((c.v / max) * 100)}%` }}>
                    <span>{c.v}</span>
                  </div>
                  <div className="bar-x">{c.m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Pesan terbaru</h3>
            <button className="btn btn-quiet btn-sm" style={{ marginLeft: "auto" }} onClick={() => onNavigate?.("pesan")}>
              Buka kotak masuk
            </button>
          </div>
          <div className="panel-body flush">
            {recent.map((m) => (
              <button key={m.id} className={`msg ${m.read_at ? "read" : ""}`} onClick={() => onNavigate?.("pesan")}>
                <span className="msg-top">
                  {!m.read_at && <span className="msg-unread"></span>}
                  <span className="msg-name">{m.nama}</span>
                  <span className="msg-time">{new Date(m.created_at).toLocaleDateString("id-ID")}</span>
                </span>
                <span className="msg-ex">{m.pesan}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}