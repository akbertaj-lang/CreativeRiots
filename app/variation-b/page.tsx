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
    images: [{ url: "/variation-b-og.png", width: 1792, height: 896, alt: "Creative Riots — Content as Signal" }],
  },
  twitter: { card: "summary_large_image", title: "Creative Riots — Content as Signal", images: ["/variation-b-og.png"] },
};

export default function VariationBPage() {
  return <ExperimentalHome />;
}
