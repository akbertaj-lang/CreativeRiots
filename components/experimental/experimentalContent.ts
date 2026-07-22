import { homepage } from "@/content/homepage";

export const experimentalContent = {
  ...homepage,
  hero: {
    eyebrow: "Dedicated content teams for founders and brands",
    headline: ["We run", "your entire", "content", "engine."],
    body: "From the first idea to the final post, a dedicated team that works only with you handles it all.",
    metrics: [["10M+", "Views generated"], ["2,000+", "Videos produced"], ["50+", "Brands supported"]] as const,
  },
  visibilityHeading: ["You’re brilliant", "at what you do.", "Your audience", "has no idea."],
  engine: {
    heading: "The Content Engine",
    intro: "If you just need videos made, a good freelancer will do that brilliantly. But a complex brand needs a system. The Content Engine gives you a team built around your brand, running everything from the first idea to the final post.",
    stages: [
      ["01", "We learn you", "We study your brand inside out. Your story, your voice, your vision, and who you’re really talking to. Before we make anything, we understand you."],
      ["02", "We build your content", "Your team turns a few hours of your time into content that sounds and looks like you, made to land with your audience, week after week."],
      ["03", "We distribute it", "We get it in front of the right people, on the right platforms, so the work actually gets seen."],
    ] as const,
  },
  brandsHeading: "Brands we’ve worked with",
  brandsSubheading: "Trusted with content by brands ready to be seen.",
  testimonialHeading: "Don’t take our word for it",
  testimonialSubheading: "Judge for yourself.",
  bookingHeading: ["Right now,", "someone else has", "your audience’s", "attention."],
  bookingAccent: "Let’s change that.",
  bookingBody: "We work with founders and brands who are ready to be seen by more of the right people. Pick a time that suits you to talk.",
} as const;
