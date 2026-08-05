import type { Metadata } from "next";
import ExperimentalHome from "@/components/experimental/ExperimentalHome";

export const metadata: Metadata = {
  title: "Creative Riots — Your Entire Content Engine",
  description: "Creative Riots builds and runs complete content engines for ambitious brands and founders.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Creative Riots — Your Entire Content Engine",
    description: "Strategy, production and distribution — one complete content engine.",
    type: "website",
    url: "/",
    images: [{
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "Creative Riots — We run your entire content engine",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Riots — Your Entire Content Engine",
    images: ["/og.png"],
  },
};

export default function HomePage() {
  return <ExperimentalHome />;
}
