import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { VERSIONS } from "../config/versions.mjs";

const root = process.cwd();
const serverModuleUrl = new URL("../dist/server/index.js", import.meta.url);
serverModuleUrl.searchParams.set("cacheBust", `${Date.now()}`);

const { default: worker } = await import(serverModuleUrl.href);

for (const {slug} of VERSIONS) {
const route = `/${slug}`;
const response = await worker.fetch(
  new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Failed to render static homepage HTML: ${response.status}`);
}

const html = await response.text();
const outputDir = resolve(root, "dist", "client", slug || ".");

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, "index.html"), html, "utf8");

console.log(`Wrote ${route} index.html for static deployment.`);
}
