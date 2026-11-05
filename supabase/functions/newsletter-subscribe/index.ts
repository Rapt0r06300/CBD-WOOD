import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { createSignedUnsubscribeToken, hashToken, validateSubscription } from "../newsletter/core.mjs";

const ALLOWED_ORIGINS = new Set([
  "https://woodcbd.fr",
  "https://www.woodcbd.fr",
  "https://rapt0r06300.github.io",
  "http://localhost:3000",
]);

const headersFor = (request: Request) => {
  const origin = request.headers.get("Origin") || "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
};

const json = (request: Request, body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    ...headersFor(request),
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  },
});

Deno.serve(async (request) => {
  const origin = request.headers.get("Origin") || "";
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json(request, { error: "Origine non autorisée." }, 403);
  if (request.method === "OPTIONS") return new Response("ok", { headers: headersFor(request) });
  if (request.method !== "POST") return json(request, { error: "Méthode non autorisée." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const unsubscribeSecret = Deno.env.get("NEWSLETTER_UNSUBSCRIBE_SECRET");
  if (!supabaseUrl || !serviceRoleKey || !unsubscribeSecret || unsubscribeSecret.length < 32) return json(request, { error: "Service indisponible." }, 503);

  const payload = await request.json().catch(() => null);
  const validation = validateSubscription(payload);
  if (!validation.ok) return json(request, { error: validation.error }, 400);

  const now = new Date().toISOString();
  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: subscriber, error } = await client.from("newsletter_subscribers").upsert({
    normalized_email: validation.value.email,
    consent_status: "subscribed",
    consent_source: validation.value.source,
    consent_text_version: validation.value.consentTextVersion,
    consented_at: now,
    confirmed_at: now,
    unsubscribed_at: null,
    suppression_reason: null,
    updated_at: now,
  }, { onConflict: "normalized_email" }).select("id").single();
  if (error || !subscriber) {
    console.error("Newsletter subscription persistence failed.");
    return json(request, { error: "Inscription momentanément indisponible." }, 503);
  }

  const unsubscribeToken = await createSignedUnsubscribeToken({ subscriberId: subscriber.id, secret: unsubscribeSecret });
  const unsubscribeTokenHash = await hashToken(unsubscribeToken);
  const { error: tokenError } = await client.from("newsletter_subscribers")
    .update({ unsubscribe_token_hash: unsubscribeTokenHash, updated_at: now })
    .eq("id", subscriber.id);
  if (tokenError) return json(request, { error: "Inscription momentanément indisponible." }, 503);

  // The raw token is intentionally not returned or stored. Campaigns recreate a
  // signed, expiring link server-side and the database stores only its hash.
  return json(request, { ok: true, message: "Inscription enregistrée." });
});
