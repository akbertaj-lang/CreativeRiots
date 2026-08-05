"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown, Clapperboard, Fingerprint, Menu, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
      <div className={styles.headerInner}>
        <a className={styles.headerLogo} href="#top" aria-label="Creative Riots home">
          <Image src="/logo-cr-header.png" alt="Creative Riots" width={252} height={94} priority unoptimized />
        </a>
        <nav id="main-menu" className={`${styles.menuPanel} ${open ? styles.menuOpen : ""}`} aria-label="Main navigation">
          <a href="#invisible" onClick={() => setOpen(false)}>The Difference</a>
          <a href="#engine-b" onClick={() => setOpen(false)}>Content Engine</a>
          <a href="#voices-b" onClick={() => setOpen(false)}>Testimonials</a>
          <a href="#talk-b" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <a className={styles.headerCta} href="#talk-b">Book a call <ArrowRight /></a>
        <button
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
    <div className={styles.photo}>
      <Image src={src} alt={alt} fill priority={priority} unoptimized sizes="(max-width: 800px) 100vw, 1120px" style={{ objectPosition: position }} />
    </div>
  );
}

export default function ExperimentalHome() {
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
    <div ref={pageRef} className={styles.page}>
      <a className={styles.skip} href="#experimental-main">Skip to main content</a>
      <Header />

      <main id="experimental-main">
        <section className={styles.hero} id="top" aria-labelledby="hero-title" data-cinematic>
          <span className={styles.eyebrow}>Content Engine Studio</span>
          <h1 id="hero-title">We run your entire<br /><em>content engine.</em></h1>
          <p>From the first idea to the final post, a dedicated team that works only with<br className={styles.desktopBreak} /> you handles it all.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={bookingUrl}>Book a call <ArrowRight /></a>
            <a className={styles.secondaryButton} href="#engine-b">See how it works <ChevronDown /></a>
          </div>
          <div className={styles.heroMetrics} aria-label="Creative Riots results">
            <article><strong>10M+</strong><span>Views generated across all<br />channels</span></article>
            <article><strong>2,000+</strong><span>Videos produced for our clients</span></article>
            <article><strong>50+</strong><span>Brands supported and growing</span></article>
          </div>
          <i className={styles.heroCircle} aria-hidden="true" />
        </section>

        <div className={styles.signalTicker} aria-hidden="true">
          <div>
            <span>Strategy</span><i>•</i><span>Production</span><i>•</i><span>Post</span><i>•</i><span>Distribution</span><i>•</i>
            <span>Strategy</span><i>•</i><span>Production</span><i>•</i><span>Post</span><i>•</i><span>Distribution</span><i>•</i>
          </div>
        </div>

        <section className={styles.visibility} id="invisible" aria-labelledby="visibility-title" data-cinematic>
          <span className={styles.sectionNumber} aria-hidden="true">01</span>
          <div className={styles.visibilityMedia} data-reveal="media">
            <Photo src={media.capture} alt="A founder being filmed by a Creative Riots production team" position="center 48%" priority />
          </div>
          <div className={`${styles.copyCard} ${styles.visibilityCard}`} data-reveal="card-left">
            <span>The Visibility Gap</span>
            <h2 id="visibility-title">You’re not showing<br />up <em>enough.</em></h2>
            <h3>And it’s costing you more than you think.</h3>
            <p>Not enough of the right people know who you are, and when you do post, it doesn’t travel far. You know it needs fixing, but you don’t have the time to do it yourself.</p>
          </div>
        </section>

        <section className={styles.engine} id="engine-b" aria-labelledby="engine-title" data-cinematic>
          <div className={styles.engineMedia} data-reveal="media">
            <Photo src={media.edit} alt="Creative Riots editors working inside a production suite" position="center 52%" />
          </div>
          <div className={`${styles.copyCard} ${styles.engineCard}`} data-reveal="card-left">
            <span>The Content Engine</span>
            <h2 id="engine-title">We’re content-engine<br /><em>obsessed.</em></h2>
            <p>Strategy, production and distribution handled by one dedicated team that learns your brand inside out.</p>
            <a className={styles.primaryButton} href={bookingUrl}>Book a call <ArrowRight /></a>
          </div>
          <div className={styles.stageStrip}>
            <div className={styles.engineSignal} aria-hidden="true"><i /><span /><span /><span /></div>
            {content.engine.stages.map(([number, title, copy], index) => {
              const StageIcon = stageIcons[index];
              return (
                <article key={number} data-reveal="up" style={{ transitionDelay: `${index * 110}ms` }}>
                  <div className={styles.stageVisual}>
                    <i aria-hidden="true" />
                    <StageIcon strokeWidth={1.35} aria-hidden="true" />
                    <b>{number}</b>
                  </div>
                  <h3>{title}<ArrowRight /></h3>
                  <p>{copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.filmmaker} id="filmmaker-b" aria-labelledby="filmmaker-title" data-cinematic>
          <div className={styles.filmmakerMedia} data-reveal="media">
            <Photo src={media.edit} alt="Filmmakers refining a story in an editing suite" position="center 50%" />
            <span className={styles.cropMark} aria-hidden="true" />
            <div className={styles.filmInterface} aria-hidden="true">
              <span><i /> REC</span><b>TC 00:42:17:08</b><em>24 FPS / 4K</em>
              <div><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
          <div className={`${styles.copyCard} ${styles.filmmakerCard}`} data-reveal="card-right">
            <span>Craft Meets Current Tools</span>
            <h2 id="filmmaker-title">Filmmakers<br /><em>at heart.</em></h2>
            <p>Before any of this, we studied and made films. This is why we look at content like a filmmaker looks at a scene, what to keep, what to cut, what makes people feel something. And we pair that eye with the latest tools, so the work always feels current.</p>
          </div>
        </section>

        <section className={styles.start} id="start-b" aria-labelledby="start-title">
          <header data-reveal="left">
            <h2 id="start-title">How to <em>start.</em></h2>
            <p>One honest call. One team built around you. Then consistent content that makes your expertise impossible to miss.</p>
          </header>
          <div className={styles.startSteps}>
            {content.gettingStarted.map(([number, title, copy], index) => (
              <article key={number} data-reveal="up" style={{ transitionDelay: `${index * 110}ms` }}>
                <b>{number}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.brands} id="proof-b" aria-labelledby="brands-title" data-cinematic>
          <div className={styles.brandsInner}>
            <header data-reveal="left">
              <span aria-hidden="true">05</span>
              <h2 id="brands-title">Brands<br /><em>We’ve worked with.</em></h2>
              <i aria-hidden="true" />
            </header>
            <p data-reveal="right">Trusted with content by brands ready to be seen.</p>
            <div className={styles.logoRow} data-reveal="fade">
              <div className={styles.logoTrack}>
                <Image src="/brand-logos-strip.png" alt="Magic Eden, Animoca Brands, Karate Combat, Pixelmon, Solana Gaming, Jupiter, Forbes Web3, Educhain, pump.fun, Meteora, Nibiru, Pixels, Agglayer and Seedify" width={1882} height={291} unoptimized />
                <Image src="/brand-logos-strip.png" alt="" aria-hidden="true" width={1882} height={291} unoptimized />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.testimonials} id="voices-b" aria-labelledby="stories-title" data-cinematic>
          <div className={styles.testimonialHero} data-reveal="fade">
            <Photo src={media.story} alt="A Creative Riots client sharing their experience on camera" position="center 46%" />
            <span className={styles.cropMark} aria-hidden="true" />
            <div className={`${styles.copyCard} ${styles.testimonialCard}`}>
              <h2 id="stories-title">Take their<br /><em>Word for it.</em></h2>
              <p>Real clients. Real working relationships. Real outcomes.<br />Judge for yourself.</p>
            </div>
          </div>
          <div className={styles.testimonialGrid}>
            {content.testimonials.map((testimonial, index) => (
              <article key={testimonial.id} data-reveal="up" style={{ transitionDelay: `${index * 110}ms` }}>
                <div><Image src={testimonial.thumbnail} alt="" fill unoptimized sizes="(max-width: 800px) 88vw, 380px" /></div>
                <q>{testimonial.quote}</q>
                <p>{testimonial.name} — {testimonial.company}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="talk-b" data-cinematic>
        <div className={styles.closingCta}>
          <div data-reveal="left">
            <h2>Let’s stop planning<br /><em>and start posting.</em></h2>
            <p>{content.bookingBody}</p>
          </div>
          <div className={styles.bookingPanel} data-reveal="right">
            <i aria-hidden="true" />
            <span>Booking calendar is not configured in this development build.</span>
            <a href={bookingUrl}>Book a conversation <ArrowRight /></a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <Image src="/creative-riots-logo-client.png" alt="Creative Riots" width={150} height={67} unoptimized />
          <small>© 2026 Creative Riots. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}
