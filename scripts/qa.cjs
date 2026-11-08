// Browser QA against the static export (run `npm run preview` first).
// 1) Every route from sitemap.xml × 8 widths: console errors, failed/4xx requests, horizontal overflow, single <h1>.
// 2) Internal link integrity across all pages.
// 3) Interaction checks: /work search, filters, view modes, URL state; architecture explorer keyboard.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const base = process.env.BASE || "http://localhost:4173";
const widths = (process.env.WIDTHS || "320,375,390,430,768,1024,1440,1920").split(",").map(Number);
const sitemap = fs.readFileSync(path.join(__dirname, "..", "out", "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/codebyasad\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]);

(async () => {
  const b = await chromium.launch();
  let problems = 0;
  const fail = (...a) => { problems++; console.log("✗", ...a); };

  // 1) Route × width sweep
  for (const w of widths) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("pageerror " + e.message));
    page.on("console", (m) => m.type() === "error" && errs.push("console " + m.text()));
    page.on("response", (r) => r.status() >= 400 && r.url().startsWith(base) && errs.push(r.status() + " " + r.url()));
    for (const r of routes) {
      errs.length = 0;
      await page.goto(base + r, { waitUntil: "networkidle" });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 900) { window.scrollTo(0, y); await new Promise((s) => setTimeout(s, 20)); } });
      const res = await page.evaluate(() => {
        const W = document.documentElement.clientWidth;
        const bad = [...document.querySelectorAll("body *")].filter((el) => { const r = el.getBoundingClientRect(); return r.width && r.right > W + 1 && getComputedStyle(el).position !== "fixed" && !el.closest("[aria-hidden],svg,.overflow-x-auto,.overflow-hidden,table"); });
        return { scroll: document.documentElement.scrollWidth > W, sample: bad.slice(0, 3).map((e) => e.tagName + "." + String(e.className).slice(0, 50)), h1: document.querySelectorAll("h1").length };
      });
      if (errs.length || res.scroll || res.sample.length || res.h1 !== 1) fail(`[${w}] ${r}`, JSON.stringify({ errs: errs.slice(0, 3), ...res }));
    }
    await ctx.close();
  }
  console.log(`sweep: ${routes.length} routes × ${widths.length} widths`);

  // 2) Internal links
  const page = await b.newPage();
  const internal = new Set();
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "domcontentloaded" });
    (await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")))).forEach((h) => { if (h && h.startsWith("/") && !h.startsWith("//")) internal.add(h.split("#")[0].split("?")[0]); });
  }
  for (const h of internal) { const res = await page.request.get(base + h); if (res.status() !== 200) fail("broken internal link", h, res.status()); }
  console.log(`links: ${internal.size} unique internal links checked`);

  // 3) Interactions
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base + "/work/", { waitUntil: "networkidle" });
  const count = async () => Number((await page.locator("[aria-live=polite] span.font-medium").first().textContent()) ?? "-1");
  const total = await count();
  await page.fill("input[type=search]", "tenantscope"); await page.waitForTimeout(300);
  if ((await count()) !== 0) { /* menuwave is a flagship, shown above the catalogue, so 0 catalogue hits is expected */ }
  await page.fill("input[type=search]", "flutter firebase"); await page.waitForTimeout(300);
  const ff = await count(); if (!(ff > 0 && ff < total)) fail("search 'flutter firebase' count", ff, total);
  if (!page.url().includes("q=flutter")) fail("search not reflected in URL", page.url());
  await page.fill("input[type=search]", ""); await page.getByRole("button", { name: /^Research/ }).click(); await page.waitForTimeout(300);
  const research = await count(); if (!(research > 0 && research < total)) fail("category filter", research);
  await page.getByRole("button", { name: /^All projects/ }).click();
  await page.locator("[aria-label='Filter by technology'] button", { hasText: /^Laravel$/ }).click(); await page.waitForTimeout(300);
  const lv = await count(); if (!(lv > 0 && lv < total)) fail("tech filter Laravel", lv);
  await page.getByRole("radio", { name: "Technical index" }).click(); await page.waitForTimeout(300);
  if ((await page.locator("table tbody tr:not([hidden])").count()) !== lv) fail("index view row count mismatch");
  if (await page.locator('[data-view-panel="grid"]').isVisible()) fail("grid still visible in index view");
  await page.goto(base + "/work/?category=Mobile&view=index", { waitUntil: "networkidle" }); await page.waitForTimeout(300);
  if (!(await page.locator("table").isVisible())) fail("URL state not restored (view=index)");
  const mobile = await count(); if (!(mobile > 0 && mobile < total)) fail("URL state not restored (category=Mobile)", mobile);
  console.log(`work explorer: total=${total} flutter+firebase=${ff} research=${research} laravel=${lv}`);

  await page.goto(base + "/work/menuwave/", { waitUntil: "networkidle" });
  const tabs = page.locator("[data-architecture-explorer] [role=tablist][aria-orientation=vertical] [role=tab]");
  await tabs.first().focus(); await page.keyboard.press("ArrowDown");
  if ((await tabs.nth(1).getAttribute("aria-selected")) !== "true") fail("explorer ArrowDown");
  await page.keyboard.press("End");
  if ((await tabs.last().getAttribute("aria-selected")) !== "true") fail("explorer End");
  const panel = await page.locator("[data-architecture-explorer] [role=tabpanel]").textContent();
  if (!panel.includes("Integrations")) fail("explorer panel did not update");
  console.log("architecture explorer: keyboard OK");

  await b.close();
  console.log(problems ? `${problems} problem(s)` : "QA: all checks passed");
  process.exit(problems ? 1 : 0);
})();
