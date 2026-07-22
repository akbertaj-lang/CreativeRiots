type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  accent?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, highlight, accent, light = false }: SectionHeadingProps) {
  const highlightParts = highlight && accent ? highlight.split(accent) : null;

  return <div className={`section-heading ${light ? "is-light" : ""} ${highlight ? "has-highlight" : ""} ${accent ? "is-editorial" : ""}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{highlight ? <><span className="heading-support">{title}</span><span className="heading-primary">{highlightParts ? <>{highlightParts[0]}<em>{accent}</em>{highlightParts[1]}</> : highlight}</span></> : title}</h2>
  </div>;
}
