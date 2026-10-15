"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown, Clapperboard, Fingerprint, Menu, Send, X } from "lucide-react";
import { Fragment, type MouseEvent, useEffect, useRef, useState } from "react";
import { experimentalContent as content } from "./experimentalContent";
import originalStyles from "./experimental.module.css";
import scaledStyles from "./v2-base.module.css";
import variation from "./v2.module.css";
import { heroVideo } from "./heroVideo";
import { brandRegions } from "./brandRegions";
import { VERSIONS } from "@/config/versions.mjs";
import floating from "./floating.module.css";

const media = {
  capture: "/placeholders/hero-content-shoot.jpg",
  edit: "/placeholders/proof-editing.jpg",
  plan: "/placeholders/proof-planning.jpg",
  story: "/placeholders/case-study-interview.jpg",
} as const;

function jumpToSection(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
  event.preventDefault();

  const target = document.getElementById(sectionId);
  if (!target) return;

  const headerHeight = document.querySelector('header[data-ui="header"]')?.getBoundingClientRect().height ?? 72;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({ top: targetTop, left: 0, behavior: "auto" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

function Header({ isV2 = false, versionSlug = "" }: { isV2?: boolean; versionSlug?:string }) {
  const styles = isV2 ? scaledStyles : originalStyles;
  const [open, setOpen] = useState(false);

  return (
    <header data-ui="header" className={styles.header}>
      <div data-ui="headerInner" className={styles.headerInner}>
        <a data-ui="headerLogo" className={styles.headerLogo} href="#top" aria-label="Creative Riots home" onClick={(event) => jumpToSection(event, "top")}>
          <Image src="/logo-cr-header.png" alt="Creative Riots" width={252} height={94} priority unoptimized />
        </a>
        <nav data-ui="menuPanel" data-open={open} id="main-menu" className={`${styles.menuPanel} ${open ? styles.menuOpen : ""}`} aria-label="Main navigation">
          <a href="#invisible" onClick={(event) => { setOpen(false); jumpToSection(event, "invisible"); }}>The Difference</a>
          <a href="#engine-b" onClick={(event) => { setOpen(false); jumpToSection(event, "engine-b"); }}>Content Engine</a>
          <a href="#voices-b" onClick={(event) => { setOpen(false); jumpToSection(event, "voices-b"); }}>Testimonials</a>
          <a href="#talk-b" onClick={(event) => { setOpen(false); jumpToSection(event, "talk-b"); }}>Contact</a>
          {VERSIONS.length>1 && VERSIONS.map(v=><a className={floating.versionLink} key={v.slug} href={`/${v.slug}`} aria-current={versionSlug===v.slug ? "page" : undefined}>{v.label}</a>)}
        </nav>
        <a data-ui="headerCta" className={styles.headerCta} href="#talk-b" onClick={(event) => jumpToSection(event, "talk-b")}>Book a call <ArrowRight /></a>
        <button data-ui="menuButton"
          className={styles.menuButton}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Photo({ src, alt, position = "center", priority = false }: { src: string; alt: string; position?: string; priority?: boolean }) {
  return (
    <div className={originalStyles.photo}>
      <Image src={src} alt={alt} fill priority={priority} unoptimized sizes="(max-width: 800px) 100vw, 1120px" style={{ objectPosition: position }} />
    </div>
  );
}

export function CalendlyWidget({ showSkeleton = true, autoResize = false }: {showSkeleton?:boolean;autoResize?:boolean}) {
  const [loaded, setLoaded] = useState(false);
  const [fallback, setFallback] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    const timeout = window.setTimeout(() => { if(!disposed) setFallback(true); },4000);
    const onLoaded = () => { window.clearTimeout(timeout); setLoaded(true); setFallback(false); };
    const initialize = () => {
      const calendly = (window as unknown as { Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement; resize?:boolean }) => void } }).Calendly;
      if (!disposed && container.current && calendly) {
        container.current.replaceChildren();
        calendly.initInlineWidget({url: "https://calendly.com/yaminnv/30-minute-meeting?hide_landing_page_details=1&hide_event_type_details=1&hide_gdpr_banner=1", parentElement: container.current,resize:autoResize});
      }
    };
    const observer = new MutationObserver(() => { container.current?.querySelectorAll("iframe").forEach(frame => frame.addEventListener("load", onLoaded, {once:true})); });
    if (container.current) observer.observe(container.current, {childList:true,subtree:true});
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (existing) { initialize(); existing.addEventListener("load", initialize); }
    else {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.addEventListener("load", initialize);
      document.body.appendChild(script);
    }
    return () => { disposed = true; window.clearTimeout(timeout); observer.disconnect(); existing?.removeEventListener("load", initialize); };
  }, [autoResize]);
  return <div className={variation.calendarShell} style={autoResize?{height:fallback&&!loaded?"12rem":"auto",minHeight:0}:undefined} aria-busy={!loaded}>
    {showSkeleton && !loaded && !fallback && <div className={variation.skeleton} role="status" aria-label="Loading booking calendar"><span>Loading calendar…</span><div /><div /><div /></div>}
    <div ref={container} className="calendly-inline-widget" data-resize={autoResize?"true":undefined} data-url="https://calendly.com/yaminnv/30-minute-meeting?hide_landing_page_details=1&hide_event_type_details=1&hide_gdpr_banner=1" style={{width: "100%", height: autoResize?"28rem":"100%", minHeight: autoResize?0:"20rem"}} aria-label="Calendly inline booking widget">
    {showSkeleton && <iframe onLoad={() => setLoaded(true)} title="Calendly booking calendar" src="https://calendly.com/yaminnv/30-minute-meeting?hide_landing_page_details=1&hide_event_type_details=1&hide_gdpr_banner=1" style={{width: "100%", height: "100%", minHeight: "20rem", border: 0}} />}
  </div>{fallback && !loaded && <div className={floating.calendarFallback}><a href="https://calendly.com/yaminnv/30-minute-meeting" target="_blank" rel="noreferrer">Open Calendly <ArrowRight /></a></div>}</div>;
}

export default function ExperimentalHome({ isV2 = false,versionSlug="",layout="original" }: { isV2?: boolean;versionSlug?:string;layout?:string }) {
  const styles = isV2 ? scaledStyles : originalStyles;
  const HeroContent = isV2 ? "div" : Fragment;
  const Split = isV2 ? "div" : Fragment;
  const bookingUrl = content.booking.calendlyUrl || content.booking.fallbackUrl;
  const stageIcons = [Fingerprint, Clapperboard, Send];
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const targets = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    const cinematicSections = Array.from(page.querySelectorAll<HTMLElement>("[data-cinematic]"));
    page.classList.add(styles.motionReady);

    let frame = 0;
    const updateScrollMotion = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const documentHeight = Math.max(document.documentElement.scrollHeight - viewport, 1);
      page.style.setProperty("--page-progress", String(Math.min(1, Math.max(0, window.scrollY / documentHeight))));

      cinematicSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
        section.style.setProperty("--section-progress", String(progress));
      });
    };
    const requestScrollMotion = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollMotion);
    };
    updateScrollMotion();
    window.addEventListener("scroll", requestScrollMotion, { passive: true });
    window.addEventListener("resize", requestScrollMotion);

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add(styles.inView));
      return () => {
        window.removeEventListener("scroll", requestScrollMotion);
        window.removeEventListener("resize", requestScrollMotion);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(styles.inView);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestScrollMotion);
      window.removeEventListener("resize", requestScrollMotion);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={pageRef} className={`${styles.page} ${isV2 ? variation.page : ""}`}>
      <a className={styles.skip} href="#experimental-main">Skip to main content</a>
      <Header isV2={isV2} versionSlug={versionSlug} />

      <main id="experimental-main" className={layout === "float" ? floating.float : layout === "default" || layout === "original" ? undefined : `layout-${layout}`}>
        <section className={`${styles.hero} ${isV2 ? variation.hero : ""}`} id="top" aria-labelledby="hero-title" data-cinematic>
          <HeroContent {...(isV2 ? { className: variation.text } : {})}>
          <span className={styles.eyebrow}>Content Engine Studio</span>
          <h1 id="hero-title">We run your entire{isV2 ? " " : <br />}<em>content engine.</em></h1>
          <p>From the first idea to the final post, a dedicated team that works only with<br className={styles.desktopBreak} /> you handles it all.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={bookingUrl}>Book a call <ArrowRight /></a>
            <a className={styles.secondaryButton} href="#engine-b" onClick={(event) => jumpToSection(event, "engine-b")}>See how it works <ChevronDown /></a>
          </div>
          <div data-ui="heroMetrics" className={styles.heroMetrics} aria-label="Creative Riots results">
            <article><strong>70M+</strong><span>Views generated across all channels</span></article>
            <article><strong>10,000+</strong><span>Videos produced for our clients</span></article>
            <article><strong>100+</strong><span>Brands supported and growing</span></article>
          </div>
          </HeroContent>
          {isV2 && <div className={variation.media}>
            {heroVideo.videoSrc ? (
              <video controls playsInline preload="none" poster={heroVideo.posterSrc} aria-label={heroVideo.videoTitle}>
                <source src={heroVideo.videoSrc} />
              </video>
            ) : (
              <figure aria-label={`${heroVideo.videoTitle}: coming soon`}>
                <img src={heroVideo.posterSrc} alt="Creative Riots filming a founder in the studio" />
                <span className={variation.play} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 5v14l11-7z" /></svg></span>
                {layout!=="float" && <figcaption>Showreel coming soon</figcaption>}
              </figure>
            )}
          </div>}
          <i className={styles.heroCircle} aria-hidden="true" />
        </section>

        {!isV2 && <div className={styles.signalTicker} aria-hidden="true">
          <div>
            <span>Strategy</span><i>•</i><span>Production</span><i>•</i><span>Post</span><i>•</i><span>Distribution</span><i>•</i>
            <span>Strategy</span><i>•</i><span>Production</span><i>•</i><span>Post</span><i>•</i><span>Distribution</span><i>•</i>
          </div>
        </div>}


        <section className={styles.brands} id="proof-b" aria-labelledby="brands-title" data-cinematic>
          <div data-ui="brandsInner" className={styles.brandsInner}>
            {isV2 ? <header className={variation.sectionHead}>
              <div className={variation.sectionHeadMain}><h2 id="brands-title">Brands<br /><em>We’ve Worked With.</em></h2><p>Trusted with content by brands ready to be seen.</p></div>
              <a className={variation.textCta} href="#testimonials" onClick={(e) => jumpToSection(e, "voices-b")}>See what clients say <ArrowRight /></a>
            </header> : <header data-reveal="left">
              <span aria-hidden="true">05</span>
              <h2 id="brands-title">Brands<br /><em>We’ve Worked With.</em></h2>
              <i aria-hidden="true" />
            </header>}
            {!isV2 && <p data-reveal="right">Trusted with content by brands ready to be seen.</p>}
            {isV2 ? <div className={variation.originalLogoStrip} aria-label="All original brand logos">
              <div className={variation.brandTrack}>
              {[0,1].map(loop => <div className={variation.brandGroup} key={loop} aria-hidden={loop === 1 ? true : undefined}>{brandRegions.map(([x,y,w,h,name],index) => <div className={variation.brandCell} key={name}><svg viewBox={`${x} ${y} ${w} ${h}`} role="img" aria-label={name}><defs><clipPath id={`brand-${loop}-${index}`}><rect x={x} y={y} width={w} height={h} /></clipPath></defs><image href="/brand-logos-strip.png" width="2400" height="360" clipPath={`url(#brand-${loop}-${index})`} /></svg></div>)}</div>)}
              </div>
            </div> : <div className={styles.logoRow} data-reveal="fade">
              <div className={styles.logoTrack}>
                <Image src="/brand-logos-strip.png" alt="Magic Eden, Animoca Brands, Karate Combat, Pixelmon, Solana Gaming, Jupiter, Forbes Web3, Educhain, pump.fun, Meteora, Nibiru, Pixels, Agglayer and Seedify" width={1882} height={291} unoptimized />
                <Image src="/brand-logos-strip.png" alt="" aria-hidden="true" width={1882} height={291} unoptimized />
              </div>
            </div>}
          </div>
        </section>

        <section className={styles.visibility} id="invisible" aria-labelledby="visibility-title" data-cinematic>
          {!isV2 && <span data-ui="sectionNumber" className={styles.sectionNumber} aria-hidden="true">01</span>}
          <Split {...(isV2 ? {className: `${variation.split} ${layout==="float" ? floating.wrap : ""}`} : {})}>
          <div data-ui="visibilityMedia" className={styles.visibilityMedia} data-reveal="media">
            <Photo src={media.capture} alt="A founder being filmed by a Creative Riots production team" position="center 48%" priority />
          </div>
          <div data-ui="visibilityCard" className={`${styles.copyCard} ${styles.visibilityCard}`} data-reveal={layout==="float" ? undefined : "card-left"}>
            <span>The Visibility Gap</span>
            <h2 id="visibility-title">{layout==="float" ? <><span>You’re Not Showing</span><span>Up Enough.</span></> : isV2 ? <>You’re Not<br />Showing <em>Up Enough.</em></> : <>You’re Not Showing<br />Up <em>Enough.</em></>}</h2>
            <h3>And it’s costing you more than you think.</h3>
            <p>Not enough of the right people know who you are, and when you do post, it doesn’t travel far. You know it needs fixing, but you don’t have the time to do it yourself.</p>
          </div>
          </Split>
        </section>

        <section className={styles.engine} id="engine-b" aria-labelledby="engine-title" data-cinematic>
          <Split {...(isV2 ? {className: `${variation.split} ${layout==="float" ? `${floating.wrap} ${floating.top}` : ""}`} : {})}>
          <div data-ui="engineMedia" className={styles.engineMedia} data-reveal="media">
            <Photo src={media.edit} alt="Creative Riots editors working inside a production suite" position="center 52%" />
          </div>
          <div data-ui="engineCard" className={`${styles.copyCard} ${styles.engineCard}`} data-reveal={layout==="float" ? undefined : "card-left"}>
            <span>The Content Engine</span>
            <h2 id="engine-title">{layout==="float" ? <><span>We’re Content‑Engine</span><span>Obsessed.</span></> : isV2 ? <>We’re<br />Content‑Engine <em>Obsessed.</em></> : <>We’re Content-Engine<br /><em>Obsessed.</em></>}</h2>
            <p>Strategy, production and distribution handled by one dedicated team that learns your brand inside out.</p>
            <a className={styles.primaryButton} href={bookingUrl}>Book a call <ArrowRight /></a>
          </div>
          </Split>
          <div data-ui="stageStrip" className={styles.stageStrip}>
            <div data-ui="engineSignal" className={styles.engineSignal} aria-hidden="true"><i /><span /><span /><span /></div>
            {content.engine.stages.map(([number, title, copy], index) => {
              const StageIcon = stageIcons[index];
              return (
                <article key={number} data-reveal="up" style={{ transitionDelay: `${index * 110}ms` }}>
                  <div data-ui="stageVisual" className={styles.stageVisual}>
                    <i aria-hidden="true" />
                    <StageIcon strokeWidth={1.35} aria-hidden="true" />
                    {!isV2 && <b>{number}</b>}
                  </div>
                  <h3>{isV2 ? <span className={variation.stageTitle}><b>{number}</b><span>{title}</span></span> : title}<ArrowRight /></h3>
                  <p>{copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.filmmaker} id="filmmaker-b" aria-labelledby="filmmaker-title" data-cinematic>
          <Split {...(isV2 ? {className: `${variation.split} ${layout==="float" ? floating.wrap : ""}`} : {})}>
          <div data-ui="filmmakerMedia" className={`${styles.filmmakerMedia} ${isV2 ? variation.filmmakerMedia : ""}`} data-reveal="media">
            <Photo src={media.edit} alt="Filmmakers refining a story in an editing suite" position="center 50%" />
            <span className={styles.cropMark} aria-hidden="true" />
            <div className={styles.filmInterface} aria-hidden="true">
              <span><i /> REC</span><b>TC 00:42:17:08</b><em>24 FPS / 4K</em>
              <div><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
          <div data-ui="filmmakerCard" className={`${styles.copyCard} ${styles.filmmakerCard} ${isV2 ? variation.filmmakerCard : ""}`} data-reveal={layout==="float" ? undefined : isV2 ? "card-left" : "card-right"}>
            <span>Craft Meets Current Tools</span>
            <h2 id="filmmaker-title">{layout==="float" ? <><span>Filmmakers</span><span>At Heart.</span></> : <>Filmmakers<br /><em>At Heart.</em></>}</h2>
            <p>Before any of this, we studied and made films. This is why we look at content like a filmmaker looks at a scene, what to keep, what to cut, what makes people feel something. And we pair that eye with the latest tools, so the work always feels current.</p>
          </div>
          </Split>
        </section>

        <section className={styles.start} id="start-b" aria-labelledby="start-title">
          <header className={isV2 ? variation.sectionHead : undefined} data-reveal="left">
            <div className={isV2 ? variation.sectionHeadMain : undefined}>
            <h2 id="start-title">How To <em>Start.</em></h2>
            <p>One honest call. One team built around you. Then consistent content that makes your expertise impossible to miss.</p>
            </div>
            {isV2 && <a className={variation.textCta} href="#contact" onClick={(e) => jumpToSection(e, "talk-b")}>Book a call <ArrowRight /></a>}
          </header>
          <div data-ui="startSteps" className={styles.startSteps}>
            {content.gettingStarted.map(([number, title, copy], index) => (
              <article key={number} data-reveal="up" style={{ transitionDelay: `${index * 110}ms` }}>
                <b>{number}</b>
                <h3>{isV2 ? title.charAt(0) + title.slice(1).toLowerCase() : title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>


        <section className={styles.testimonials} id="voices-b" aria-labelledby="stories-title" data-cinematic>
          <div data-ui="testimonialHero" className={`${styles.testimonialHero} ${isV2 ? variation.split : ""} ${layout==="float" ? floating.wrap : ""}`} data-reveal="fade">
            <Photo src={media.story} alt="A Creative Riots client sharing their experience on camera" position="center 46%" />
            <span className={styles.cropMark} aria-hidden="true" />
            <div data-ui="testimonialCard" className={`${styles.copyCard} ${styles.testimonialCard}`}>
              <h2 id="stories-title">{layout==="float" ? <><span>Take Their</span><span>Word For It.</span></> : <>Take Their<br /><em>Word For It.</em></>}</h2>
              <p>Real clients. Real working relationships. Real outcomes.<br />Judge for yourself.</p>
            </div>
          </div>
          <div data-ui="testimonialGrid" className={styles.testimonialGrid}>
            {content.testimonials.map((testimonial, index) => (
              <article key={testimonial.id} data-reveal="up" style={{ transitionDelay: `${index * 110}ms` }}>
                <div><Image src={isV2 && index === 2 ? "/placeholders/proof-planning.png" : testimonial.thumbnail} alt="" fill unoptimized loading={isV2 ? "eager" : "lazy"} sizes="(max-width: 800px) 88vw, 380px" /></div>
                <q>{testimonial.quote}</q>
                <p>{testimonial.name} — {testimonial.company}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={`${styles.footer} ${layout==="float" ? floating.booking : ""}`} id="talk-b" data-cinematic>
        <div data-ui="closingCta" className={styles.closingCta}>
          <div data-reveal="left">
            <h2>Let’s Stop Planning<br /><em>And Start Posting.</em></h2>
            <p>{content.bookingBody}</p>
          </div>
          <div data-ui="bookingPanel" className={styles.bookingPanel} data-reveal="right">
            <div data-ui="bookingPanelIntro" className={styles.bookingPanelIntro}>
              {layout!=="float" && <i aria-hidden="true" />}
              <span>Book a 30-minute strategy call</span>
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                Open Calendly <ArrowRight />
              </a>
            </div>
            <div data-ui="bookingEmbed" className={styles.bookingEmbed} aria-label="Calendly booking calendar">
              {isV2 ? <CalendlyWidget showSkeleton={layout!=="float"} /> : <iframe
                title="Calendly booking calendar"
                src="https://calendly.com/yaminnv/30-minute-meeting?hide_landing_page_details=1&hide_event_type_details=1&hide_gdpr_banner=1"
                loading="lazy"
              />}
            </div>
          </div>
        </div>
        <div data-ui="footerBottom" className={styles.footerBottom}>
          <Image src="/creative-riots-footer-logo.png" alt="Creative Riots" width={150} height={67} unoptimized />
          <small>© 2026 Creative Riots. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}
