import { ArrowRight } from "lucide-react";
import { DISCOVERY_CALL_URL } from "@/config/site";
import { homepage } from "@/content/homepage";

export function PrimaryCTA({ label = homepage.cta }: { label?: string }) {
  return <a className="primary-cta" href={DISCOVERY_CALL_URL}>{label}<ArrowRight aria-hidden="true" size={16}/></a>;
}
