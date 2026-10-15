import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const barlowCondensed = localFont({
  src: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2",
  variable: "--font-barlow-condensed",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonical),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: "/",
    images: [
      {
        url: "/assets/v1/hero-content-shoot.webp",
        width: 1600,
        height: 900,
        alt: "Creative Riots - We run your entire content engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/assets/v1/hero-content-shoot.webp"],
  },
};

export const viewport = { themeColor: "#090909", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlowCondensed.variable}`}>{children}</body>
    </html>
  );
}
