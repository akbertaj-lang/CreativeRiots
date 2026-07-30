"use client";

import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { experimentalContent as content } from "./experimentalContent";
import styles from "./experimental.module.css";

const media = {
  capture: "/placeholders/hero-content-shoot.jpg",
  edit: "/placeholders/proof-editing.jpg",
  plan: "/placeholders/proof-planning.jpg",
  story: "/placeholders/case-study-interview.jpg",
} as const;

function GlitchMedia({
  src,
  alt,
  priority = false,
  position = "center",
  code,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  position?: string;
  code: string;
}) {
  return (
    <div className={styles.media}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        sizes="100vw"
        style={{ objectPosition: position }}
      />
      <div className={`${styles.slice} ${styles.sliceOne}`} aria-hidden="true" />
      <div className={`${styles.slice} ${styles.sliceTwo}`} aria-hidden="true" />
      <span className={styles.mediaStamp}>{code}</span>
      <i className={styles.cropTop} aria-hidden="true" />
      <i className={styles.cropBottom} aria-hidden="true" />
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className={styles.textLink} href={href}>
      <span aria-hidden="true">↳</span>
      {children}
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <a href="#top" className={styles.headerLogo} aria-label="Creative Riots home">
        <Image src="/creative-riots-logo-client.png" alt="Creative Riots" width={150} height={89} unoptimized />
      </a>
      <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Main navigation">
        <a href="#engine-b" onClick={() => setOpen(false)}>The engine</a>
        <a href="#proof-b" onClick={() => setOpen(false)}>Proof</a>
        <a href="#voices-b" onClick={() => setOpen(false)}>Stories</a>
        <a href="#talk-b" onClick={() => setOpen(false)}>Book a call</a>
      </nav>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function ThumbnailStrip({
  items,
}: {
  items: ReadonlyArray<{ image: string; label: string; sublabel?: string }>;
}) {
  return (
    <div className={styles.thumbnailStrip}>
      {items.map((item) => (
        <article key={`${item.image}-${item.label}`}>
          <div>
            <Image src={item.image} alt="" fill unoptimized sizes="(max-width: 700px) 70vw, 33vw" />
          </div>
          <p>{item.label}{item.sublabel && <small>{item.sublabel}</small>}</p>
        </article>
      ))}
    </div>
  );
}

export default function ExperimentalHome() {
  const bookingUrl = content.booking.calendlyUrl || content.booking.fallbackUrl;

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#experimental-main">Skip to main content</a>
      <Header />

      <main id="experimental-main">
        <section className={styles.intro} id="top" aria-labelledby="intro-title">
          <span>CONTENT ENGINE STUDIO</span>
          <h1 id="intro-title">Hello. We’re Creative Riots.</h1>
          <p>We run your entire content engine. You bring the expertise. We make sure the world sees it.</p>
        </section>

        <section className={`${styles.editorialSection} ${styles.visibilitySection}`} id="invisible" data-index="01" aria-labelledby="visibility-title">
          <GlitchMedia
            src={media.capture}
            alt="A founder recording content with the Creative Riots production team"
            priority
            position="center 42%"
            code="CR / THE PROBLEM / 01"
          />
          <div className={styles.storyCard}>
            <span>THE VISIBILITY GAP</span>
            <h2 id="visibility-title">You’re not showing<br />up enough.</h2>
            <p className={styles.subline}>And it’s costing you more than you think.</p>
            <p>Not enough of the right people know who you are, and when you do post, it doesn’t travel far. You know it needs fixing, but you don’t have the time to do it yourself.</p>
            <TextLink href="#engine-b">See how it works</TextLink>
          </div>
        </section>

        <section className={`${styles.editorialSection} ${styles.engineSection}`} id="engine-b" data-index="02" aria-labelledby="engine-title">
          <GlitchMedia
            src={media.edit}
            alt="A Creative Riots editor building a client content system"
            position="center 45%"
            code="CR / THE ENGINE / 02"
          />
          <div className={styles.storyCard}>
            <span>THE CONTENT ENGINE</span>
            <h2 id="engine-title">We’re content-engine<br />obsessed.</h2>
            <p>Strategy, production and distribution—handled by one dedicated team that learns your brand inside out.</p>
          </div>
          <div className={styles.engineSteps}>
            {content.engine.stages.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <ThumbnailStrip
            items={[
              { image: media.plan, label: "Learn your world", sublabel: "Strategy / voice / audience" },
              { image: media.edit, label: "Build every week", sublabel: "Production / editing / design" },
              { image: media.capture, label: "Make it travel", sublabel: "Publishing / distribution" },
            ]}
          />
        </section>

        <section className={`${styles.editorialSection} ${styles.filmmakerSection}`} id="filmmaker-b" data-index="03" aria-labelledby="filmmaker-title">
          <GlitchMedia
            src={media.edit}
            alt="A filmmaker shaping a Creative Riots production"
            position="center 54%"
            code="CR / FILMMAKERS / 03"
          />
          <div className={styles.storyCard}>
            <span>CRAFT MEETS CURRENT TOOLS</span>
            <h2 id="filmmaker-title">Filmmakers<br />at heart.</h2>
            <p>Before any of this, we studied and made films. This is why we look at content like a filmmaker looks at a scene, what to keep, what to cut, what makes people feel something. And we pair that eye with the latest tools, so the work always feels current.</p>
          </div>
        </section>

        <section className={`${styles.editorialSection} ${styles.numbersSection}`} id="proof-b" data-index="04" aria-labelledby="numbers-title">
          <GlitchMedia
            src={media.plan}
            alt="Creative Riots planning content strategy with a client"
            position="center 38%"
            code="CR / THE PROOF / 04"
          />
          <div className={styles.storyCard}>
            <span>PROOF, NOT PROMISES</span>
            <h2 id="numbers-title">We’ve got<br />numbers too.</h2>
            <p>Creative work should look good. More importantly, it should pull its weight.</p>
            <TextLink href="#voices-b">Hear from clients</TextLink>
          </div>
          <div className={styles.metrics}>
            {content.hero.metrics.map(([value, label]) => (
              <article key={label}><strong>{value}</strong><span>{label}</span></article>
            ))}
          </div>
          <div className={styles.logoBand}>
            <p>Trusted by teams building what’s next</p>
            <Image
              src="/brand-logos-strip.png"
              alt="Brands Creative Riots has worked with"
              width={1880}
              height={260}
              unoptimized
            />
          </div>
        </section>

        <section className={`${styles.editorialSection} ${styles.testimonialsSection}`} id="voices-b" data-index="05" aria-labelledby="different-title">
          <GlitchMedia
            src={media.story}
            alt="A Creative Riots client sharing their experience"
            position="center 35%"
            code="CR / THE PEOPLE / 05"
          />
          <div className={styles.storyCard}>
            <h2 id="different-title">Take their<br /><em>word for it.</em></h2>
            <p>Real clients. Real working relationships. Real outcomes. Judge for yourself.</p>
          </div>
          <ThumbnailStrip
            items={content.testimonials.map((testimonial) => ({
              image: testimonial.thumbnail,
              label: `“${testimonial.quote}”`,
              sublabel: `${testimonial.name} — ${testimonial.company}`,
            }))}
          />
        </section>

        <section className={`${styles.editorialSection} ${styles.startSection}`} id="start-b" data-index="06" aria-labelledby="next-title">
          <GlitchMedia
            src={media.capture}
            alt="A Creative Riots production day in progress"
            position="center 58%"
            code="CR / THE NEXT MOVE / 06"
          />
          <div className={styles.storyCard}>
            <h2 id="next-title">How To Start</h2>
            <p>One honest call. One team built around you. Then consistent content that makes your expertise impossible to miss.</p>
          </div>
          <div className={styles.processStrip}>
            {content.gettingStarted.map(([number, title, copy]) => (
              <article key={number}>
                <b>{number}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="talk-b">
        <div className={styles.footerRule} aria-hidden="true" />
        <div className={styles.footerCta}>
          <span>Let’s stop planning<br />and start posting.</span>
          <a href={bookingUrl}>Book a call <ArrowRight /></a>
        </div>
        <div className={styles.footerGrid}>
          <div>
            <Image src="/creative-riots-logo-client.png" alt="Creative Riots" width={180} height={107} unoptimized />
            <p>{content.footer.statement}</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#engine-b">The engine</a>
            <a href="#proof-b">Our proof</a>
            <a href="#voices-b">Client stories</a>
          </nav>
          <div className={styles.footerContact}>
            <strong>LET’S TALK</strong>
            <a href="mailto:hello@creativeriots.com">hello@creativeriots.com</a>
          </div>
        </div>
        <small>© 2026 CREATIVE RIOTS</small>
      </footer>
    </div>
  );
}
