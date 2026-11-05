import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://woodcbd.fr",
  "https://www.woodcbd.fr",
  "https://rapt0r06300.github.io",
  "http://localhost:3000",
];

const json = (request: Request, body: Record<string, unknown>, status = 200) => {
  const origin = request.headers.get("Origin") || "";
  const configured = Deno.env.get("ALLOWED_ORIGINS")?.split(",").map((value) => value.trim()).filter(Boolean);
  const allowedOrigins = configured?.length ? configured : DEFAULT_ALLOWED_ORIGINS;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
  if (origin && allowedOrigins.includes(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return new Response(JSON.stringify(body), { status, headers });
};

const bearerToken = (request: Request) => {
  const header = request.headers.get("Authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return json(request, { ok: true });
  if (request.method !== "POST") return json(request, { error: "Méthode non autorisée." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const accessToken = bearerToken(request);
  if (!supabaseUrl || !serviceRoleKey || !accessToken) return json(request, { error: "Non autorisé." }, 401);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return json(request, { error: "Session invalide." }, 401);

  const { data: owner } = await client
    .from("owner_users")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (!owner) return json(request, { error: "Accès propriétaire requis." }, 403);

  const payload = await request.json().catch(() => ({}));
  const outboxId = String(payload?.outbox_id || "");
  if (!/^\d{1,18}$/.test(outboxId)) return json(request, { error: "Notification invalide." }, 400);

  const { data: job, error: jobError } = await client
    .from("order_notification_outbox")
    .select("id, status")
    .eq("id", Number(outboxId))
    .maybeSingle();
  if (jobError) return json(request, { error: "Notification indisponible." }, 503);
  if (!job) return json(request, { error: "Notification introuvable." }, 404);
  if (!['failed', 'dead_letter'].includes(job.status)) {
    return json(request, { error: "Cette notification n’a pas besoin d’être relancée." }, 409);
  }

  const { data: updated, error: updateError } = await client
    .from("order_notification_outbox")
    .update({
      status: "pending",
      available_at: new Date().toISOString(),
      processing_by: null,
      processing_until: null,
      last_error: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", Number(outboxId))
    .in("status", ["failed", "dead_letter"])
    .select("id, status")
    .maybeSingle();
  if (updateError || !updated) return json(request, { error: "La notification a changé d’état, recharge la page." }, 409);
  return json(request, { queued: true, notification_id: updated.id });
});
