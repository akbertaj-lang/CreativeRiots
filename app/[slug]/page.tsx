import { notFound } from "next/navigation";
import ExperimentalHome from "@/components/experimental/ExperimentalHome";
import CenteredHome from "@/components/experimental/CenteredHome";
import { VERSIONS } from "@/config/versions.mjs";
export function generateStaticParams() { return VERSIONS.filter(v => v.slug).map(v => ({slug:v.slug})); }
export async function generateMetadata({params}: {params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const version=VERSIONS.find(v=>v.slug===slug);
  if(!version) notFound();
  return {title:`Creative Riots - Your Entire Content Engine (${version.label})`,robots:{index:false,follow:true},alternates:{canonical:"https://creativeriots.co/"}};
}
export default async function VersionPage({params}: {params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const version=VERSIONS.find(v=>v.slug===slug);
  if(!version) notFound();
  if(version.layout.startsWith("centered")) return <CenteredHome versionSlug={slug} floating={version.layout==="centered-float"}/>;
  return <ExperimentalHome isV2={version.layout!=="original"} versionSlug={slug} layout={version.layout} />;
}
