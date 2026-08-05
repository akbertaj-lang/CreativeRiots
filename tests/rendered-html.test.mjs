import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the approved homepage at the root route", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Creative Riots[^<]*Your Entire Content Engine<\/title>/i);
  assert.match(html, /Skip to main content/i);
  assert.match(html, /id="experimental-main"/i);
  assert.match(html, /Your Entire Content Engine/i);
  assert.match(html, /You[^<]*re not[\s\S]*showing[\s\S]*up[\s\S]*enough/i);
  assert.match(html, /Filmmakers[\s\S]*at[\s\S]*heart/i);
  assert.match(html, /Take their[\s\S]*word[\s\S]*for it/i);
  assert.match(html, /stop planning[\s\S]*and[\s\S]*start posting/i);
  assert.match(html, /rel="canonical" href="http:\/\/localhost:3000\/"/i);
});

test("removes obsolete variation routes", async () => {
  for (const pathname of ["/hero-variation", "/variation-b"]) {
    const response = await render(pathname);
    assert.equal(response.status, 404);
  }
});
