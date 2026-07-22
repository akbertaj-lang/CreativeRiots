export type Brand = { readonly name: string; readonly logo: string | null; readonly url: string | null };
export const SHOW_CASE_STUDY = false;

export const homepage = {
  navigation: [
    ["Why it matters", "#problem"],
    ["The engine", "#engine"],
    ["Getting started", "#getting-started"],
    ["Proof", "#proof"],
    ["Testimonials", "#testimonials"],
  ],
  visibility: {
    pains: [
      "Worse competitors get the recognition, because they're the ones people see.",
      "The right audience doesn't know you exist.",
      "You post, and it mostly disappears into silence.",
      "You know you should show up more, but there's never time.",
      "Every new conversation starts with you proving who you are.",
      "Your presence online isn't pulling its weight.",
    ],
    emphasis: [
      "they're the ones people see",
      "doesn't know you exist",
      "disappears into silence",
      "there's never time",
      "proving who you are",
      "pulling its weight",
    ],
  },
  gettingStarted: [
    ["01", "BOOK A CALL", "We get on a call to understand you, your brand, your goals, and exactly what you're looking for. If we're a fit, we'll tell you. If we're not, we'll tell you that too."],
    ["02", "WE BUILD YOUR CONTENT ENGINE", "We set up a team and a system around your brand. You give us a few hours a month, we handle everything after."],
    ["03", "YOU BECOME KNOWN", "Your presence grows, your authority builds, and your brand starts reaching the people who should already know you."],
  ],
  brands: [
    { name: "MAGIC EDEN", logo: null, url: null }, { name: "ANIMOCA BRANDS", logo: null, url: null },
    { name: "KARATE COMBAT", logo: null, url: null }, { name: "PIXELMON", logo: null, url: null },
    { name: "JUPITER", logo: null, url: null }, { name: "FORBES WEB3", logo: null, url: null },
    { name: "ABSTRACT", logo: null, url: null }, { name: "DOODLES", logo: null, url: null },
    { name: "EDUCHAIN", logo: null, url: null }, { name: "NIBIRU", logo: null, url: null },
    { name: "PIXELS", logo: null, url: null }, { name: "AGGLAYER", logo: null, url: null },
    { name: "SEEDIFY", logo: null, url: null }, { name: "REVOKE", logo: null, url: null },
    { name: "SOMNIA", logo: null, url: null },
  ] satisfies Brand[],
  testimonials: [
    { id: "testimonial-01", quote: "Working with you guys has been incredible", name: "MANI", company: "FORBES WEB3", videoUrl: "", thumbnail: "/placeholders/case-study-interview.jpg" },
    { id: "testimonial-02", quote: "The user experience with you was top-tier", name: "TIMMY", company: "AGGLAYER", videoUrl: "", thumbnail: "/placeholders/hero-content-shoot.jpg" },
    { id: "testimonial-03", quote: "We started seeing significant social media growth", name: "BEN", company: "SAPIEN", videoUrl: "", thumbnail: "/placeholders/proof-planning.jpg" },
  ],
  booking: {
    calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
    fallbackUrl: "mailto:hello@creativeriots.com?subject=Discovery%20call%20request",
  },
  footer: {
    statement: "Dedicated content teams for founders and brands.",
    copyright: "© 2026 CREATIVE RIOTS",
  },
  seo: {
    title: "Creative Riots — Your Dedicated Content Team",
    description: "Creative Riots gives founders and brands a dedicated team for content strategy, production, distribution and social media management.",
  },
} as const;
