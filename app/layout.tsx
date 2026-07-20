import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal Foundry — Founder Content Engine",
  description: "Turn founder expertise into a clear, repeatable content engine that compounds trust and demand.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
