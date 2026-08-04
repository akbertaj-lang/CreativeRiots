"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronDown, Clapperboard, Fingerprint, Menu, Play, Send, X } from "lucide-react";
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
  const stageIcons = [Fingerprint, Clapperboard, Send];
  const testimonialItems = content.testimonials;

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#experimental-main">Skip to main content</a>
      <Header />

      <main id="experimental-main">
        <section className={styles.intro} id="top" aria-labelledby="intro-title">
          <span className={styles.heroEyebrow}>Content Engine Studio</span>
          <h1 id="intro-title">We run your entire<br /><em>content engine.</em></h1>
          <p>From the first idea to the final post, a dedicated team that works only with you handles it all.</p>
          <div className={styles.heroActions}><a href={bookingUrl}>Book a call <ArrowRight /></a><a href="#engine-b">See how it works <ChevronDown /></a></div>
          <div className={styles.heroMetrics} aria-label="Creative Riots results">
            <article><strong>10M+</strong><span>Views generated across all channels</span></article>
            <article><strong>2,000+</strong><span>Videos produced for our clients</span></article>
            <article><strong>50+</strong><span>Brands supported and growing</span></article>
          </div>
        </section>

        <div className={styles.signalTicker} aria-hidden="true">
          <div>
            <span>STRATEGY</span><i>●</i><span>PRODUCTION</span><i>●</i><span>POST</span><i>●</i><span>DISTRIBUTION</span><i>●</i>
            <span>STRATEGY</span><i>●</i><span>PRODUCTION</span><i>●</i><span>POST</span><i>●</i><span>DISTRIBUTION</span><i>●</i>
          </div>
        </div>

        <section className={`${styles.photoSection} ${styles.visibilitySection}`} id="invisible" aria-labelledby="visibility-title">
          <Photo src={media.capture} alt="A founder creating content with the Creative Riots production team" position="center 43%" priority />
          <div className={styles.overlayPanel}>
            <span>The Visibility Gap</span>
            <h2 id="visibility-title">You’re not<br />showing up<br /><em>enough.</em></h2>
            <p className={styles.panelLead}>And it’s costing you more than you think.</p>
            <p>Not enough of the right people know who you are, and when you do post, it doesn’t travel far. You know it needs fixing, but you don’t have the time to do it yourself.</p>
            <PanelLink href="#engine-b">See if we fit</PanelLink>
          </div>
        </section>

        <section className={`${styles.photoSection} ${styles.engineSection}`} id="engine-b" aria-labelledby="engine-title">
          <Photo src={media.edit} alt="A Creative Riots editor building a client content system" position="center 48%" />
          <div className={styles.overlayPanel}>
            <span>The Content Engine</span>
            <h2 id="engine-title">We’re content-engine<br /><em>obsessed.</em></h2>
            <p>Strategy, production and distribution—handled by one dedicated team that learns your brand inside out.</p>
            <PanelLink href="#filmmaker-b">See how it works</PanelLink>
          </div>
          <div className={styles.stageStrip}>
            {content.engine.stages.map(([number, title, copy], index) => {
              const StageIcon = stageIcons[index];
              return <article key={number}>
                <div className={styles.stageIcon}><i /><StageIcon strokeWidth={1.35} /><span>{number}</span></div>
                <div className={styles.stageLabel}><b>{number}</b><strong>{title}</strong><ArrowRight /></div>
                <p>{copy}</p>
              </article>;
            })}
          </div>
        </section>

        <section className={`${styles.photoSection} ${styles.filmmakerSection}`} id="filmmaker-b" aria-labelledby="filmmaker-title">
          <Photo src={media.edit} alt="Creative Riots approaching content with a filmmaker’s eye" position="center 46%" />
          <div className={styles.filmHud} aria-hidden="true"><span><i /> REC</span><b>00:42:17</b><em>24 FPS</em></div>
          <div className={styles.filmPlay} aria-hidden="true"><Play fill="currentColor" /></div>
          <div className={`${styles.overlayPanel} ${styles.filmCopy}`}>
            <span>Craft Meets Current Tools</span>
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

        <section className={styles.startBar} id="start-b" aria-labelledby="start-title">
          <header><span>04</span><h2 id="start-title">How to <em>start.</em></h2><p>One honest call. One team built around you. Then consistent content that makes your expertise impossible to miss.</p></header>
          <div className={styles.startSteps}>
            {content.gettingStarted.map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className={`${styles.proofBar} ${styles.brandsBand}`} id="proof-b" aria-labelledby="proof-title">
          <header><span>05</span><h2 id="proof-title">Brands we’ve<br />worked with</h2><p>Trusted with content by brands ready to be seen.</p></header>
          <div className={styles.logoRow}>
            <div className={styles.logoTrack}>
              <Image src="/brand-logos-strip.png" alt="Brands Creative Riots has worked with" width={1880} height={260} unoptimized />
              <Image src="/brand-logos-strip.png" alt="" width={1880} height={260} unoptimized aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className={`${styles.photoSection} ${styles.voicesSection}`} id="voices-b" aria-labelledby="stories-title">
          <Photo src={media.story} alt="A Creative Riots client sharing their experience" position="center 38%" />
          <div className={styles.storyArrows} aria-hidden="true"><span><ArrowLeft /></span><span><ArrowRight /></span></div>
          <div className={styles.overlayPanel}>
            <span>CR / The People / 06</span>
            <h2 id="stories-title">Take their<br />word <em>for it.</em></h2>
            <p>Real clients. Real working relationships. Real outcomes. Judge for yourself.</p>
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

      </main>

      <footer className={styles.footer} id="talk-b">
        <div className={styles.closingCta}>
          <div><h2>Let’s stop planning<br />and <em>start posting.</em></h2><p>{content.bookingBody}</p></div>
          <div className={styles.bookingPanel}><span>Booking calendar is not configured in this development build.</span><a href={bookingUrl}>Book a conversation <ArrowRight /></a></div>
        </div>
        <div className={styles.footerBottom}>
          <Image src="/creative-riots-logo-client.png" alt="Creative Riots" width={150} height={89} unoptimized />
          <small>© 2024 CREATIVE RIOTS. ALL RIGHTS RESERVED.</small>
          <nav aria-label="Footer navigation"><a href="#invisible">The Difference</a><a href="#engine-b">Content Engine</a><a href="#voices-b">Testimonials</a><a href="mailto:hello@creativeriots.com">Contact</a></nav>
          <div className={styles.socials} aria-label="Social links"><span>◎</span><span>▶</span><span>in</span></div>
        </div>
      </footer>
    </div>
  );
}
