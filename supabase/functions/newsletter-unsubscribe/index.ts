import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { hashToken, validateUnsubscribeToken } from "../newsletter/core.mjs";

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

Deno.serve(async (request) => {
  if (request.method !== "POST" && request.method !== "GET") return json({ error: "Méthode non autorisée." }, 405);
  const token = new URL(request.url).searchParams.get("token")
    || (request.method === "POST" ? String((await request.json().catch(() => ({}))).token || "") : "");

  // Always use the same public response for an invalid or unknown token.
  if (!validateUnsubscribeToken(token)) return json({ ok: true, message: "La demande a été prise en compte." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Service indisponible." }, 503);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await client
    .from("newsletter_subscribers")
    .update({
      consent_status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("unsubscribe_token_hash", await hashToken(token));
  if (error) {
    console.error("Newsletter unsubscribe persistence failed.");
    return json({ error: "Service indisponible." }, 503);
  }
  return json({ ok: true, message: "La demande a été prise en compte." });
});
