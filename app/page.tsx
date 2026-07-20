const testimonials = [
  {
    name: "Maya Chen · Founder, Threadline",
    quote: "We stopped chasing ideas and started shipping a point of view every week.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Elias Ward · CEO, Northstar",
    quote: "The first month produced more qualified conversations than our last quarter.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Priya Nair · Partner, Assembly",
    quote: "It finally sounds like us—clear, useful, and impossible to confuse with anyone else.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
  },
];

function Play() {
  return <span className="play" aria-hidden="true">▶</span>;
}

export default function Home() {
  return (
    <main data-release="public-v2">
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Signal Foundry home">SIGNAL<span>•</span>FOUNDRY</a>
        <a className="text-link" href="#method">THE METHOD ↘</a>
      </header>

      <section className="hero shell" id="top">
        <p className="eyebrow">A CONTENT SYSTEM FOR FOUNDER-LED COMPANIES</p>
        <h1>TURN WHAT YOU KNOW INTO<br/><em>THE REASON THEY BUY.</em></h1>
        <p className="lede">We extract your sharpest thinking, shape it into a repeatable point of view, and publish it where your next customers are already paying attention.</p>
        <div className="hero-film media-frame" role="img" aria-label="Founder recording a content session">
          <div className="film-copy"><small>THE 3:12 EXPLAINER</small><b>YOUR EXPERTISE<br/>SHOULD COMPOUND.</b></div>
          <Play />
        </div>
        <a className="button" href="#apply">BUILD MY CONTENT ENGINE</a>
        <div className="metrics" aria-label="Service metrics">
          <div><strong>01</strong><span>FOUNDER HOUR<br/>PER MONTH</span></div>
          <div><strong>12+</strong><span>HIGH-SIGNAL<br/>ASSETS SHIPPED</span></div>
          <div><strong>30</strong><span>DAYS TO A<br/>WORKING SYSTEM</span></div>
        </div>
      </section>

      <section className="light-panel" id="method">
        <div className="shell panel-inner">
          <p className="eyebrow dark">THE REAL BOTTLENECK</p>
          <h2>YOU DON’T NEED MORE IDEAS.<br/><em>YOU NEED A SYSTEM.</em></h2>
          <div className="pain-grid">
            <p><i>×</i><span><b>You’re the only source of truth.</b><br/>Every useful post starts and stops with your calendar.</span></p>
            <p><i>×</i><span><b>Your best insights stay in calls.</b><br/>The moments that build trust vanish when the meeting ends.</span></p>
            <p><i>×</i><span><b>Consistency kills the quality.</b><br/>Shipping more usually means saying less that matters.</span></p>
            <p><i>×</i><span><b>Agencies flatten your voice.</b><br/>Polished output, generic thinking, no durable advantage.</span></p>
          </div>

          <div className="engine-head">
            <p className="eyebrow dark">THE SIGNAL FOUNDRY CONTENT ENGINE</p>
            <h2>ONE CONVERSATION.<br/><em>A MONTH OF MOMENTUM.</em></h2>
            <p>Built around how founders actually think: out loud, in context, with someone asking the next intelligent question.</p>
          </div>
          <div className="engine-cards">
            <article><span>01 / EXTRACT</span><h3>THE DEEP-DIVE</h3><p>A focused monthly conversation pulls the stories, opinions, proof, and patterns only you can own.</p></article>
            <article><span>02 / SHAPE</span><h3>THE NARRATIVE</h3><p>We turn raw expertise into a clear editorial spine—then adapt it without diluting the idea.</p></article>
            <article><span>03 / COMPOUND</span><h3>THE DISTRIBUTION</h3><p>Every asset has a job: attract the right people, deepen trust, or move an opportunity forward.</p></article>
          </div>
          <a className="button" href="#apply">SEE IF WE’RE A FIT</a>
        </div>
      </section>

      <section className="proof shell">
        <p className="eyebrow">THE WORK BEHIND THE WORK</p>
        <h2>BUILT IN THE ROOM.<br/><em>PROVEN IN THE MARKET.</em></h2>
        <div className="proof-images">
          <figure><img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=88" alt="Strategy workshop in progress"/><figcaption>01 · LIVE NARRATIVE SESSION</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88" alt="Creative team collaborating in a studio"/><figcaption>02 · EDITORIAL PRODUCTION</figcaption></figure>
        </div>
        <p className="proof-copy">The strongest founder brands are not content machines. They are clear thinkers with an operating system that makes their thinking visible.</p>
        <p className="muted">Our work sits between strategy, interviewing, editorial craft, and distribution—so the signal survives every format.</p>
        <div className="logos" aria-label="Selected client sectors"><span>VENTURE</span><span>CLIMATE</span><span>FINTECH</span><span>HEALTH</span><span>DEVTOOLS</span><span>DESIGN</span></div>
      </section>

      <section className="light-panel steps-panel">
        <div className="shell panel-inner">
          <p className="eyebrow dark">START WITHOUT THE THEATER</p>
          <h2>FROM SCATTERED EXPERTISE<br/><em>TO A WORKING ENGINE.</em></h2>
          <div className="steps">
            <article><span>STEP 01</span><h3>FIND THE SIGNAL</h3><p>We map your market, buyer, strongest convictions, existing proof, and the conversations you want to own.</p></article>
            <article><span>STEP 02</span><h3>BUILD THE SYSTEM</h3><p>We define your narrative pillars, capture rhythm, formats, approvals, and a distribution plan your team can sustain.</p></article>
            <article><span>STEP 03</span><h3>SHIP & LEARN</h3><p>We publish, watch what earns attention from the right people, and sharpen the system every month.</p></article>
          </div>
          <a className="button" href="#apply">START WITH A SIGNAL SESSION</a>
        </div>
      </section>

      <section className="testimonials shell">
        <p className="eyebrow">IN THEIR OWN WORDS</p>
        <h2>THE SIGNAL GETS CLEARER.<br/><em>THE RIGHT PEOPLE NOTICE.</em></h2>
        <div className="testimonial-grid">
          {testimonials.map((item) => <article key={item.name}>
            <div className="thumb"><img src={item.image} alt="Client team at work"/><Play /></div>
            <blockquote>“{item.quote}”</blockquote><p>{item.name}</p>
          </article>)}
        </div>
      </section>

      <section className="final shell" id="apply">
        <div className="signal-line"><span></span><b>••••••••••••••••</b><span></span></div>
        <div className="final-copy">
          <p className="eyebrow">ONE GOOD CONVERSATION CAN CHANGE THE TRAJECTORY</p>
          <h2>YOUR BEST THINKING<br/><em>SHOULDN’T STAY HIDDEN.</em></h2>
          <p>Book a 30-minute signal session. We’ll find the idea your market needs to hear next—and show you how it can compound.</p>
          <a className="button" href="mailto:hello@signalfoundry.co?subject=Signal%20Session">BOOK A SIGNAL SESSION</a>
        </div>
        <footer><span>© 2026 SIGNAL FOUNDRY</span><span>NEW YORK · LONDON · EVERYWHERE</span></footer>
      </section>
    </main>
  );
}
