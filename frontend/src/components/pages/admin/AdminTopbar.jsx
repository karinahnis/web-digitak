export default function AdminTopbar({ eyebrow, title, actions }) {
  return (
    <div className="topbar">
      <div className="tb-title">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>{actions}</div>
    </div>
  );
}