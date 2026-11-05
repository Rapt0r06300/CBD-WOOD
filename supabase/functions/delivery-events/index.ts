import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { deliveryMessage, orderStatusForDelivery, validateDeliveryTransition } from "./core.mjs";

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const bearerToken = (request: Request) => {
  const header = request.headers.get("Authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
};

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const accessToken = bearerToken(request);
  const eventKey = (request.headers.get("Idempotency-Key") || "").trim();
  if (!supabaseUrl || !serviceRoleKey || !accessToken) return json({ error: "Non autorisé." }, 401);
  if (eventKey.length < 16 || eventKey.length > 120) return json({ error: "Clé d’idempotence requise." }, 400);

  const payload = await request.json().catch(() => ({}));
  const orderId = String(payload.order_id || "");
  const status = String(payload.status || "");
  if (!/^[0-9a-f-]{36}$/i.test(orderId)) return json({ error: "Commande invalide." }, 400);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return json({ error: "Session invalide." }, 401);
  const { data: owner } = await client.from("owner_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();
  if (!owner) return json({ error: "Accès propriétaire requis." }, 403);

  const { data: order, error: orderError } = await client
    .from("orders")
    .select("id, customer_email, fulfillment_mode, status")
    .eq("id", orderId)
    .maybeSingle();
  if (orderError || !order) return json({ error: "Commande introuvable." }, 404);
  if (order.fulfillment_mode !== "delivery") return json({ error: "La commande n’est pas une livraison." }, 422);

  const { data: latest } = await client.from("delivery_events")
    .select("status")
    .eq("order_id", orderId)
    .order("created_at", { ascending: false })
    .limit(1);
  const transition = validateDeliveryTransition({ current: latest?.[0]?.status || null, next: status });
  if (!transition.ok) return json({ error: transition.error }, 409);

  const message = deliveryMessage({
    status,
    note: payload.note,
    trackingReference: payload.tracking_reference,
  });
  const { data: event, error: eventError } = await client.from("delivery_events").insert({
    order_id: orderId,
    event_key: eventKey,
    status: message.status,
    note: message.note || null,
    tracking_reference: message.trackingReference || null,
    created_by: userData.user.id,
  }).select().single();
  if (eventError?.code === "23505") {
    const { data: existing } = await client.from("delivery_events")
      .select("*")
      .eq("order_id", orderId)
      .eq("event_key", eventKey)
      .maybeSingle();
    return json({ event: existing, idempotent: true });
  }
  if (eventError || !event) return json({ error: "Événement non enregistré." }, 503);

  const nextOrderStatus = orderStatusForDelivery(status, order.status);
  if (nextOrderStatus !== order.status) {
    const { error: updateError } = await client.from("orders").update({ status: nextOrderStatus }).eq("id", orderId);
    if (updateError) return json({ error: "Événement enregistré, mais commande à vérifier." }, 503);
  }
  if (order.customer_email) {
    await client.from("order_notification_outbox").upsert({
      order_id: orderId,
      notification_kind: "delivery_update",
      recipient_email: order.customer_email,
      template_key: "delivery_update",
      template_version: 1,
    }, { onConflict: "order_id,notification_kind" });
  }
  return json({ event, order_status: nextOrderStatus });
});
