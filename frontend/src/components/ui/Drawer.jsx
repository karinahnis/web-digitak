export default function Drawer({ open, eyebrow, title, children, footer, onClose }) {
  return (
    <>
      <div className={`scrim ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="drawer-head">
          <div className="dh-t">
            <span className="eyebrow">{eyebrow}</span>
            <h3>{title}</h3>
          </div>
        </div>
        <div className="drawer-body">{children}</div>
        <div className="drawer-foot">{footer}</div>
      </aside>
    </>
  );
}