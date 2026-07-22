# Creative Riots Homepage

Production-ready homepage for Creative Riots, built with Next.js, TypeScript, Tailwind CSS, Framer Motion and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Editing content

- Homepage copy: `content/homepage.ts`
- Calendly/discovery-call URL and social links: `config/site.ts`
- Replace the placeholder mark at `public/placeholders/creative-riots-mark.png` with the approved logo.
- Replace marked video, image, client-logo, testimonial and case-study placeholders after assets and verified data are approved.
- Generated non-client placeholder photography lives in `public/placeholders/` and is referenced from `content/homepage.ts`.
- Confirm the Trustpilot rating before removing the `[confirm]` label.
- Set `SHOW_CASE_STUDY` in `content/homepage.ts` to remove or restore the featured case study.
