// Generates public/og.png (1200x630) from inline HTML using the preinstalled Playwright.
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "node:fs";
const font = fs.readFileSync("src/styles/InstrumentSerif-Regular.woff2").toString("base64");
const html = `<html><head><style>
@font-face{font-family:IS;src:url(data:font/woff2;base64,${font})}
body{margin:0;width:1200px;height:630px;background:#F8F8F5;font-family:system-ui;color:#16191D;
background-image:linear-gradient(to right,rgba(22,25,29,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(22,25,29,.05) 1px,transparent 1px);background-size:64px 64px}
.w{padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;height:486px}
.l{font:500 15px ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#626970}
h1{font-family:IS;font-weight:400;font-size:112px;line-height:.92;margin:0;letter-spacing:-.02em}
em{color:#265DDE}.n{font-family:IS;font-size:40px}</style></head><body><div class="w">
<div class="l">Full-Stack Engineer / Product Engineer</div>
<h1>I engineer ideas<br>into <em>products.</em></h1>
<div style="display:flex;justify-content:space-between;align-items:end"><span class="n">Muhammad Asad Ullah</span><span class="l">codebyasad.com</span></div>
</div></body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.screenshot({ path: "public/og.png" });
await b.close();
console.log("public/og.png written");
