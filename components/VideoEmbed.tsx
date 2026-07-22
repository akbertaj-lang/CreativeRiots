import Image from "next/image";
import { Play } from "lucide-react";

type VideoEmbedProps = {
  label?: string;
  featured?: boolean;
  image?: string;
  alt?: string;
};

export function VideoEmbed({ label = "VIDEO PLACEHOLDER", featured = false, image, alt = "Video placeholder" }: VideoEmbedProps) {
  return <div className={`video-placeholder ${featured ? "featured" : ""}`} role="img" aria-label={label}>
    {image ? <Image src={image} alt={alt} fill sizes={featured ? "(max-width: 900px) 100vw, 700px" : "(max-width: 680px) 88vw, 420px"} unoptimized/> : <div className="video-grid" aria-hidden="true"/>}
    <button type="button" aria-label={`Play ${label.toLowerCase()}`}><Play fill="currentColor" size={18}/></button>
    <span>{label}</span>
  </div>;
}
