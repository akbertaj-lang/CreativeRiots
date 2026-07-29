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

test("server-renders the production homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Creative Riots — Your Dedicated Content Team<\/title>/i);
  assert.match(html, /Skip to main content/i);
  assert.match(html, /WE RUN YOUR ENTIRE/i);
  assert.match(html, /THE CONTENT ENGINE/i);
  assert.match(html, /DON&#x27;T TAKE OUR/i);
  assert.match(html, /LET&#x27;S CHANGE THAT/i);
  assert.match(html, /name="theme-color" content="#090909"/i);
  assert.match(html, /rel="canonical" href="http:\/\/localhost:3000\/"/i);
  assert.doesNotMatch(html, /Trustpilot|\[ROLE\]|\[COMPANY\]|Case Study/i);
});

test("keeps the approved variation route available", async () => {
  const response = await render("/hero-variation");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /id="main-content"/i);
  assert.match(html, /aria-controls="site-menu"/i);
  assert.match(html, /id="contact"/i);
  assert.match(html, /READY TO TALK/i);
  assert.match(html, /mailto:hello@creativeriots\.com/i);
});

test("adds the separate experimental variation without replacing the approved routes", async () => {
  const response = await render("/variation-b");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Your Entire Content Engine/i);
  assert.match(html, /creative-riots-logo-client\.png/i);
  assert.match(html, /id="experimental-main"/i);
  assert.match(html, /id="engine-b"/i);
  assert.match(html, /id="talk-b"/i);
  assert.match(html, /Skip to main content/i);
  assert.match(html, /You’re not showing[\s\S]*up enough/i);
  assert.match(html, /Filmmakers[\s\S]*at heart/i);
  assert.match(html, /Take their[\s\S]*word for it/i);
  assert.match(html, /How To Start/i);
  assert.match(html, /stop planning and start posting/i);
});
