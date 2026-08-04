"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { experimentalContent as content } from "./experimentalContent";
import styles from "./experimental.module.css";

const media = {
  capture: "/placeholders/hero-content-shoot.jpg",
  edit: "/placeholders/proof-editing.jpg",
  plan: "/placeholders/proof-planning.jpg",
  story: "/placeholders/case-study-interview.jpg",
} as const;

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <button className={styles.menuButton} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X /> : <Menu />}
      </button>
      <a className={styles.headerLogo} href="#top" aria-label="Creative Riots home">
        <Image src="/placeholders/creative-riots-mark.png" alt="" width={34} height={34} priority unoptimized />
        <span>CREATIVE<br />RIOTS</span>
      </a>
      <a className={styles.headerCta} href="#talk-b">Book a call <ArrowRight /></a>
      <nav className={`${styles.menuPanel} ${open ? styles.menuOpen : ""}`} aria-label="Main navigation">
        <a href="#invisible" onClick={() => setOpen(false)}>Visibility</a>
        <a href="#engine-b" onClick={() => setOpen(false)}>Content Engine</a>
        <a href="#proof-b" onClick={() => setOpen(false)}>Proof</a>
        <a href="#voices-b" onClick={() => setOpen(false)}>Stories</a>
        <a href="#start-b" onClick={() => setOpen(false)}>How to start</a>
      </nav>
    </header>
  );
}

function Photo({ src, alt, position = "center", priority = false }: { src: string; alt: string; position?: string; priority?: boolean }) {
  return (
    <div className={styles.photo}>
      <Image src={src} alt={alt} fill priority={priority} unoptimized sizes="(max-width: 1500px) 94vw, 1400px" style={{ objectPosition: position }} />
    </div>
  );
}

function PanelLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className={styles.panelLink} href={href}>{children}<ArrowRight /></a>;
}

export default function ExperimentalHome() {
  const bookingUrl = content.booking.calendlyUrl || content.booking.fallbackUrl;
  const stageImages = [media.plan, media.edit, media.capture];
  const testimonialItems = [
    { id: "magic-eden", name: "MAGIC EDEN", company: "CLIENT STORY", quote: "Working with CR is game changing. Unreal results.", thumbnail: media.story },
    { id: "tiger", name: "TIGER", company: "CLIENT STORY", quote: "Feels like they’re part of our team.", thumbnail: media.edit },
    { id: "kia", name: "KIA", company: "CLIENT STORY", quote: "Top-notch crew and results every time.", thumbnail: media.plan },
    { id: "district", name: "DISTRICT", company: "CLIENT STORY", quote: "If you’re not using them, you’re missing out.", thumbnail: media.capture },
  ];
  const stageLabels = [["01", "Strategy"], ["02", "Production"], ["04", "Post production"]] as const;

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#experimental-main">Skip to main content</a>
      <Header />

      <main id="experimental-main">
        <section className={styles.intro} id="top" aria-labelledby="intro-title">
          <h1 id="intro-title">Hello. We’re Creative Riots<em>.</em></h1>
          <p>We’re your creative content engine so your brand shows up, stands out and stays top of mind.</p>
          <a href="#invisible">Scroll to explore <ChevronDown /></a>
        </section>

        <section className={`${styles.photoSection} ${styles.visibilitySection}`} id="invisible" aria-labelledby="visibility-title">
          <Photo src={media.capture} alt="A founder creating content with the Creative Riots production team" position="center 43%" priority />
          <div className={styles.overlayPanel}>
            <span>01</span>
            <h2 id="visibility-title">You’re not<br />showing up<br /><em>enough.</em></h2>
            <p className={styles.panelLead}>And it’s costing you more than you think.</p>
            <p>Not enough of the right people know who you are, and when you do post, it doesn’t travel far. You know it needs fixing, but you don’t have the time to do it yourself.</p>
            <PanelLink href="#engine-b">See if we fit</PanelLink>
          </div>
        </section>

        <section className={`${styles.photoSection} ${styles.engineSection}`} id="engine-b" aria-labelledby="engine-title">
          <Photo src={media.edit} alt="A Creative Riots editor building a client content system" position="center 48%" />
          <div className={styles.overlayPanel}>
            <span>02</span>
            <h2 id="engine-title">We’re content-engine<br /><em>obsessed.</em></h2>
            <p>Strategy, production and distribution—handled by one dedicated team that learns your brand inside out.</p>
            <PanelLink href="#filmmaker-b">See how it works</PanelLink>
          </div>
          <div className={styles.stageStrip}>
            {content.engine.stages.map(([, , copy], index) => (
              <article key={stageLabels[index][0]}>
                <div className={styles.stageImage}><Image src={stageImages[index]} alt="" fill unoptimized sizes="(max-width: 720px) 82vw, 30vw" /></div>
                <div className={styles.stageLabel}><b>{stageLabels[index][0]}</b><strong>{stageLabels[index][1]}</strong><ArrowRight /></div>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.photoSection} ${styles.filmmakerSection}`} id="filmmaker-b" aria-labelledby="filmmaker-title">
          <Photo src={media.plan} alt="Creative Riots approaching content with a filmmaker’s eye" position="center 40%" />
          <div className={styles.overlayPanel}>
            <span>03</span>
            <h2 id="filmmaker-title">Filmmakers<br />at <em>heart.</em></h2>
            <p>Before any of this, we studied and made films. This is why we look at content like a filmmaker looks at a scene, what to keep, what to cut, what makes people feel something. And we pair that eye with the latest tools, so the work always feels current.</p>
            <PanelLink href="#proof-b">See our work</PanelLink>
          </div>
          <div className={styles.filmStrip} aria-label="Creative Riots production disciplines">
            {[media.story, media.capture, media.edit, media.plan].map((src, index) => (
              <div key={`${src}-${index}`}><Image src={src} alt="" fill unoptimized sizes="25vw" /></div>
            ))}
          </div>
        </section>

        <section className={styles.proofBar} id="proof-b" aria-labelledby="proof-title">
          <header><span>04</span><h2 id="proof-title">We’ve got<br />numbers <em>too.</em></h2><p>That’s proof our work makes an impact that lasts.</p></header>
          <div className={styles.metrics}>
            {[["10M+", "Views across platforms"], ["2,000+", "Projects delivered"], ["50+", "Categories served"]].map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
          </div>
          <div className={styles.logoRow}>
            <Image src="/brand-logos-strip.png" alt="Brands Creative Riots has worked with" width={1880} height={260} unoptimized />
          </div>
        </section>

        <section className={`${styles.photoSection} ${styles.voicesSection}`} id="voices-b" aria-labelledby="stories-title">
          <Photo src={media.story} alt="A Creative Riots client sharing their experience" position="center 38%" />
          <div className={styles.storyArrows} aria-hidden="true"><span><ArrowLeft /></span><span><ArrowRight /></span></div>
          <div className={styles.overlayPanel}>
            <span>05</span>
            <h2 id="stories-title">Take their<br />word <em>for it.</em></h2>
          </div>
          <div className={styles.storyRail}>
            {testimonialItems.map((testimonial) => (
              <article key={testimonial.id}>
                <div><Image src={testimonial.thumbnail} alt="" fill unoptimized sizes="110px" /></div>
                <p><strong>{testimonial.name}</strong><small>{testimonial.company}</small><q>{testimonial.quote}</q></p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.startBar} id="start-b" aria-labelledby="start-title">
          <header><span>06</span><h2 id="start-title">How to <em>start.</em></h2></header>
          <div className={styles.startSteps}>
            {content.gettingStarted.map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="talk-b">
        <div className={styles.closingCta}><h2>Let’s stop planning<br />and <em>start posting.</em></h2><a href={bookingUrl}>Book a call <ArrowRight /></a></div>
        <div className={styles.footerBottom}>
          <Image src="/creative-riots-logo-client.png" alt="Creative Riots" width={150} height={89} unoptimized />
          <small>© 2024 CREATIVE RIOTS. ALL RIGHTS RESERVED.</small>
          <nav aria-label="Footer navigation"><a href="#engine-b">Work</a><a href="#filmmaker-b">About</a><a href="#voices-b">Resources</a><a href="mailto:hello@creativeriots.com">Contact</a></nav>
          <div className={styles.socials} aria-label="Social links"><span>◎</span><span>▶</span><span>in</span></div>
        </div>
      </footer>
    </div>
  );
}
