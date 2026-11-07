#!/usr/bin/env node
/**
 * WOOD — Générateur d'images IA via Cloudflare Workers AI (FLUX-1-schnell)
 * ----------------------------------------------------------------------
 * Génère des visuels produits "sous cloche, style WOOD" (fond sombre + halo cyan).
 *
 * PRÉREQUIS (variables d'environnement, fournies par la proprio — jamais en dur) :
 *   CF_ACCOUNT_ID   = ton identifiant de compte Cloudflare (non secret)
 *   CF_API_TOKEN    = un token API Cloudflare avec permission "Workers AI" (secret, révocable)
 *
 * USAGE :
 *   CF_ACCOUNT_ID=xxxx CF_API_TOKEN=yyyy node tools/generate-images.mjs
 *   (ou définir les vars dans le shell, puis: node tools/generate-images.mjs)
 *
 * Sortie : cbd-claude/assets/products/<slug>.png
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ACCOUNT = process.env.CF_ACCOUNT_ID;
const TOKEN = process.env.CF_API_TOKEN;
const MODEL = process.env.CF_IMAGE_MODEL || "@cf/black-forest-labs/flux-1-schnell";

if (!ACCOUNT || !TOKEN) {
  console.error("\n❌ Manque CF_ACCOUNT_ID et/ou CF_API_TOKEN (variables d'environnement).");
  console.error("   Crée un token API Cloudflare (permission Workers AI) puis relance.\n");
  process.exit(1);
}

const __dir = dirname(fileURLToPath(import.meta.url));
const MODE = process.argv[2] || "flowers";
const OUT = join(__dir, "..", "assets", MODE === "scenes" ? "scenes" : "products");

/* Style commun WOOD (sous cloche + halo cyan + fond sombre premium) */
const STYLE =
  "displayed under a pristine clear glass bell-jar cloche on a polished dark walnut wood base, " +
  "single hero bud perfectly centered, deep near-black forest-green studio background, " +
  "cinematic three-point lighting with a soft glowing teal-cyan rim halo behind the glass, " +
  "hyper-realistic high-end product photography, 85mm macro, shallow depth of field, " +
  "crisp frosty trichome detail, elegant reflections on the glass, luxury cannabis boutique mood, " +
  "photorealistic, ultra detailed, 8k, square 1:1, no text, no watermark, no logo, no hands, no people";

/* 13 fleurs réelles (couleur/arôme indicatifs pour varier le rendu) */
const FLOWERS = [
  ["nimbus-3000", "a single frosty pale-green CBD hemp flower bud, heavy white trichomes, airy"],
  ["ivory", "a single creamy ivory pale green-white CBD hemp flower bud, elegant"],
  ["velvet-kush", "a single dark deep-green CBD hemp flower bud with purple hints, dense"],
  ["pastraweed", "a single green CBD hemp flower bud with amber-orange pistils"],
  ["euphoria", "a single vivid bright-green CBD hemp flower bud with orange pistils"],
  ["purple", "a single deep violet purple CBD hemp flower bud, rich colour"],
  ["bloody-mary", "a single dark red-burgundy purple CBD hemp flower bud"],
  ["cosmic-cbg", "a single light golden-green CBG hemp flower bud, pale and luminous"],
  ["charlotte", "a single classic lush green CBD hemp flower bud"],
  ["rainbow", "a single colourful CBD hemp flower bud blending green purple and orange tones"],
  ["orange-bud", "a single bright orange CBD hemp flower bud, vivid amber pistils"],
  ["plutonium", "a single neon bright-green CBD hemp flower bud, glowing"],
  ["fanta-hazy", "a single hazy orange-green CBD hemp flower bud, sativa look"],
];

/* Scènes (hero + catégories) */
const SCENES = [
  ["hero", "a cinematic hero scene: a clear glass bell jar cloche containing a frosty green CBD hemp flower bud on a dark walnut base, surrounded by large tropical monstera and banana leaves painted in luminous emerald green with glowing electric cyan-blue halos, graffiti street-art botanical mural on a deep matte-black wall, dramatic rim lighting, luxurious moody premium cannabis boutique"],
  ["cat-fleurs", "a cluster of premium green CBD hemp flower buds with frosty trichomes, dark botanical background with soft cyan glow, macro, premium"],
  ["cat-resines", "pieces of golden-brown CBD hash resin stacked on dark slate, warm amber and cyan rim light, premium macro product shot"],
  ["cat-boostes", "a single glowing CBD hemp flower bud lit with intense electric cyan light, dramatic dark premium background, powerful"],
  ["cat-huiles", "elegant amber CBD oil dropper bottles with fresh green hemp leaves, dark premium background, warm soft light"],
  ["cat-accessoires", "a premium metal herb grinder and rolling accessories on dark walnut wood, moody cyan rim light, premium still life"],
];

async function generate(slug, subject) {
  const prompt = `Professional product photography of ${subject}, ${STYLE}`;
  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/ai/run/${MODEL}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, steps: 8 }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`HTTP ${res.status} — ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  const b64 = data?.result?.image;
  if (!b64) throw new Error("Réponse sans champ image");
  await writeFile(join(OUT, `${slug}.png`), Buffer.from(b64, "base64"));
}

(async () => {
  await mkdir(OUT, { recursive: true });
  const LIST = MODE === "scenes" ? SCENES : FLOWERS;
  console.log(`\n🌿 Génération de ${LIST.length} visuels (${MODE}, modèle ${MODEL})…\n`);
  let ok = 0;
  for (const [slug, subject] of LIST) {
    try {
      process.stdout.write(`  • ${slug} … `);
      await generate(slug, subject);
      console.log("✅");
      ok++;
    } catch (e) {
      console.log(`❌ ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 1200)); // throttle doux
  }
  console.log(`\n✨ Terminé : ${ok}/${LIST.length} images dans assets/${MODE === "scenes" ? "scenes" : "products"}/\n`);
})();
