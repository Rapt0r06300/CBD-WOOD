import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { encodeGmailRawMessage, buildMimeMessage } from "../email-worker/core.mjs";
import { refreshGmailAccessToken, sendGmailRawMessage } from "../email-worker/gmail.mjs";
import { buildNewsletterMessage } from "../newsletter-campaign/core.mjs";

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u;

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const bearerToken = (request: Request) => {
  const header = request.headers.get("Authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
};

const validId = (value: unknown) => /^[0-9a-f-]{36}$/iu.test(String(value || ""));
const normalizeEmail = (value: unknown) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return EMAIL_PATTERN.test(normalized) ? normalized : null;
};
const safeError = (error: unknown) => String((error as { message?: unknown })?.message || "Envoi de test impossible")
  .replace(/(refresh[_ -]?token|client[_ -]?secret|service[_ -]?role|access[_ -]?token)\s*[:=]\s*[^\s,;]+/giu, "$1=[redacted]");

const requiredSecrets = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEWSLETTER_UNSUBSCRIBE_SECRET",
  "NEWSLETTER_UNSUBSCRIBE_URL",
  "GMAIL_CLIENT_ID",
  "GMAIL_CLIENT_SECRET",
  "GMAIL_REFRESH_TOKEN",
  "GMAIL_FROM",
  "NEWSLETTER_TEST_RECIPIENT",
] as const;

const hasConfiguration = () => requiredSecrets.every((name) => Boolean(Deno.env.get(name)))
  && (Deno.env.get("NEWSLETTER_UNSUBSCRIBE_SECRET") || "").length >= 32;

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  if (Deno.env.get("NEWSLETTER_CAN_SEND") !== "true") {
    return json({ error: "Les envois restent désactivés tant que Gmail n’est pas configuré et validé." }, 409);
  }
  const accessToken = bearerToken(request);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!accessToken || !supabaseUrl || !serviceRoleKey) return json({ error: "Non autorisé." }, 401);
  if (!hasConfiguration()) return json({ error: "Le test d’envoi n’est pas configuré côté serveur." }, 503);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return json({ error: "Session invalide." }, 401);
  const { data: owner } = await client.from("owner_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();
  if (!owner) return json({ error: "Accès propriétaire requis." }, 403);

  const payload = await request.json().catch(() => ({}));
  const campaignId = String(payload.campaign_id || "");
  if (!validId(campaignId)) return json({ error: "Campagne invalide." }, 400);

  try {
    const testEmail = normalizeEmail(Deno.env.get("NEWSLETTER_TEST_RECIPIENT"));
    if (!testEmail) return json({ error: "L’adresse de test serveur est invalide." }, 503);
    const { data: campaign, error: campaignError } = await client.from("newsletter_campaigns")
      .select("id, subject, template_key, template_version, status")
      .eq("id", campaignId)
      .maybeSingle();
    if (campaignError || !campaign) return json({ error: "Campagne introuvable." }, 404);
    if (campaign.status === "cancelled") return json({ error: "Une campagne annulée ne peut pas être testée." }, 409);

    const { data: template, error: templateError } = await client.from("email_templates")
      .select("subject, text_body, html_body, version")
      .eq("template_key", campaign.template_key)
      .eq("locale", "fr-FR")
      .eq("version", campaign.template_version)
      .maybeSingle();
    if (templateError || !template) return json({ error: "Modèle newsletter introuvable." }, 404);

    const { data: existingSubscriber, error: subscriberError } = await client.from("newsletter_subscribers")
      .select("id, is_test, consent_status")
      .eq("normalized_email", testEmail)
      .maybeSingle();
    if (subscriberError) throw new Error("Destinataire de test indisponible.");
    if (existingSubscriber && existingSubscriber.is_test !== true) {
      return json({ error: "L’adresse de test configurée appartient déjà à l’audience réelle ; utilise une adresse dédiée." }, 409);
    }

    let subscriberId = existingSubscriber?.id;
    if (!subscriberId) {
      const { data: createdSubscriber, error: createSubscriberError } = await client.from("newsletter_subscribers")
        .insert({
          normalized_email: testEmail,
          consent_status: "subscribed",
          consent_source: "owner_test_send",
          consent_text_version: "test",
          consented_at: new Date().toISOString(),
          confirmed_at: new Date().toISOString(),
          is_test: true,
        })
        .select("id")
        .single();
      if (createSubscriberError || !createdSubscriber) throw new Error("Destinataire de test non enregistré.");
      subscriberId = createdSubscriber.id;
    } else if (existingSubscriber?.consent_status !== "subscribed") {
      const { error: updateError } = await client.from("newsletter_subscribers").update({
        consent_status: "subscribed",
        consent_source: "owner_test_send",
        consent_text_version: "test",
        consented_at: new Date().toISOString(),
        confirmed_at: new Date().toISOString(),
        unsubscribed_at: null,
        suppression_reason: null,
        updated_at: new Date().toISOString(),
      }).eq("id", subscriberId).eq("is_test", true);
      if (updateError) throw new Error("Destinataire de test non réactivé.");
    }

    const newsletter = await buildNewsletterMessage({
      campaign: { subject: campaign.subject || template.subject },
      subscriber: { id: subscriberId, normalized_email: testEmail },
      textBody: template.text_body,
      htmlBody: template.html_body,
      from: Deno.env.get("GMAIL_FROM")!,
      unsubscribeUrl: Deno.env.get("NEWSLETTER_UNSUBSCRIBE_URL")!,
      unsubscribeSecret: Deno.env.get("NEWSLETTER_UNSUBSCRIBE_SECRET")!,
    });
    const rawMessage = encodeGmailRawMessage(buildMimeMessage({
      from: newsletter.from,
      to: newsletter.to,
      subject: newsletter.subject,
      text: newsletter.text,
      html: newsletter.html,
    }));
    const gmailToken = await refreshGmailAccessToken({
      clientId: Deno.env.get("GMAIL_CLIENT_ID")!,
      clientSecret: Deno.env.get("GMAIL_CLIENT_SECRET")!,
      refreshToken: Deno.env.get("GMAIL_REFRESH_TOKEN")!,
    });
    const sent = await sendGmailRawMessage({ accessToken: gmailToken.accessToken, rawMessage });
    const { error: actionError } = await client.from("newsletter_campaign_actions").insert({
      campaign_id: campaign.id,
      actor_id: userData.user.id,
      action: "test_send",
      from_status: campaign.status,
      to_status: campaign.status,
    });
    if (actionError) throw new Error("Envoi réalisé mais journalisation impossible.");
    return json({ ok: true, action: "test_send", provider_message_id: sent.id });
  } catch (error) {
    return json({ error: safeError(error) }, 422);
  }
});
