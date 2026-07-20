export function SectionHeading({ eyebrow, title, highlight, light = false }: { eyebrow: string; title: string; highlight?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "is-light" : ""}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}{highlight && <><br/><span>{highlight}</span></>}</h2>
  </div>;
}
