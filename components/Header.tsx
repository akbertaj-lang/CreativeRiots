"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { homepage } from "@/content/homepage";
import { PrimaryCTA } from "./PrimaryCTA";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("menu-open"); window.removeEventListener("keydown", close); };
  }, [open]);
  return <header className="site-header">
    <div className="wide header-inner">
      <a className="logo" href="#top" aria-label="Creative Riots home">
        <Image src="/placeholders/creative-riots-mark.png" alt="" width={32} height={32} priority/>
        <span>CREATIVE<br/><b>RIOTS</b></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">{homepage.navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="desktop-cta"><PrimaryCTA/></div>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X/> : <Menu/>}</button>
    </div>
    <nav id="mobile-menu" className={`mobile-nav ${open ? "open" : ""}`} aria-label="Mobile navigation">
      {homepage.navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <PrimaryCTA/>
    </nav>
  </header>;
}
