export default function TrustedBy() {
  const clients = ["BKPM", "bank bjb", "PERTAMINA", "KOMINFO", "PU-PR", "PASAR JAYA", "RISTEKDIKTI"];

  return (
    <div className="wrap">
      <div className="section tight">
        <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>
          Dipercaya oleh
        </span>
        <div className="clients">
          {clients.map((name) => (
            <div className="client" key={name}>{name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}