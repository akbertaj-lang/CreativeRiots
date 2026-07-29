import type { Metadata } from "next";
import ExperimentalHome from "@/components/experimental/ExperimentalHome";

export const metadata: Metadata = {
  title: "Creative Riots — Your Entire Content Engine",
  description: "Creative Riots builds and runs complete content engines for ambitious brands and founders.",
  alternates: { canonical: "/variation-b" },
  openGraph: {
    title: "Creative Riots — Your Entire Content Engine",
    description: "Strategy, production and distribution — one complete content engine.",
    type: "website",
    url: "/variation-b",
    images: [{
      url: "/variation-b-og-v5.png",
      width: 1672,
      height: 941,
      alt: "Creative Riots — We run your entire content engine",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Riots — Your Entire Content Engine",
    images: ["/variation-b-og-v5.png"],
  },
};

export default function VariationBPage() {
  return <ExperimentalHome />;
}
