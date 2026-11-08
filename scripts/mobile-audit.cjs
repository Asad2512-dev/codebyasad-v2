// Mobile audit: every route at mobile viewports (+ landscape). Records measurable issues and screenshots.
// Usage: node scripts/mobile-audit.cjs [outDir]   (needs `npm run preview`)
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const base = process.env.BASE || "http://localhost:4173";
const out = process.argv[2] || "audit-shots";
fs.mkdirSync(out, { recursive: true });
const sitemap = fs.readFileSync(path.join(__dirname, "..", "out", "sitemap.xml"), "utf8");
const all = [...sitemap.matchAll(/<loc>https:\/\/codebyasad\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const viewports = [[320,568],[360,800],[375,667],[390,844],[393,852],[412,915],[430,932],[768,1024],[844,390],[667,375]];
const shotRoutes = new Set(["/", "/work/", "/work/menuwave/", "/work/softheal/", "/experience/", "/contact/"]);
const shotVps = new Set(["320x568", "390x844", "844x390", "768x1024"]);

(async () => {
  const b = await chromium.launch();
  const issues = [];
  const add = (sev, route, vp, kind, detail) => issues.push({ sev, route, vp, kind, detail });
  for (const [w, h] of viewports) {
    const vp = `${w}x${h}`;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 900, hasTouch: true, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message)); page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    for (const r of all) {
      errs.length = 0;
      await page.goto(base + r, { waitUntil: "networkidle" });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((s) => setTimeout(s, 15)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(150);
      const m = await page.evaluate(() => {
        const W = document.documentElement.clientWidth, H = window.innerHeight;
        const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && !el.closest("[hidden],[aria-hidden=true]"); };
        const clipped = [...document.querySelectorAll("h1,h2,h3")].filter((el) => vis(el) && !el.classList.contains("sr-only") && (el.scrollWidth > el.clientWidth + 2 || el.getBoundingClientRect().right > W + 1)).map((e) => e.textContent.trim().slice(0, 40));
        const targets = [...document.querySelectorAll("a[href],button,input,[role=tab],[role=radio]")].filter(vis).filter((el) => !el.classList.contains("skip-link") && !el.closest("#mobile-menu")).filter((el) => { const r = el.getBoundingClientRect(); const inline = el.tagName === "A" && getComputedStyle(el).display === "inline" && el.closest("p,li,dd"); return !inline && (r.height < 44 || r.width < 44); }).map((el) => `${el.tagName.toLowerCase()}:"${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 24)}" ${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)}`);
        const smallText = [...document.querySelectorAll("p,li,dd,td")].filter(vis).filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 30) && parseFloat(getComputedStyle(el).fontSize) < 15 && !getComputedStyle(el).fontFamily.toLowerCase().includes("mono")).map((el) => `${parseFloat(getComputedStyle(el).fontSize)}px "${el.textContent.trim().slice(0, 30)}"`);
        const firstProject = document.querySelector("[data-stage]");
        const hero = document.querySelector("[data-hero-root]");
        const ctaBottom = [...document.querySelectorAll("#hero-title ~ * a")].map((a) => a.getBoundingClientRect().bottom)[0];
        return { overflow: document.documentElement.scrollWidth > W, clipped, targets: [...new Set(targets)].slice(0, 12), nTargets: targets.length, smallText: smallText.slice(0, 6), nSmall: smallText.length,
          heroScreens: hero ? +(hero.getBoundingClientRect().height / H).toFixed(2) : null,
          firstProjectScreens: firstProject ? +((firstProject.getBoundingClientRect().top + scrollY) / H).toFixed(1) : null,
          ctaBelowFold: ctaBottom ? ctaBottom > H : null, docScreens: +(document.body.scrollHeight / H).toFixed(1) };
      });
      if (errs.length) add("high", r, vp, "console", errs.slice(0, 2).join(" | "));
      if (m.overflow) add("high", r, vp, "horizontal-overflow", "");
      if (m.clipped.length) add("high", r, vp, "clipped-heading", m.clipped.join(" / "));
      if (m.nTargets) add("medium", r, vp, "tap-target<44", `${m.nTargets}: ${m.targets.join("; ")}`);
      if (m.nSmall) add("low", r, vp, "small-body-text", `${m.nSmall}: ${m.smallText.join("; ")}`);
      if (r === "/") {
        if (m.heroScreens > 2.2) add("high", r, vp, "hero-too-tall", `hero = ${m.heroScreens} screens; first project at ${m.firstProjectScreens} screens; page ${m.docScreens} screens`);
        if (m.ctaBelowFold) add("high", r, vp, "hero-cta-below-fold", "primary CTA not visible on first screen");
      }
      if (shotRoutes.has(r) && shotVps.has(vp)) await page.screenshot({ path: `${out}/${vp}${r.replace(/\//g, "_") || "_"}.png` });
    }
    // Menu behaviour on phones
    if (w < 900) {
      await page.goto(base + "/about/", { waitUntil: "networkidle" });
      const btn = page.locator("button[aria-controls=mobile-menu]");
      if (await btn.count()) {
        await btn.click(); await page.waitForTimeout(400);
        const st = await page.evaluate(() => ({ focusInMenu: !!document.activeElement?.closest("#mobile-menu"), locked: getComputedStyle(document.body).overflow === "hidden", links: document.querySelectorAll("#mobile-menu a").length, home: [...document.querySelectorAll("#mobile-menu a")].some((a) => a.getAttribute("href") === "/") }));
        if (!st.focusInMenu) add("medium", "(menu)", vp, "menu-focus", "focus does not move into the menu on open");
        if (!st.home) add("low", "(menu)", vp, "menu-home", "no Home link in the menu");
        await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
        for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
        const trapped = await page.evaluate(() => !!document.activeElement?.closest("header, #mobile-menu"));
        if (!trapped) add("medium", "(menu)", vp, "menu-focus-trap", "Tab escapes the open menu");
        await page.keyboard.press("Escape"); await page.waitForTimeout(300);
      } else add("high", "(menu)", vp, "menu-missing", "");
    }
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(`${out}/issues.json`, JSON.stringify(issues, null, 1));
  const by = {}; issues.forEach((i) => { const k = `${i.sev} ${i.kind}`; by[k] = (by[k] || 0) + 1; });
  console.log(`${all.length} routes × ${viewports.length} viewports`); console.log(by);
})();
