import { Star, ArrowRight } from "lucide-react";
import { initialTestimonials as testimonials } from "../data/testimonials";

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function Testimonials({ onNavigate }) {
  return (
    <div className="wrap">
      <div className="section">
        <div className="section-head">
          <div className="sh-text">
            <span className="eyebrow">Testimoni</span>
            <h2 className="h-lg display">Kata mereka yang sudah bekerja sama.</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("testimoni")}>
            Semua testimoni <ArrowRight size={14} />
          </button>
        </div>
        <div className="tm-grid">
          {testimonials.filter((t) => t.status === 1).slice(0, 3).map((t) => (
            <figure className="tm" key={t.id}>
              <div className="tm-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={14} fill={n <= t.rating ? "currentColor" : "none"} className={n > t.rating ? "off" : ""} />
                ))}
              </div>
              <q>{t.kutipan}</q>
              <figcaption className="tm-by">
                <span className="avatar">{initials(t.nama_klien)}</span>
                <span>
                  <span className="n" style={{ display: "block" }}>{t.nama_klien}</span>
                  <span className="d">{t.peran}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}