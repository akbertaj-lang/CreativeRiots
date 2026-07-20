import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import "./globals.css";

const heading = Barlow_Condensed({ subsets:["latin"], weight:["600","700","800"], variable:"--font-heading", display:"swap" });
const body = Inter({ subsets:["latin"], weight:["400","500","600"], variable:"--font-body", display:"swap" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const base = host ? new URL(`${protocol}://${host}`) : new URL(siteConfig.canonical);
  return {
    metadataBase: base, title: siteConfig.title, description: siteConfig.description,
    alternates: { canonical: "/" }, icons: { icon: "/favicon.svg" },
    openGraph: { title: siteConfig.title, description: siteConfig.description, type:"website", url:"/", images:[{url:"/og.png",width:1200,height:630,alt:"Creative Riots — We run your entire content engine."}] },
    twitter: { card:"summary_large_image", title:siteConfig.title, description:siteConfig.description, images:["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{children:React.ReactNode}>) {
  return <html lang="en" className={`${heading.variable} ${body.variable}`}><body>{children}</body></html>;
}
