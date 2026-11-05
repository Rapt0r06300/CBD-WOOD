import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u;
const EVENT_TYPES = new Set(["delivered", "permanent_bounce", "complaint"]);

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  const expectedToken = Deno.env.get("NEWSLETTER_PROVIDER_EVENTS_TOKEN");
  if (!expectedToken || request.headers.get("x-newsletter-provider-token") !== expectedToken) {
    return json({ error: "Non autorisé." }, 401);
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Service indisponible." }, 503);
  const payload = await request.json().catch(() => ({}));
  const providerEventId = String(payload.event_id || payload.id || "").trim();
  const eventType = String(payload.type || payload.event_type || "").trim().toLowerCase();
  const email = String(payload.email || payload.recipient || "").trim().toLowerCase();
  if (!providerEventId || providerEventId.length > 240 || !EVENT_TYPES.has(eventType) || !EMAIL_PATTERN.test(email)) {
    return json({ error: "Événement fournisseur invalide." }, 400);
  }
  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.rpc("process_newsletter_provider_event", {
    p_provider_event_id: providerEventId,
    p_event_type: eventType,
    p_email: email,
    p_source: "provider_webhook",
  });
  if (error) {
    console.error("Newsletter provider event rejected.");
    return json({ error: "Événement non traité." }, 422);
  }
  return json({ ok: true, duplicate: data === false });
});
