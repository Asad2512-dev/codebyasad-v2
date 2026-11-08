// Visits every route at every target width; reports console errors, failed requests and horizontal overflow.
const { chromium } = require("playwright");
const base = process.env.BASE || "http://localhost:4173";
const routes = ["/", "/about/", "/work/", "/work/menuwave/", "/work/totalcashpro/", "/work/examcell/", "/work/unisecure/", "/work/clubsync/", "/work/biterush/", "/work/electronic-voting-machine/", "/work/supervisor-allocation/", "/work/voice-library/", "/experience/", "/expertise/", "/lab/", "/resume/", "/contact/"];
const widths = [320, 375, 390, 430, 768, 1024, 1440, 1920];
(async () => {
  const b = await chromium.launch();
  let problems = 0;
  for (const w of widths) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("pageerror " + e.message));
    page.on("console", (m) => m.type() === "error" && errs.push("console " + m.text()));
    page.on("requestfailed", (r) => errs.push("reqfail " + r.url()));
    page.on("response", (r) => r.status() >= 400 && errs.push(r.status() + " " + r.url()));
    for (const r of routes) {
      errs.length = 0;
      await page.goto(base + r, { waitUntil: "networkidle" });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((s) => setTimeout(s, 30)); } });
      const over = await page.evaluate(() => {
        const W = document.documentElement.clientWidth;
        const bad = [...document.querySelectorAll("body *")].filter((el) => { const r = el.getBoundingClientRect(); return r.right > W + 1 && getComputedStyle(el).position !== "fixed" && !el.closest("[aria-hidden],svg,.overflow-x-auto,.overflow-hidden"); });
        return { scroll: document.documentElement.scrollWidth > W, sample: bad.slice(0, 3).map((e) => e.tagName + "." + String(e.className).slice(0, 60)) };
      });
      const h1 = await page.locator("h1").count();
      if (errs.length || over.scroll || over.sample.length || h1 !== 1) {
        problems++;
        console.log(`[${w}] ${r}`, { errs: errs.slice(0, 4), over, h1 });
      }
    }
    await ctx.close();
  }
  await b.close();
  console.log(problems ? `${problems} problem(s)` : "All routes clean at all widths");
})();
