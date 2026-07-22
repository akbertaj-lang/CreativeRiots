import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import "./globals.css";
import "./placeholder-media.css";
import "./figma-reference.css";

const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = localFont({
  src: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2",
  variable: "--font-barlow-condensed",
  weight: "700",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  const base = host ? new URL(`${protocol}://${host}`) : new URL(siteConfig.canonical);
  return {
    metadataBase: base, title: siteConfig.title, description: siteConfig.description,
    alternates: { canonical: "/" }, icons: { icon: "/favicon.svg" },
    openGraph: { title: siteConfig.title, description: siteConfig.description, type:"website", url:"/", images:[{url:"/og.png",width:1200,height:630,alt:"Creative Riots — We run your entire content engine."}] },
    twitter: { card:"summary_large_image", title:siteConfig.title, description:siteConfig.description, images:["/og.png"] },
  };
}

export const viewport = { themeColor: "#090909", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{children:React.ReactNode}>) {
  return <html lang="en">
    <head/>
    <body className={`${inter.variable} ${barlowCondensed.variable}`}>{children}</body>
  </html>;
}
