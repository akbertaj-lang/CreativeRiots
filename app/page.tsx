import { Check, Minus, Play } from "lucide-react";
import { homepage, SHOW_CASE_STUDY } from "@/content/homepage";
import { Header } from "@/components/Header";
import { MotionReveal } from "@/components/MotionReveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoEmbed } from "@/components/VideoEmbed";
import { siteConfig } from "@/config/site";

export default function Home() {
  const h = homepage;
  return <main data-release="creative-riots-v1">
    <Header/>
    <section className="hero section-dark" id="top">
      <div className="shell hero-inner">
        <MotionReveal><p className="eyebrow">{h.hero.eyebrow}</p><h1>{h.hero.title}<br/><span>{h.hero.highlight}</span></h1></MotionReveal>
        <MotionReveal delay={.08}><p className="hero-copy">{h.hero.body}</p><div className="hero-actions"><PrimaryCTA/><a className="secondary-cta" href="#content-engine"><i><Play fill="currentColor" size={13}/></i>{h.hero.secondaryCta}</a></div></MotionReveal>
        <MotionReveal className="hero-video" delay={.16}><VideoEmbed label="CREATIVE RIOTS SHOWREEL — REPLACE WITH APPROVED VIDEO" featured/></MotionReveal>
        <div className="trust-row" aria-label="Trustpilot rating requires confirmation"><strong>{h.hero.trust[0]}</strong><span>{h.hero.trust[1]}</span><i/>
          <span>{h.hero.trust[2]}</span></div>
        <div className="metrics">{h.hero.metrics.map(([value,label]) => <article key={value}><strong>{value}</strong><p>{label}</p></article>)}</div>
      </div>
    </section>

    <section className="light-panel" id="problem"><div className="shell">
      <SectionHeading light eyebrow={h.problem.eyebrow} title={h.problem.title} highlight={h.problem.highlight}/>
      <p className="section-copy dark-copy">{h.problem.body}</p>
      <div className="problem-list">{h.problem.items.map(([label,title,body], index) => <MotionReveal className="problem-row" key={label}>
        <div className="problem-marker"><b>{String(index+1).padStart(2,"0")}</b><i/></div><p className="problem-label">{label}</p><div><h3>{title}</h3><p>{body}</p></div>
      </MotionReveal>)}</div><div className="center"><PrimaryCTA/></div>
    </div></section>

    <section className="difference section-dark" id="difference"><div className="shell">
      <SectionHeading eyebrow={h.difference.eyebrow} title={h.difference.title} highlight={h.difference.highlight}/>
      <p className="section-copy">{h.difference.body}</p>
      <div className="comparison">
        <article className="alternative"><div className="alt-head"><span>01</span><h3>FREELANCERS</h3><span>→</span><h3>AGENCIES</h3></div><ul>{h.difference.alternatives.map(item => <li key={item}><Minus aria-hidden="true"/>{item}</li>)}</ul></article>
        <article className="winner"><span className="best-label">THE COMPLETE SYSTEM</span><h3>CREATIVE RIOTS</h3><ul>{h.difference.creativeRiots.map(item => <li key={item}><Check aria-hidden="true"/>{item}</li>)}</ul></article>
      </div>
    </div></section>

    <section className="light-panel engine-panel" id="content-engine"><div className="wide">
      <SectionHeading light eyebrow={h.engine.eyebrow} title={h.engine.title}/><p className="section-copy dark-copy">{h.engine.body}</p>
      <div className="engine-line">{h.engine.steps.map(([number,title,body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <p className="engine-closing">{h.engine.closing}</p><div className="center"><PrimaryCTA/></div>
    </div></section>

    <section className="proof section-dark" id="results"><div className="wide">
      <SectionHeading eyebrow={h.proof.eyebrow} title={h.proof.title}/>
      <div className="proof-media"><div className="proof-placeholder"><span>APPROVED PRODUCTION IMAGE</span><b>01</b></div><div className="proof-placeholder second"><span>APPROVED TEAM IMAGE</span><b>02</b></div></div>
      <p className="section-copy">{h.proof.body}</p><div className="logo-strip">{h.proof.logos.map((logo,index)=><span key={index}>{logo}</span>)}</div>
    </div></section>

    <section className="light-panel process"><div className="shell">
      <SectionHeading light eyebrow={h.process.eyebrow} title={h.process.title}/>
      <div className="process-grid">{h.process.steps.map(([number,title,body])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="center"><PrimaryCTA/></div>
    </div></section>

    <section className="testimonials section-dark" id="testimonials"><div className="wide">
      <SectionHeading eyebrow={h.testimonials.eyebrow} title={h.testimonials.title}/>
      <div className="testimonial-layout">{h.testimonials.items.map(([name,role,quote], index)=><article className={index===0?"testimonial-featured":""} key={index}><VideoEmbed label={`TESTIMONIAL VIDEO ${index+1}`}/><blockquote>{quote}</blockquote><p><b>{name}</b><span>{role}</span></p></article>)}</div>
    </div></section>

    {SHOW_CASE_STUDY && <section className="light-panel case-study" id="case-study"><div className="wide">
      <SectionHeading light eyebrow={h.caseStudy.eyebrow} title={h.caseStudy.title}/>
      <div className="case-layout"><VideoEmbed label="FEATURED CASE STUDY MEDIA" featured/><div className="case-copy"><p className="case-client">{h.caseStudy.client}</p><p>{h.caseStudy.summary}</p><div className="case-results">{h.caseStudy.results.map(result=><strong key={result}>{result}</strong>)}</div><div className="case-actions"><a className="primary-cta" href="#">{h.caseStudy.primaryCta}</a><a className="case-watch" href="#"><Play size={14} fill="currentColor"/>{h.caseStudy.secondaryCta}</a></div></div></div>
    </div></section>}

    <section className="final section-dark" id="contact"><div className="shell final-inner">
      <div><SectionHeading eyebrow={h.final.eyebrow} title={h.final.title} highlight={h.final.highlight}/><p className="section-copy">{h.final.body}</p><PrimaryCTA/></div>
      <div className="final-trust"><strong>{h.final.trust[0]}</strong><span>{h.final.trust[1]}</span><i/><span>{h.final.trust[2]}</span></div>
    </div></section>

    <footer><div className="wide footer-grid"><div className="footer-brand"><span className="logo-text">CREATIVE <b>RIOTS</b></span><p>{siteConfig.description}</p></div><nav aria-label="Footer navigation">{h.footer.links.map((label,index)=><a key={label} href={["#difference","#content-engine","#testimonials","#contact"][index]}>{label}</a>)}</nav><nav aria-label="Social links">{h.footer.socials.map(label=><a key={label} href="#">{label}</a>)}</nav></div><div className="wide copyright"><span>{h.footer.copyright}</span><span>Dedicated content teams for founders and brands.</span></div></footer>
  </main>;
}
