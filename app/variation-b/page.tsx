import type { Metadata } from "next";
import ExperimentalHome from "@/components/experimental/ExperimentalHome";

export const metadata: Metadata = {
  title: "Creative Riots — Content as Signal",
  description: "An experimental Creative Riots homepage: a live transmission from hidden expertise to cultural signal.",
  alternates: { canonical: "/variation-b" },
  openGraph: {
    title: "Creative Riots — Content as Signal",
    description: "A live creative transmission from hidden expertise to cultural signal.",
    type: "website",
    url: "/variation-b",
    images: [{ url: "/variation-b-og-v3.png", width: 1680, height: 945, alt: "Creative Riots — We run your entire content engine" }],
  },
  twitter: { card: "summary_large_image", title: "Creative Riots — Content as Signal", images: ["/variation-b-og-v3.png"] },
};

export default function VariationBPage() {
  return <ExperimentalHome />;
}
