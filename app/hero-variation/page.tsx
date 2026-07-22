"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  AudioWaveform,
  BadgeCheck,
  CalendarDays,
  Check,
  CirclePlay,
  Clapperboard,
  Compass,
  Menu,
  MessageSquareText,
  MoveUpRight,
  Orbit,
  Play,
  RadioTower,
  ScanFace,
  Send,
  Sparkles,
  Timer,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { homepage } from "@/content/homepage";
import styles from "./page.module.css";

const problemIcons: LucideIcon[] = [ScanFace, UsersRound, AudioWaveform, Timer, MessageSquareText, Compass];
const launchIcons: LucideIcon[] = [CalendarDays, Orbit, RadioTower];
const engineStages = [
  { number: "01", label: "BRAND INTELLIGENCE", title: "WE LEARN YOU", copy: "We study your story, voice, vision and audience until the team can think in your language — not imitate it.", icon: ScanFace },
  { number: "02", label: "CONTENT PRODUCTION", title: "WE BUILD YOUR CONTENT", copy: "A dedicated creative team turns a few hours of your time into a weekly stream of ideas, stories and finished content.", icon: Clapperboard },
  { number: "03", label: "ACTIVE DISTRIBUTION", title: "WE PUT IT TO WORK", copy: "Every piece is shaped for the right platform and sent towards the people who should already know your name.", icon: Send },
] as const;

function CalendlyEmbed() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const url = homepage.booking.calendlyUrl;

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || shouldLoad) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "320px" });
    observer.observe(shell);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const embedUrl = url ? `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=dce8ee&text_color=18324a&primary_color=18324a` : "";

  return <div className={styles.calendarFrame} ref={shellRef}>
    <div className={styles.calendarBar}><span/><b>BOOKING WINDOW</b><em>LIVE AVAILABILITY</em></div>
    {url && shouldLoad && <iframe className={loaded ? styles.calendarLoaded : ""} src={embedUrl} title="Book a discovery call with Creative Riots" loading="lazy" onLoad={() => setLoaded(true)}/>}
    {url && shouldLoad && !loaded && <div className={styles.calendarStatus}><i/><span>Loading available times…</span></div>}
    {!url && <div className={styles.calendarFallback}><CalendarDays size={42} strokeWidth={1.25}/><strong>LET&apos;S FIND A TIME.</strong><p>The embedded calendar is not configured in this preview.</p><a href={homepage.booking.fallbackUrl}>BOOK BY EMAIL <MoveUpRight size={16}/></a></div>}
  </div>;
}

function LogoTape() {
  const alt = "Magic Eden, Animoca Brands, Karate Combat, Pixelmon, Solana Gaming, Jupiter, Forbes Web3, Abstract, Doodles, EDUCHAIN, Pump.fun, Meteora Ecosystem, Nibiru, Pixels, Agglayer, Seedify, Revoke and Somnia";
  return <div className={styles.logoTape} role="group" aria-label="Brands Creative Riots has worked with">
    <div className={styles.logoTapeTrack}>
      <Image src="/brand-logos-strip.png" alt={alt} width={1880} height={260} unoptimized/>
      <Image src="/brand-logos-strip.png" alt="" width={1880} height={260} aria-hidden="true" unoptimized/>
    </div>
  </div>;
}

export default function HeroVariationPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const story = homepage.testimonials[activeStory];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return <div className={styles.page}>
    <a className={styles.skip} href="#main-content">Skip to main content</a>
    <header className={styles.header}>
      <a className={styles.logo} href="#top" aria-label="Creative Riots home"><Image src="/creative-riots-logo.png" alt="Creative Riots" width={150} height={66} priority unoptimized/></a>
      <div className={styles.headerMeta}><span>CONTENT ENGINE</span><i/> <span>GLOBAL / 2026</span></div>
      <div className={styles.headerActions}><a href="#contact">BOOK A CALL <ArrowDownRight size={16}/></a><button type="button" aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`} id="site-menu" aria-hidden={!menuOpen}>
      {homepage.navigation.map(([label, href], index) => <a href={href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} key={href}><small>0{index + 1}</small><span>{label}</span><ArrowDownRight/></a>)}
    </nav>

    <main id="main-content">
      <span className={styles.srOnly}>THE CONTENT ENGINE. DON&apos;T TAKE OUR WORD FOR IT. LET&apos;S CHANGE THAT. READY TO TALK.</span>
      <section className={styles.posterHero} id="top">
        <span className={styles.posterEyebrow}>CREATIVE PRODUCTION / CONTENT OPERATIONS / DISTRIBUTION</span>
        <h1><span>WE RUN</span><span>YOUR ENTIRE</span><em>CONTENT ENGINE.</em></h1>
        <div className={styles.heroCopy}><p>From the first idea to the final post, one dedicated team handles the whole system around your brand.</p><div><a href="#contact">START A CONVERSATION <ArrowRight size={17}/></a><a href="#showreel"><CirclePlay size={19}/> WATCH THE SHOWREEL</a></div></div>

        <div className={styles.mediaWindow} id="showreel">
          <div className={styles.windowBar}><span><i/><i/><i/></span><b>CR_SHOWREEL_26.MOV</b><em>00:42 / 01:24</em></div>
          <div className={styles.mediaImage}><Image src="/placeholders/hero-content-shoot.jpg" alt="A founder recording content with a dedicated production team" fill sizes="(max-width: 800px) 94vw, 48vw" priority unoptimized/><span/><button type="button" aria-label="Showreel preview"><Play size={20} fill="currentColor"/></button></div>
          <div className={styles.windowCaption}><span>NOW PLAYING</span><b>YOUR BRAND, AT FULL VOLUME</b><AudioWaveform/></div>
        </div>

        <div className={styles.metricRail}><article><strong>10M+</strong><span>VIEWS GENERATED</span></article><article><strong>2K+</strong><span>VIDEOS PRODUCED</span></article><article><strong>50+</strong><span>BRANDS SUPPORTED</span></article></div>
        <div className={styles.scrollCue}><ArrowDownRight/><span>SCROLL TO ENTER THE SYSTEM</span></div>
      </section>

      <section className={styles.signalSection} id="problem">
        <header className={styles.sectionLead}><span>01 / THE SIGNAL PROBLEM</span><h2>EXCELLENT WORK.<br/><em>INVISIBLE BRAND.</em></h2><p>The internet does not reward the best-kept secret. It rewards the brand that keeps showing up with something worth noticing.</p></header>
        <div className={styles.signalWall}>
          {homepage.visibility.pains.map((pain, index) => {
            const Icon = problemIcons[index];
            return <article key={pain}><span>0{index + 1}</span><Icon strokeWidth={1.25}/><p>{pain}</p></article>;
          })}
        </div>
        <div className={styles.marqueeLine}><span>ATTENTION IS EARNED / CONSISTENCY IS ENGINEERED / GOOD WORK DOESN&apos;T DISTRIBUTE ITSELF /&nbsp;</span></div>
      </section>

      <section className={styles.engineSection} id="engine">
        <header className={styles.engineLead}><span>02 / THE OPERATING SYSTEM</span><h2>NOT MORE CONTENT.<br/><em>A CONTENT ENGINE.</em></h2><p>A complex brand does not need a pile of disconnected freelancers. It needs one production system that learns, creates and distributes.</p></header>
        <div className={styles.productionBands}>
          {engineStages.map(({ number, label, title, copy, icon: Icon }, index) => <article className={styles[`band${index + 1}`]} key={number}>
            <div className={styles.bandIndex}><span>{number}</span><small>{label}</small></div>
            <div className={styles.bandIcon}><Icon strokeWidth={1.05}/><i/><b/></div>
            <div className={styles.bandCopy}><h3>{title}</h3><p>{copy}</p></div>
            <ArrowDownRight className={styles.bandArrow}/>
          </article>)}
        </div>
        <a className={styles.systemCta} href="#contact"><span>BUILD MY CONTENT ENGINE</span><ArrowRight/></a>
      </section>

      <section className={styles.launchSection} id="getting-started">
        <header className={styles.launchLead}><span>03 / FROM CALL TO MOMENTUM</span><h2>THREE MOVES.<br/>THEN WE <em>RUN.</em></h2></header>
        <div className={styles.launchLedger}>
          {homepage.gettingStarted.map(([number, title, copy], index) => {
            const Icon = launchIcons[index];
            return <article key={number}><strong>{number}</strong><div className={styles.ledgerIcon}><Icon strokeWidth={1.2}/></div><h3>{title}</h3><p>{copy}</p><ArrowDownRight/></article>;
          })}
        </div>
      </section>

      <section className={styles.proofSection} id="proof">
        <div className={styles.proofHeadline}><span>04 / PROOF OF TRUST</span><h2>GOOD COMPANY<br/>KEEPS <em>GOOD COMPANY.</em></h2></div>
        <LogoTape/>
        <div className={styles.proofStamp}><BadgeCheck/><span>TRUSTED ACROSS<br/>WEB3 & BEYOND</span></div>
      </section>

      <section className={styles.voicesSection} id="testimonials">
        <header><span>05 / CLIENT TRANSMISSIONS</span><h2>THEIR WORDS.<br/><em>NOT OURS.</em></h2></header>
        <div className={styles.voiceStage} key={story.id}>
          <div className={styles.voiceQuote}><Sparkles/><blockquote>“{story.quote}”</blockquote><p><strong>{story.name}</strong><span>{story.company}</span></p></div>
          <div className={styles.voiceMedia}><Image src={story.thumbnail} alt={`${story.name} from ${story.company}`} fill sizes="(max-width: 800px) 100vw, 40vw" unoptimized/><span>STORY 0{activeStory + 1}</span>{story.videoUrl && <a href={story.videoUrl} aria-label={`Play testimonial from ${story.name}`}><Play fill="currentColor"/></a>}</div>
        </div>
        <div className={styles.storySwitch} role="group" aria-label="Choose a testimonial">{homepage.testimonials.map((item, index) => <button type="button" className={index === activeStory ? styles.storyActive : ""} aria-pressed={index === activeStory} onClick={() => setActiveStory(index)} key={item.id}><span>0{index + 1}</span><Image src={item.thumbnail} alt="" width={90} height={58} unoptimized/><b>{item.name}</b><small>{item.company}</small></button>)}</div>
      </section>

      <section className={styles.bookingSection} id="contact">
        <div className={styles.bookingCopy}><span>06 / YOUR MOVE</span><h2>STOP RENTING<br/>ATTENTION.<br/><em>OWN IT.</em></h2><p>Pick a time. We&apos;ll talk about where your brand is, where it should be, and whether Creative Riots is the right team to close the gap.</p><div><span><Check/>30-MINUTE DISCOVERY CALL</span><span><Check/>HONEST FIT CHECK</span><span><Check/>NO HARD SELL</span></div></div>
        <CalendlyEmbed/>
      </section>
    </main>

    <footer className={styles.footer}><Image src="/creative-riots-logo.png" alt="Creative Riots" width={150} height={66} unoptimized/><p>{homepage.footer.statement}</p><a href="#top">BACK TO TOP <MoveUpRight/></a><span>{homepage.footer.copyright}</span></footer>
  </div>;
}
