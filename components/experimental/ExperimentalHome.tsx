"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Check, Menu, MoveUpRight, Play, Radio, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experimentalContent as content } from "./experimentalContent";
import styles from "./experimental.module.css";

const sections = [
  ["01", "SIGNAL", "#signal"], ["02", "INVISIBLE", "#invisible"], ["03", "ENGINE", "#engine-b"],
  ["04", "START", "#start-b"], ["05", "PROOF", "#proof-b"], ["06", "VOICES", "#voices-b"], ["07", "TALK", "#talk-b"],
] as const;

function SignalWave({ dense = false }: { dense?: boolean }) {
  return <span className={`${styles.signalWave} ${dense ? styles.signalWaveDense : ""}`} aria-hidden="true">
    {Array.from({ length: dense ? 42 : 24 }, (_, index) => <i key={index} style={{ "--bar": `${8 + ((index * 17) % 31)}px` } as React.CSSProperties}/>) }
  </span>;
}

function CalendlyDestination() {
  const shell = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const url = content.booking.calendlyUrl;

  useEffect(() => {
    const element = shell.current;
    if (!element || load) return;
    if (!("IntersectionObserver" in window)) { setLoad(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoad(true); observer.disconnect(); }
    }, { rootMargin: "420px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [load]);

  const embed = url ? `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=f5f6ef&text_color=251749&primary_color=3457ff` : "";
  return <div className={styles.calendarShell} ref={shell} data-cursor="BOOK">
    <div className={styles.calendarTop}><span><i/> TRANSMISSION OPEN</span><em>CR / CALENDAR</em></div>
    {url && load && !failed && <iframe className={`${styles.calendarFrame} ${ready ? styles.calendarReady : ""}`} src={embed} title="Book a discovery call with Creative Riots" loading="lazy" onLoad={() => setReady(true)} onError={() => setFailed(true)}/>}
    {url && load && !ready && !failed && <div className={styles.calendarLoading} role="status"><Radio/><span>Receiving available times</span></div>}
    {(!url || failed) && <div className={styles.calendarFallback} role={failed ? "alert" : undefined}><span>THE DIRECT LINE</span><p>{failed ? "The calendar couldn’t connect." : "Choose a time to start the conversation."}</p><a href={url || content.booking.fallbackUrl}>OPEN BOOKING <MoveUpRight/></a></div>}
  </div>;
}

function EdgeNavigation({ active, open, setOpen }: { active: number; open: boolean; setOpen: (open: boolean) => void }) {
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = prior; document.removeEventListener("keydown", escape); };
  }, [open, setOpen]);

  return <>
    <header className={styles.edgeHeader}>
      <a className={styles.monogram} href="#signal" aria-label="Creative Riots experimental home"><span>CR</span><i/></a>
      <div className={styles.sectionReadout} aria-live="polite"><span>{sections[active][0]}</span><b>{sections[active][1]}</b></div>
      <a className={styles.fixedBook} href="#talk-b" data-cursor="BOOK">BOOK <ArrowDownRight/></a>
      <button className={styles.signalMenu} type="button" aria-expanded={open} aria-controls="experimental-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}<span className={styles.menuPulse}/></button>
    </header>
    <AnimatePresence>{open && <motion.nav id="experimental-menu" className={styles.menuOverlay} aria-label="Experimental navigation" initial={{ clipPath: "circle(0% at 94% 6%)" }} animate={{ clipPath: "circle(145% at 94% 6%)" }} exit={{ clipPath: "circle(0% at 94% 6%)" }} transition={{ duration: .7, ease: [.77, 0, .18, 1] }}>
      <div className={styles.menuSignal}><SignalWave dense/></div>
      {sections.map(([number, label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}><span>{number}</span>{label}<ArrowDownRight/></a>)}
    </motion.nav>}</AnimatePresence>
  </>;
}

function Hero({ onShowreel }: { onShowreel: () => void }) {
  return <section className={styles.hero} id="signal" data-section="0" aria-labelledby="signal-heading">
    <div className={styles.heroNoise} aria-hidden="true"/>
    <div className={styles.heroEyebrow}><span>LIVE TRANSMISSION / 001</span><b>{content.hero.eyebrow}</b><i>REC</i></div>
    <h1 id="signal-heading" className={styles.heroTitle}>
      <span>{content.hero.headline[0]}</span>
      <span>{content.hero.headline[1]}</span>
      <span className={styles.outlineWord}>{content.hero.headline[2]}</span>
      <span className={styles.acidWord}>{content.hero.headline[3]}</span>
    </h1>
    <button className={styles.heroMedia} type="button" onClick={onShowreel} aria-label="Open Creative Riots showreel preview" data-cursor="PLAY">
      <Image src="/placeholders/hero-content-shoot.jpg" alt="A founder recording content with a creative production team" fill sizes="(max-width: 760px) 86vw, 36vw" priority unoptimized/>
      <span className={styles.mediaChannels} aria-hidden="true"/>
      <span className={styles.mediaPlay}><Play fill="currentColor"/></span>
      <span className={styles.timecode}>00:42:18 / SOURCE A</span>
    </button>
    <p className={styles.heroBody}>{content.hero.body}</p>
    <a className={styles.primaryCta} href="#talk-b" data-cursor="BOOK">BOOK A CALL <ArrowRight/></a>
    <div className={styles.heroMetrics}>{content.hero.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <div className={styles.heroWave}><SignalWave dense/><span>INPUT</span><b>LIVE SIGNAL</b><em>OUTPUT</em></div>
  </section>;
}

function Visibility() {
  return <section className={styles.visibility} id="invisible" data-section="1" aria-labelledby="invisible-heading">
    <div className={styles.signalLoss}><span>SIGNAL STRENGTH</span><b>12%</b><i/></div>
    <h2 id="invisible-heading" className={styles.visibilityTitle}>{content.visibilityHeading.map((line, index) => <span className={index > 1 ? styles.disappearing : ""} key={line}>{line}</span>)}</h2>
    <p className={styles.visibilityLead}>Being great at what you do used to be enough.</p>
    <div className={styles.painField}>{content.visibility.pains.map((pain, index) => <article key={pain}><span>0{index + 1}</span><p>{pain}</p></article>)}</div>
    <div className={styles.noiseStatement} aria-hidden="true"><span>UNRECEIVED</span><span>UNRECEIVED</span></div>
  </section>;
}

function Engine() {
  return <section className={styles.engine} id="engine-b" data-section="2" aria-labelledby="engine-b-heading">
    <header className={styles.engineIntro}><span>03 / DECODE → MULTIPLY</span><h2 id="engine-b-heading">{content.engine.heading}</h2><p>{content.engine.intro}</p></header>
    <div className={styles.engineViewport} data-cursor="EXPLORE">
      <div className={styles.engineTrack}>
        {content.engine.stages.map(([number, title, copy], index) => <article className={styles.engineStage} key={number}>
          <div className={styles.stageMeta}><span>STAGE {number}</span><i>{["CAPTURED", "TRANSFORMED", "BROADCAST"][index]}</i></div>
          <h3>{title}</h3><p>{copy}</p>
          <div className={`${styles.machine} ${styles[`machine${index + 1}`]}`} aria-hidden="true">
            <span className={styles.seed}/><span className={styles.machinePulse}/>
            {Array.from({ length: 6 + index * 3 }, (_, item) => <i key={item} style={{ "--item": item } as React.CSSProperties}/>) }
          </div>
        </article>)}
      </div>
    </div>
    <div className={styles.engineTicker}><span>VOICE</span><b>STORY</b><span>VISION</span><b>EDIT</b><span>POST</span><b>DISTRIBUTE</b><span>REPEAT</span></div>
  </section>;
}

function Process() {
  return <section className={styles.process} id="start-b" data-section="3" aria-labelledby="start-b-heading">
    <div className={styles.processTitle}><span>04 / THREE ACTS</span><h2 id="start-b-heading">Getting started is easier than you’d think</h2></div>
    <div className={styles.acts}>{content.gettingStarted.map(([number, title, copy], index) => <article className={styles.act} key={number}>
      <span className={styles.actNumber}>{number}</span><div className={styles.actSignal} aria-hidden="true"><i/><i/><i/></div><div><small>{["OPEN THE CHANNEL", "BUILD THE SYSTEM", "BECOME THE SIGNAL"][index]}</small><h3>{title}</h3><p>{copy}</p>{index === 0 && <a href="#talk-b">START HERE <ArrowRight/></a>}</div>
    </article>)}</div>
  </section>;
}

function Brands() {
  return <section className={styles.brands} id="proof-b" data-section="4" aria-labelledby="proof-b-heading">
    <header><span>05 / RECEIVED BY</span><h2 id="proof-b-heading">{content.brandsHeading}</h2><p>{content.brandsSubheading}</p></header>
    <div className={styles.brandField} data-cursor="DRAG">
      <div className={styles.brandPlane}>
        <Image src="/brand-logos-strip.png" alt="Magic Eden, Animoca Brands, Karate Combat, Pixelmon, Solana Gaming, Jupiter, Forbes Web3, Abstract, Doodles, EDUCHAIN, Pump.fun, Meteora Ecosystem, Nibiru, Pixels, Agglayer, Seedify, Revoke and Somnia" width={1880} height={260} unoptimized/>
        <div className={styles.brandNames}>{content.brands.map((brand, index) => <span key={brand.name} style={{ "--brand": index } as React.CSSProperties}>{brand.name}</span>)}</div>
      </div>
    </div>
  </section>;
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const story = content.testimonials[active];
  return <section className={styles.voices} id="voices-b" data-section="5" aria-labelledby="voices-b-heading">
    <header><span>06 / MEDIA ARCHIVE</span><h2 id="voices-b-heading">{content.testimonialHeading}</h2><p>{content.testimonialSubheading}</p></header>
    <div className={styles.archive}>
      <div className={styles.archiveFrames} data-cursor="VIEW">
        {content.testimonials.map((testimonial, index) => <button type="button" className={`${styles.storyFrame} ${index === active ? styles.storyActive : ""}`} onClick={() => setActive(index)} aria-pressed={index === active} aria-label={`Show testimonial from ${testimonial.name}`} key={testimonial.id}>
          <Image src={testimonial.thumbnail} alt="" fill sizes="(max-width: 800px) 65vw, 32vw" unoptimized/><span>0{index + 1}</span><i>{testimonial.company}</i>
        </button>)}
      </div>
      <article className={styles.activeQuote} key={story.id} aria-live="polite"><span>STORY 0{active + 1} / 0{content.testimonials.length}</span><blockquote>“{story.quote}”</blockquote><p><strong>{story.name}</strong><i>{story.company}</i></p><div><b style={{ width: `${((active + 1) / content.testimonials.length) * 100}%` }}/></div></article>
    </div>
  </section>;
}

function Booking() {
  return <section className={styles.booking} id="talk-b" data-section="6" aria-labelledby="talk-b-heading">
    <div className={styles.bookingHalo} aria-hidden="true"/>
    <div className={styles.bookingCopy}><span>07 / THE DESTINATION</span><h2 id="talk-b-heading">{content.bookingHeading.map(line => <i key={line}>{line}</i>)}<em>{content.bookingAccent}</em></h2><p>{content.bookingBody}</p><div><span><Check/>30-minute discovery call</span><span><Check/>Honest fit check, no hard sell</span></div></div>
    <CalendlyDestination/>
  </section>;
}

export default function ExperimentalHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showreel, setShowreel] = useState(false);

  useEffect(() => {
    if (!showreel) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setShowreel(false); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [showreel]);

  return <div className={styles.page}>
    <a className={styles.skip} href="#experimental-main">Skip to main content</a>
    <EdgeNavigation active={0} open={menuOpen} setOpen={setMenuOpen}/>
    <main id="experimental-main"><Hero onShowreel={() => setShowreel(true)}/><Visibility/><Engine/><Process/><Brands/><Testimonials/><Booking/></main>
    <footer className={styles.footer}><div><span>CREATIVE</span><span>RIOTS</span></div><p>{content.footer.statement}</p><a href="#signal">BACK TO SIGNAL <ArrowRight/></a><small>{content.footer.copyright}</small></footer>
    <AnimatePresence>{showreel && <motion.div className={styles.showreelModal} role="dialog" aria-modal="true" aria-label="Creative Riots showreel preview" initial={{ clipPath: "inset(50% 50% 50% 50%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} exit={{ clipPath: "inset(50% 50% 50% 50%)" }} transition={{ duration: .7, ease: [.77, 0, .18, 1] }}><button type="button" onClick={() => setShowreel(false)} aria-label="Close showreel"><X/></button><Image src="/placeholders/hero-content-shoot.jpg" alt="Creative Riots content production showreel preview" fill sizes="100vw" unoptimized/><div><span>SHOWREEL / PREVIEW</span><SignalWave dense/><p>Sound remains off until a real showreel source is connected.</p></div></motion.div>}</AnimatePresence>
  </div>;
}
