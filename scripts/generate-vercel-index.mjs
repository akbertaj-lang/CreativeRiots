import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const serverModuleUrl = new URL("../dist/server/index.js", import.meta.url);
serverModuleUrl.searchParams.set("cacheBust", `${Date.now()}`);

const { default: worker } = await import(serverModuleUrl.href);

const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
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
const outputDir = resolve(root, "dist", "client");

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, "index.html"), html, "utf8");

console.log("Wrote dist/client/index.html for static deployment.");
