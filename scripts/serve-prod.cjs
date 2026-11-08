// Serves ./out like Hostinger with the bundled .htaccess: gzip + immutable caching
// for hashed assets + trailing-slash directory index. For realistic Lighthouse runs.
const http = require("http"), fs = require("fs"), path = require("path"), zlib = require("zlib");
const root = path.join(__dirname, "..", "out");
const types = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404, { "content-type": types[".html"] }); return res.end(fs.readFileSync(path.join(root, "404.html"))); }
  const ext = path.extname(f), body = fs.readFileSync(f);
  const h = { "content-type": types[ext] || "application/octet-stream", "cache-control": ext === ".html" ? "public, max-age=0, must-revalidate" : "public, max-age=31536000, immutable" };
  if (/gzip/.test(req.headers["accept-encoding"] || "") && /html|javascript|css|svg|xml|json|text/.test(h["content-type"])) {
    h["content-encoding"] = "gzip"; res.writeHead(200, h); return res.end(zlib.gzipSync(body));
  }
  res.writeHead(200, h); res.end(body);
}).listen(process.env.PORT || 4174, () => console.log("prod-like server on", process.env.PORT || 4174));
