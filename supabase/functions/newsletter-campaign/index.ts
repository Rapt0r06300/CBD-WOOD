import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { encodeGmailRawMessage, buildMimeMessage } from "../email-worker/core.mjs";
import { refreshGmailAccessToken, sendGmailRawMessage } from "../email-worker/gmail.mjs";
import { buildNewsletterMessage, deliveryOutcome } from "./core.mjs";

const MAX_BATCH_SIZE = 25;
const requiredSecrets = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEWSLETTER_WORKER_TOKEN",
  "NEWSLETTER_UNSUBSCRIBE_SECRET",
  "NEWSLETTER_UNSUBSCRIBE_URL",
  "GMAIL_CLIENT_ID",
  "GMAIL_CLIENT_SECRET",
  "GMAIL_REFRESH_TOKEN",
  "GMAIL_FROM",
] as const;

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const configuredBatchSize = () => Math.max(1, Math.min(MAX_BATCH_SIZE, Number(Deno.env.get("NEWSLETTER_WORKER_BATCH_SIZE") || 10)));
const safeError = (error: unknown) => String((error as { message?: unknown })?.message || "Erreur d’envoi").replace(/(refresh[_ -]?token|client[_ -]?secret|service[_ -]?role|access[_ -]?token)\s*[:=]\s*[^\s,;]+/giu, "$1=[redacted]");
const hasSecrets = () => requiredSecrets.every((name) => Boolean(Deno.env.get(name)))
  && (Deno.env.get("NEWSLETTER_UNSUBSCRIBE_SECRET") || "").length >= 32;

const updateDelivery = async (client: ReturnType<typeof createClient>, id: number, workerId: string, values: Record<string, unknown>) => {
  const { error } = await client.from("newsletter_deliveries").update({
    ...values,
    processing_by: null,
    processing_until: null,
    updated_at: new Date().toISOString(),
  }).eq("id", id).eq("processing_by", workerId);
  if (error) throw new Error("Newsletter delivery state could not be updated");
};

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  if (request.headers.get("x-newsletter-worker-token") !== Deno.env.get("NEWSLETTER_WORKER_TOKEN")) return json({ error: "Non autorisé." }, 401);
  if (!hasSecrets()) return json({ error: "Worker newsletter non configuré." }, 503);

  const payload = await request.json().catch(() => ({}));
  const campaignId = String(payload.campaign_id || "");
  if (!/^[0-9a-f-]{36}$/i.test(campaignId)) return json({ error: "Campagne invalide." }, 400);

  const client = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: campaign, error: campaignError } = await client.from("newsletter_campaigns")
    .select("id, subject, template_key, template_version, status")
    .eq("id", campaignId)
    .maybeSingle();
  if (campaignError || !campaign) return json({ error: "Campagne introuvable." }, 404);
  if (campaign.status !== "sending") return json({ error: "La campagne doit être en envoi." }, 409);
  await client.rpc("populate_newsletter_campaign", { p_campaign_id: campaignId });

  let accessToken: string;
  try {
    const token = await refreshGmailAccessToken({
      clientId: Deno.env.get("GMAIL_CLIENT_ID")!,
      clientSecret: Deno.env.get("GMAIL_CLIENT_SECRET")!,
      refreshToken: Deno.env.get("GMAIL_REFRESH_TOKEN")!,
    });
    accessToken = token.accessToken;
  } catch {
    return json({ error: "Autorisation Gmail indisponible." }, 503);
  }

  const workerId = crypto.randomUUID();
  const { data: deliveries, error: claimError } = await client.rpc("claim_newsletter_deliveries", {
    p_worker_id: workerId,
    p_limit: configuredBatchSize(),
    p_lease_seconds: 300,
  });
  if (claimError) return json({ error: "Impossible de réserver le lot newsletter." }, 503);

  const results: Array<Record<string, unknown>> = [];
  for (const delivery of deliveries || []) {
    let outcome: { status: string; availableAt: Date | null };
    let providerMessageId: string | null = null;
    let errorMessage: string | null = null;
    try {
      const { data: subscriber } = await client.from("newsletter_subscribers")
        .select("id, normalized_email, consent_status, is_test")
        .eq("id", delivery.subscriber_id)
        .maybeSingle();
      if (!subscriber || subscriber.consent_status !== "subscribed" || subscriber.is_test === true) {
        outcome = { status: "unsubscribed", availableAt: null };
      } else {
        const { data: template, error: templateError } = await client.from("email_templates")
          .select("text_body, html_body")
          .eq("template_key", campaign.template_key)
          .eq("version", campaign.template_version)
          .eq("locale", "fr-FR")
          .eq("active", true)
          .maybeSingle();
        if (templateError || !template) throw new Error("Newsletter template unavailable");
        const message = await buildNewsletterMessage({
          campaign,
          subscriber,
          textBody: template.text_body,
          htmlBody: template.html_body,
          from: Deno.env.get("GMAIL_FROM"),
          unsubscribeUrl: Deno.env.get("NEWSLETTER_UNSUBSCRIBE_URL"),
          unsubscribeSecret: Deno.env.get("NEWSLETTER_UNSUBSCRIBE_SECRET"),
        });
        const raw = buildMimeMessage(message);
        const provider = await sendGmailRawMessage({ accessToken, rawMessage: encodeGmailRawMessage(raw) });
        providerMessageId = provider.id;
        outcome = { status: "accepted", availableAt: null };
      }
    } catch (error) {
      errorMessage = safeError(error);
      outcome = deliveryOutcome({ error, attempts: delivery.attempts });
    }
    await client.from("newsletter_delivery_attempts").insert({
      delivery_id: delivery.id,
      attempt_number: delivery.attempts,
      status: outcome.status,
      provider: "gmail",
      provider_message_id: providerMessageId,
      error_message: errorMessage,
    });
    await updateDelivery(client, delivery.id, workerId, {
      status: outcome.status,
      provider_message_id: providerMessageId,
      available_at: outcome.availableAt?.toISOString() || new Date().toISOString(),
      last_error: errorMessage,
      sent_at: outcome.status === "accepted" ? new Date().toISOString() : null,
    });
    results.push({ id: delivery.id, status: outcome.status });
  }

  const { count } = await client.from("newsletter_deliveries")
    .select("id", { count: "exact", head: true })
    .eq("campaign_id", campaignId)
    .in("status", ["pending", "processing", "deferred"]);
  if (!count) await client.from("newsletter_campaigns").update({ status: "sent", completed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", campaignId).eq("status", "sending");
  return json({ campaign_id: campaignId, processed: results.length, results });
});
