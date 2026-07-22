import Image from "next/image";
import { PrimaryCTA } from "./PrimaryCTA";

export function Header() {
  return <header className="site-header">
    <div className="wide header-inner">
      <a className="logo" href="#top" aria-label="Creative Riots home">
        <Image src="/creative-riots-logo.png" alt="Creative Riots" width={180} height={80} priority unoptimized/>
      </a>
      <div className="desktop-cta"><PrimaryCTA/></div>
    </div>
  </header>;
}
