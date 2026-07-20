import { Play } from "lucide-react";

export function VideoEmbed({ label = "VIDEO PLACEHOLDER", featured = false }: { label?: string; featured?: boolean }) {
  return <div className={`video-placeholder ${featured ? "featured" : ""}`} role="img" aria-label={label}>
    <div className="video-grid" aria-hidden="true"/>
    <button type="button" aria-label={`Play ${label.toLowerCase()}`}><Play fill="currentColor" size={18}/></button>
    <span>{label}</span>
  </div>;
}
