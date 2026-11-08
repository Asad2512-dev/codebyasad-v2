# Deploying to Hostinger (shared hosting)

The site is a fully static export — no Node.js process is needed on the server.

## 1. Build

```bash
npm ci
npm run build          # outputs ./out (includes .htaccess, sitemap.xml, robots.txt, 404.html)
```

Check locally first: `npm run preview` → http://localhost:4173 and click through.

## 2. Upload

**Option A — File Manager**
1. hPanel → *Websites* → *Manage* → *File Manager* → open `public_html/`.
2. Back up and remove the old site's files (the current codebyasad.com is a Laravel app — keep a copy).
3. Zip the **contents** of `out/` (not the folder itself): `cd out && zip -r ../site.zip . -x '*.txt'` then upload `site.zip` to `public_html/` and *Extract*.
4. Make sure the hidden `.htaccess` is present in `public_html/` (enable "Show hidden files").

**Option B — FTP/SFTP**: upload the contents of `out/` into `public_html/` with FileZilla (Hostinger → *Files* → *FTP Accounts* for credentials).

**Option C — Git deploy**: hPanel → *Advanced* → *Git* can pull a branch, but it will not run `npm run build`. Use a `deploy` branch containing only the built `out/` contents if you want this.

## 3. Domain & HTTPS
1. hPanel → *Domains*: point `codebyasad.com` at this hosting plan (nameservers `ns1/ns2.dns-parking.com` if registered elsewhere, or A record to the plan IP).
2. hPanel → *Security* → *SSL*: install the free SSL certificate for `codebyasad.com` and `www.codebyasad.com`.
3. The included `.htaccess` then forces HTTPS and redirects `www` → apex. If you prefer `www`, change the rule and `site.url` in `src/config/site.ts`.

## 4. What `.htaccess` does
- HTTPS + apex redirect.
- `trailingSlash: true` export means every route is `folder/index.html`; Apache serves `/work/menuwave/` directly, and `/work/menuwave` 301s to the slash version — deep links and refreshes work.
- Custom 404 → `/404.html`.
- Long-term immutable caching for hashed assets, no-cache for HTML, gzip/deflate compression, basic security headers.

## 5. Verify production
- [ ] `https://codebyasad.com/`, `/work/`, `/work/menuwave/`, `/resume/` load directly (paste into a new tab) and on refresh.
- [ ] `http://` and `www.` redirect to `https://codebyasad.com/`.
- [ ] `/does-not-exist` shows the custom 404.
- [ ] `/sitemap.xml` and `/robots.txt` load; submit the sitemap in Google Search Console.
- [ ] Response headers show `content-encoding: gzip` (or br) and `cache-control: immutable` on `/_next/static/*`.
- [ ] Run PageSpeed Insights on `/` and `/work/menuwave/` against the live site.

## Updating
Edit `src/content/*`, run `npm run build`, re-upload `out/`. Only changed hashed files and HTML differ.
