import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { initialMessages } from "../../../data/messages";

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function Inbox() {
  const [messages, setMessages] = useState(initialMessages);
  const [filter, setFilter] = useState("semua");
  const [selectedId, setSelectedId] = useState(initialMessages[0]?.id ?? null);

  const counts = {
    semua: messages.length,
    pending: messages.filter((m) => m.status === "pending").length,
    diteruskan: messages.filter((m) => m.status === "diteruskan").length,
    selesai: messages.filter((m) => m.status === "selesai").length,
  };
  const visible = messages.filter((m) => filter === "semua" || m.status === filter);
  const selected = messages.find((m) => m.id === selectedId);

  function selectMessage(id) {
    setSelectedId(id);
    setMessages(messages.map((m) =>
      m.id === id && !m.read_at ? { ...m, read_at: new Date().toISOString(), read_by: "admin01" } : m
    ));
  }

  function markRead(id) {
    setMessages(messages.map((m) =>
      m.id === id ? { ...m, read_at: new Date().toISOString(), read_by: "admin01" } : m
    ));
  }

  function setStatus(id, status) {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Kotak Masuk</h3>
        <div className="ph-actions">
          {["semua", "pending", "diteruskan", "selesai"].map((f) => (
            <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f} <span style={{ opacity: 0.6 }}>{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="panel-body flush">
        <div className="inbox">
          <div className="inbox-list">
            {visible.length === 0 && <div className="empty">Tidak ada pesan pada saringan ini.</div>}
            {visible.map((m) => (
              <button
                key={m.id}
                className={`msg ${m.read_at ? "read" : ""}`}
                aria-selected={m.id === selectedId}
                onClick={() => selectMessage(m.id)}
              >
                <span className="msg-top">
                  {!m.read_at && <span className="msg-unread"></span>}
                  <span className="msg-name">{m.nama}</span>
                  <span className="msg-time">{new Date(m.created_at).toLocaleDateString("id-ID")}</span>
                </span>
                <span className="msg-co">{m.perusahaan}</span>
                <span className="msg-ex">{m.pesan}</span>
                <span className={`tag ${m.status}`} style={{ alignSelf: "flex-start", marginTop: 2 }}>{m.status}</span>
              </button>
            ))}
          </div>

          <div className="inbox-detail">
            {!selected && <div className="empty">Pilih pesan untuk membacanya.</div>}
            {selected && (
              <>
                <div className="detail-head">
                  <span className="avatar" style={{ width: 44, height: 44, fontSize: 15 }}>{initials(selected.nama)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 19 }}>{selected.nama}</h3>
                    <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{selected.email}</div>
                  </div>
                  <span className={`tag ${selected.status}`}>{selected.status}</span>
                </div>
                <div className="detail-meta">
                  <div className="dm"><span className="l">Perusahaan</span><span className="v">{selected.perusahaan}</span></div>
                  <div className="dm"><span className="l">Diterima</span><span className="v">{new Date(selected.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</span></div>
                  <div className="dm"><span className="l">Dibaca oleh</span><span className="v">{selected.read_by ? `${selected.read_by}` : "Belum dibaca"}</span></div>
                </div>
                <div className="msgbody">{selected.pesan}</div>
                <div className="detail-actions">
                  <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)" }}>Status</span>
                    <select className="inp" style={{ width: "auto" }} value={selected.status} onChange={(e) => setStatus(selected.id, e.target.value)}>
                      <option value="pending">pending</option>
                      <option value="diteruskan">diteruskan</option>
                      <option value="selesai">selesai</option>
                    </select>
                  </label>
                  {!selected.read_at && (
                    <button className="btn btn-quiet btn-sm" onClick={() => markRead(selected.id)}>
                      <Check size={14} /> Tandai Dibaca
                    </button>
                  )}
                  <a className="btn btn-primary btn-sm" href={`mailto:${selected.email}`}>
                    <Mail size={14} /> Balas via Email
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}