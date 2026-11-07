// Mini serveur local pour recevoir les images générées depuis le navigateur.
// POST http://localhost:8799/up?name=<slug>&dir=<products|scenes>  (body = octets PNG)
import { createServer } from "node:http";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dir, "..", "assets");
const PORT = 8799;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

createServer(async (req, res) => {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS); return res.end(); }
  if (req.method === "POST" && req.url.startsWith("/up")) {
    try {
      const u = new URL(req.url, "http://localhost");
      const name = (u.searchParams.get("name") || "img").replace(/[^a-z0-9_-]/gi, "");
      const dir = u.searchParams.get("dir") === "scenes" ? "scenes" : "products";
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const buf = Buffer.concat(chunks);
      await mkdir(join(ASSETS, dir), { recursive: true });
      await writeFile(join(ASSETS, dir, `${name}.png`), buf);
      console.log(`✅ ${dir}/${name}.png (${buf.length} o)`);
      res.writeHead(200, { ...CORS, "Content-Type": "text/plain" });
      return res.end("ok " + buf.length);
    } catch (e) {
      res.writeHead(500, CORS); return res.end("err " + e.message);
    }
  }
  res.writeHead(404, CORS); res.end("nope");
}).listen(PORT, "127.0.0.1", () => console.log(`📥 upload-server sur http://localhost:${PORT}`));
