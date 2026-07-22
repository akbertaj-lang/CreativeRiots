"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeHelp, Check, Clapperboard, Clock3, EyeOff, Gauge, Menu, MessageCircle, MoveUpRight, Play, RadioTower, Rocket, Search, UserRoundX, VolumeX, X, type LucideIcon } from "lucide-react";
import { homepage } from "@/content/homepage";
import styles from "./page.module.css";

const { testimonials } = homepage;
const pains = homepage.visibility.pains;
const painEmphasis = homepage.visibility.emphasis;
const startSteps = homepage.gettingStarted;
export const CALENDLY_URL = homepage.booking.calendlyUrl;

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionFrame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(reducedMotionFrame);
    }
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 1500, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{display.toLocaleString()}{suffix}</>;
}

const painIcons: LucideIcon[] = [EyeOff, UserRoundX, VolumeX, Clock3, BadgeHelp, Gauge];
const engineIcons: LucideIcon[] = [Search, Clapperboard, RadioTower];
const startedIcons: LucideIcon[] = [MessageCircle, Clapperboard, Rocket];

function SpatialIcon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <div className={styles.spatialIcon} aria-hidden="true"><span/><Icon strokeWidth={1.35}/><small>{label}</small><i/><b/></div>;
}

function ApprovedLogoMarquee() {
  const logoAlt = "Magic Eden, Animoca Brands, Karate Combat, Pixelmon, Solana Gaming, Jupiter, Forbes Web3, Abstract, Doodles, EDUCHAIN, Pump.fun, Meteora Ecosystem, Nibiru, Pixels, Agglayer, Seedify, Revoke and Somnia";
  return <div className={styles.logoViewport} role="group" aria-label="Brands Creative Riots has worked with">
    <div className={styles.logoTrack}>
      <div className={styles.approvedLogoSet}><Image className={styles.approvedLogoStrip} src="/brand-logos-strip.png" alt={logoAlt} width={1880} height={260} unoptimized/></div>
      <div className={styles.approvedLogoSet} aria-hidden="true"><Image className={styles.approvedLogoStrip} src="/brand-logos-strip.png" alt="" width={1880} height={260} unoptimized/></div>
    </div>
  </div>;
}

function CalendlyEmbed() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || shouldLoad) return;
    if (!("IntersectionObserver" in window)) {
      const fallbackFrame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(fallbackFrame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "360px 0px" });
    observer.observe(shell);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const embedUrl = CALENDLY_URL ? `${CALENDLY_URL}${CALENDLY_URL.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=f4f1e9&text_color=101010&primary_color=f04438` : "";

  return <div className={styles.calendlyShell} ref={shellRef}>
    <span className={styles.calendlyEdge} aria-hidden="true"/>
    {!CALENDLY_URL && process.env.NODE_ENV === "development" && <div className={styles.calendlyPlaceholder} role="status"><span/><p>BOOKING CALENDAR IS NOT CONFIGURED IN THIS DEVELOPMENT BUILD.</p><a href={homepage.booking.fallbackUrl}>BOOK A CONVERSATION <MoveUpRight size={15}/></a></div>}
    {!CALENDLY_URL && process.env.NODE_ENV !== "development" && <div className={styles.calendlyPlaceholder}><p>READY TO TALK?</p><a href={homepage.booking.fallbackUrl}>BOOK A CONVERSATION <MoveUpRight size={15}/></a></div>}
    {CALENDLY_URL && shouldLoad && !hasFailed && <iframe className={`${styles.calendlyFrame} ${isLoaded ? styles.calendlyFrameLoaded : ""}`} src={embedUrl} title="Book a discovery call with Creative Riots" loading="lazy" onLoad={()=>setIsLoaded(true)} onError={()=>setHasFailed(true)}/>} 
    {CALENDLY_URL && shouldLoad && !isLoaded && !hasFailed && <div className={styles.calendlyLoading} role="status"><i/><span>Loading available times…</span></div>}
    {CALENDLY_URL && hasFailed && <div className={styles.calendlyPlaceholder} role="alert"><p>THE BOOKING CALENDAR COULDN&apos;T LOAD.</p><a href={CALENDLY_URL}>OPEN BOOKING CALENDAR <MoveUpRight size={15}/></a></div>}
  </div>;
}

export default function HeroVariationPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const selectedTestimonial = testimonials[activeTestimonial];

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuPanelRef.current) return;
      const focusable = Array.from(menuPanelRef.current.querySelectorAll<HTMLElement>("a,button:not([disabled])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return <div className={styles.page}>
    <a href="#main-content" className={styles.skipLink}>Skip to main content</a>
    <header className={styles.header}>
      <a href="#top" className={styles.logo} aria-label="Creative Riots home"><Image src="/creative-riots-logo.png" alt="Creative Riots" width={150} height={66} priority unoptimized/></a>
      <div className={styles.headerActions}><button ref={menuTriggerRef} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="site-menu" onClick={()=>setMenuOpen(open=>!open)}>{menuOpen?<X size={18}/>:<Menu size={18}/>}<span>{menuOpen?"CLOSE":"MENU"}</span></button><a className={styles.bookTop} href="#contact">Book a call <ArrowRight size={14}/></a></div>
    </header>
    <nav id="site-menu" ref={menuPanelRef} className={`${styles.menuPanel} ${menuOpen ? styles.menuPanelOpen : ""}`} aria-label="Primary navigation" aria-hidden={!menuOpen}>
      <div>{homepage.navigation.map(([label,href],index)=><a href={href} onClick={closeMenu} tabIndex={menuOpen?0:-1} key={href}><span>0{index+1}</span>{label}</a>)}<a className={styles.menuBooking} href="#contact" onClick={closeMenu} tabIndex={menuOpen?0:-1}>Book a call <ArrowRight size={18}/></a></div>
    </nav>

    <main id="main-content">

    <section className={styles.hero} id="top">
      <div className={styles.heroCopy}>
        <span className={styles.kicker}>DEDICATED CONTENT TEAMS FOR FOUNDERS AND BRANDS</span>
        <h1><span className={styles.lineOne}>WE RUN YOUR ENTIRE</span><span className={styles.lineTwo}><i>CONTENT</i><i>ENGINE.</i></span></h1>
        <p>From the first idea to the final post, a dedicated team that works only with you handles it all.</p>
        <div className={styles.heroActions}><a href="#contact">Book a call <ArrowRight size={16}/></a><a href="#showreel"><i><Play size={12} fill="currentColor"/></i><span>Watch the showreel</span></a></div>
        <div className={styles.editorialNote}><span>BUILT FOR FOUNDERS</span><i>CR / PRODUCTION SYSTEM / V.02</i></div>
      </div>
      <div className={styles.showreel} id="showreel">
        <Image src="/placeholders/hero-content-shoot.jpg" alt="A founder recording content with their dedicated creative team" fill sizes="(max-width: 780px) 100vw, 46vw" priority unoptimized/>
        <div className={styles.mediaShade}/>
        <span className={`${styles.crop} ${styles.cropTL}`}/><span className={`${styles.crop} ${styles.cropTR}`}/><span className={`${styles.crop} ${styles.cropBL}`}/><span className={`${styles.crop} ${styles.cropBR}`}/>
        <div className={styles.recLabel}><i/> REC <span>00:00:42</span></div>
        <div className={styles.frameCounter}>A-CAM&nbsp;&nbsp;/&nbsp;&nbsp;24 FPS&nbsp;&nbsp;/&nbsp;&nbsp;FRAME 0842</div>
        <div className={styles.liveLabel}><span>CONTENT ENGINE</span><b>LIVE PRODUCTION</b></div>
        <div className={styles.publishLabel}><i/> EXPORT 4K <b>READY</b></div>
        <div className={styles.viewMetric}><strong><CountUp value={10} suffix="M+"/></strong><span>VIEWS GENERATED</span></div>
        <div className={styles.mediaTimeline}><span>00:00</span><div className={styles.waveform}>{Array.from({length:34},(_,index)=><i key={index}/>)}</div><b>01:24</b></div>
      </div>
      <div className={styles.trustRow}><span>TRUSTED ACROSS WEB3 AND BEYOND</span></div>
      <div className={styles.heroMetrics}>
        <div><strong><CountUp value={50} suffix="+"/></strong><span>BRANDS SUPPORTED</span></div>
        <div><strong><CountUp value={2000} suffix="+"/></strong><span>VIDEOS PRODUCED</span></div>
      </div>
    </section>

    <section className={styles.visibilitySection} id="problem" aria-labelledby="visibility-heading">
      <div className={styles.visibilityGrid}>
        <div className={styles.visibilityIntro}>
          <span className={styles.visibilityNumber} aria-hidden="true">02</span>
          <div className={styles.visibilityAnchor}>
            <span className={styles.visibilityEyebrow}>THE VISIBILITY GAP</span>
            <h2 id="visibility-heading"><span>YOU&apos;RE BRILLIANT</span><span>AT WHAT YOU DO.</span><em>YOUR AUDIENCE</em><em>HAS NO IDEA.</em></h2>
            <p>Being great at what you do used to be enough.</p>
            <i aria-hidden="true"/>
            <span className={styles.visibilityNote} aria-hidden="true">GOOD WORK DOESN&apos;T DISTRIBUTE ITSELF</span>
          </div>
        </div>
        <div className={styles.visibilitySequence}>
          <ol>{pains.map((pain,index)=>{
            const emphasis = painEmphasis[index];
            const [before, after] = pain.split(emphasis);
            const PainIcon = painIcons[index];
            return <li key={pain}>
              <span className={styles.visibilityIndex} aria-hidden="true">0{index+1}</span>
              <span className={styles.visibilityNode} aria-hidden="true"><PainIcon size={19} strokeWidth={1.4}/></span>
              <p className={styles.visibilityStatement}>{before}<strong>{emphasis}</strong>{after}</p>
            </li>;
          })}</ol>
          <a className={styles.visibilityTransition} href="#engine">SEE THE SYSTEM <ArrowRight size={16}/></a>
        </div>
      </div>
    </section>

    <section className={styles.engineSection} id="engine" aria-labelledby="engine-heading">
      <div className={styles.engineHeader}>
        <div><span className={styles.engineEyebrow}>THE SYSTEM BEHIND THE CONTENT</span><h2 className={styles.engineHeading} id="engine-heading"><span>THE CONTENT</span><em>ENGINE</em></h2></div>
        <p className={styles.engineIntro}>If you just need videos made, a good freelancer will do that brilliantly. But a complex brand needs a system. The Content Engine gives you a team built around your brand, running everything from the first idea to the final post.</p>
      </div>

      <div className={styles.engineRoute} aria-hidden="true"><i/><i/><i/><span/></div>

      <div className={styles.enginePipeline}>
        <article className={`${styles.engineStage} ${styles.engineStageOne}`}>
          <header><span className={styles.engineNumber}>01</span><h3 className={styles.engineStageTitle}>WE LEARN YOU</h3></header>
          <p className={styles.engineCopy}>We study your brand inside out. Your story, your voice, your vision, and who you&apos;re really talking to. Before we make anything, we understand you.</p>
          <div className={styles.engineVisual}><SpatialIcon icon={engineIcons[0]} label="DISCOVER"/></div>
        </article>

        <article className={`${styles.engineStage} ${styles.engineStageTwo}`}>
          <header><span className={styles.engineNumber}>02</span><h3 className={styles.engineStageTitle}>WE BUILD YOUR CONTENT</h3></header>
          <p className={styles.engineCopy}>Your team turns a few hours of your time into content that sounds and looks like you, made to land with your audience, week after week.</p>
          <div className={styles.engineVisual}><SpatialIcon icon={engineIcons[1]} label="CREATE"/></div>
        </article>

        <article className={`${styles.engineStage} ${styles.engineStageThree}`}>
          <header><span className={styles.engineNumber}>03</span><h3 className={styles.engineStageTitle}>WE DISTRIBUTE IT</h3></header>
          <p className={styles.engineCopy}>We get it in front of the right people, on the right platforms, so the work actually gets seen.</p>
          <div className={styles.engineVisual}><SpatialIcon icon={engineIcons[2]} label="AMPLIFY"/></div>
        </article>
      </div>

      <div className={styles.engineEndpoint}><span aria-hidden="true"/><a className={styles.engineCta} href="#contact">BOOK A CALL <ArrowRight size={17}/></a></div>
    </section>

    <section className={styles.startedSection} id="getting-started" aria-labelledby="getting-started-heading">
      <div className={styles.startedHeader}>
        <span className={styles.startedNumber} aria-hidden="true">04</span>
        <span className={styles.startedEyebrow}>HOW IT STARTS</span>
        <h2 className={styles.startedHeading} id="getting-started-heading"><span>GETTING STARTED</span><span>IS EASIER THAN</span><span>YOU&apos;D THINK</span></h2>
      </div>
      <div className={styles.startedJourney}>
        {startSteps.map(([number,title,copy],index)=>{
          const StepIcon = startedIcons[index];
          const positionClass = [styles.startedStepOne,styles.startedStepTwo,styles.startedStepThree][index];
          return <article className={`${styles.startedStep} ${positionClass}`} key={number}>
            <div className={styles.startedVisual}><StepIcon strokeWidth={1.2}/><span aria-hidden="true">0{index+1}</span></div>
            <header className={styles.startedStepHeader}><span className={styles.startedIndex} aria-hidden="true">{number}</span><div><small>STEP {number}</small><h3 className={styles.startedTitle}>{title}</h3></div></header>
            <p className={styles.startedCopy}>{copy}</p>
          </article>;
        })}
        <div className={styles.startedCtaWrap}><span aria-hidden="true"/><a className={styles.startedCta} href="#contact">BOOK A CALL <ArrowRight size={17}/></a></div>
      </div>
    </section>

    <section className={styles.brandsSection} id="proof" aria-labelledby="brands-heading">
      <div className={styles.brandsHeader}>
        <span className={styles.brandsNumber} aria-hidden="true">05</span>
        <h2 className={styles.brandsHeading} id="brands-heading"><span>BRANDS WE&apos;VE</span><span>WORKED WITH</span></h2>
        <p className={styles.brandsSubheading}>Trusted with content by brands ready to be seen.</p>
      </div>
      <div className={styles.logoField}>
        <div className={styles.brandSignal} aria-hidden="true"><span/><span/><span/></div>
        <ApprovedLogoMarquee/>
      </div>
    </section>

    <section className={styles.testimonialsSection} id="testimonials" aria-labelledby="testimonials-heading">
      <header className={styles.testimonialsHeader}>
        <span className={styles.testimonialsNumber} aria-hidden="true">06</span>
        <div className={styles.testimonialsHeadingBlock}><span className={styles.testimonialsEyebrow}>IN THEIR WORDS</span><h2 className={styles.testimonialsHeading} id="testimonials-heading"><span>DON&apos;T TAKE OUR</span><span>WORD FOR IT</span></h2><p>JUDGE FOR YOURSELF.</p></div>
        <span className={styles.testimonialsInstruction}>SELECT A STORY <b>{String(activeTestimonial+1).padStart(2,"0")} / {String(testimonials.length).padStart(2,"0")}</b></span>
      </header>

      <div className={styles.testimonialExperience}>
        <article className={styles.featuredStory} id="featured-testimonial" aria-live="polite" key={selectedTestimonial.id}>
          <div className={styles.featuredStoryMedia}>
            <Image src={selectedTestimonial.thumbnail} alt={`${selectedTestimonial.name} from ${selectedTestimonial.company}`} fill sizes="(max-width: 1050px) 100vw, 67vw" unoptimized/>
            <div className={styles.featuredStoryShade}/><span className={styles.featuredStoryIndex}>STORY {String(activeTestimonial+1).padStart(2,"0")}</span>
            {selectedTestimonial.videoUrl && <a className={styles.featuredStoryPlay} href={selectedTestimonial.videoUrl} aria-label={`Play testimonial from ${selectedTestimonial.name}`}><Play size={19} fill="currentColor"/></a>}
          </div>
          <div className={styles.featuredStoryDetails}>
            <blockquote>&ldquo;{selectedTestimonial.quote}&rdquo;</blockquote>
            <div className={styles.featuredStoryPerson}><strong>{selectedTestimonial.name}</strong><span>{selectedTestimonial.company}</span></div>
            <div className={styles.storyTimeline} aria-hidden="true"><span>STORY {String(activeTestimonial+1).padStart(2,"0")} / {String(testimonials.length).padStart(2,"0")}</span><i><b style={{width:`${Math.min(100,((activeTestimonial+1)/testimonials.length)*100+18)}%`}}/></i><em>CLIENT VOICE</em></div>
          </div>
        </article>

        <div className={styles.testimonialRail} role="group" aria-label="Select a client testimonial">
          {testimonials.map((testimonial,index)=><button type="button" className={`${styles.testimonialSelector} ${index===activeTestimonial?styles.testimonialSelectorActive:""}`} aria-pressed={index===activeTestimonial} onClick={()=>setActiveTestimonial(index)} key={testimonial.id}>
            <span className={styles.selectorIndex}>{String(index+1).padStart(2,"0")}</span>
            <span className={styles.selectorThumb}><Image src={testimonial.thumbnail} alt="" fill sizes="150px" unoptimized/></span>
            <span className={styles.selectorCopy}><strong>{testimonial.name}</strong><small>{testimonial.company}</small><q>{testimonial.quote}</q></span>
          </button>)}
        </div>
      </div>

      <a className={styles.testimonialsTransition} href="#contact">BOOK A CONVERSATION <ArrowRight size={16}/></a>
    </section>

    <section className={styles.finalBookingSection} id="contact" aria-labelledby="booking-heading">
      <div className={styles.finalBookingInner}>
        <div className={styles.finalBookingCopy}>
          <span className={styles.finalBookingNumber} aria-hidden="true">07</span>
          <h2 className={styles.finalBookingHeading} id="booking-heading"><span>RIGHT NOW,</span><span>SOMEONE ELSE HAS</span><span>YOUR AUDIENCE&apos;S</span><span>ATTENTION.</span><em>LET&apos;S CHANGE THAT.</em></h2>
          <p>We work with founders and brands who are ready to be seen by more of the right people. Pick a time that suits you to talk.</p>
          <div className={styles.bookingReassurance}><span><Check size={14}/>30-MINUTE DISCOVERY CALL</span><span><Check size={14}/>HONEST FIT CHECK, NO HARD SELL</span></div>
          <span className={styles.bookingConnector} aria-hidden="true"><i/></span>
        </div>
        <div className={styles.calendlyColumn}>
          <CalendlyEmbed/>
          {CALENDLY_URL && <a className={styles.calendlyFallbackLink} href={CALENDLY_URL} target="_blank" rel="noreferrer">OPEN CALENDAR IN A NEW TAB <MoveUpRight size={15}/><span className={styles.srOnly}>(opens in a new tab)</span></a>}
        </div>
      </div>
    </section>
    </main>

    <footer className={styles.footer}><a href="#top" aria-label="Back to the top"><Image src="/creative-riots-logo.png" alt="" width={150} height={66} unoptimized/></a><p>{homepage.footer.statement}</p><nav aria-label="Footer navigation">{homepage.navigation.slice(0,4).map(([label,href])=><a href={href} key={href}>{label}</a>)}</nav><span>{homepage.footer.copyright}</span></footer>
  </div>;
}
