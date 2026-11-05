import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { campaignTransition, normalizeCampaignDraft, renderPlainTextHtml } from "./core.mjs";

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const bearerToken = (request: Request) => {
  const header = request.headers.get("Authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
};

const validId = (value: unknown) => /^[0-9a-f-]{36}$/i.test(String(value || ""));

const recordAction = async (client: ReturnType<typeof createClient>, values: Record<string, unknown>) => {
  const { error } = await client.from("newsletter_campaign_actions").insert(values);
  if (error) throw new Error("Action de campagne non journalisée.");
};

const loadCampaign = async (client: ReturnType<typeof createClient>, campaignId: string) => {
  const { data, error } = await client.from("newsletter_campaigns")
    .select("id, name, subject, template_key, template_version, status, scheduled_at, started_at, completed_at, created_at, updated_at")
    .eq("id", campaignId)
    .maybeSingle();
  if (error || !data) throw new Error("Campagne introuvable.");
  return data;
};

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const accessToken = bearerToken(request);
  if (!supabaseUrl || !serviceRoleKey || !accessToken) return json({ error: "Non autorisé." }, 401);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return json({ error: "Session invalide." }, 401);
  const { data: owner } = await client.from("owner_users").select("user_id").eq("user_id", userData.user.id).maybeSingle();
  if (!owner) return json({ error: "Accès propriétaire requis." }, 403);

  const payload = await request.json().catch(() => ({}));
  const action = String(payload.action || "");
  try {
    if (action === "list") {
      const { data: campaigns, error } = await client.from("newsletter_campaigns")
        .select("id, name, subject, template_key, template_version, status, scheduled_at, started_at, completed_at, created_at, updated_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw new Error("Campagnes indisponibles.");
      const ids = (campaigns || []).map((campaign) => campaign.id);
      const { data: deliveries } = ids.length
        ? await client.from("newsletter_deliveries").select("campaign_id, status, subscriber:newsletter_subscribers!inner(is_test)").in("campaign_id", ids)
        : { data: [] };
      const counts = new Map<string, Record<string, number>>();
      for (const delivery of deliveries || []) {
        if (delivery.subscriber?.is_test === true) continue;
        const row = counts.get(delivery.campaign_id) || {};
        row[delivery.status] = (row[delivery.status] || 0) + 1;
        counts.set(delivery.campaign_id, row);
      }
      return json({ campaigns: (campaigns || []).map((campaign) => ({ ...campaign, counts: counts.get(campaign.id) || {} })) });
    }

    if (action === "create_draft") {
      const draft = normalizeCampaignDraft(payload);
      const { data: latest } = await client.from("email_templates")
        .select("version")
        .eq("template_key", draft.templateKey)
        .eq("locale", "fr-FR")
        .order("version", { ascending: false })
        .limit(1)
        .maybeSingle();
      const version = Number(latest?.version || 0) + 1;
      const { error: templateError } = await client.from("email_templates").insert({
        template_key: draft.templateKey,
        locale: "fr-FR",
        version,
        subject: draft.subject,
        text_body: draft.textBody,
        html_body: renderPlainTextHtml(draft.textBody),
        active: false,
        created_by: userData.user.id,
      });
      if (templateError) throw new Error("Modèle de campagne non enregistré.");
      const { data: campaign, error: campaignError } = await client.from("newsletter_campaigns").insert({
        name: draft.name,
        subject: draft.subject,
        template_key: draft.templateKey,
        template_version: version,
        status: draft.scheduledAt ? "scheduled" : "draft",
        scheduled_at: draft.scheduledAt,
        created_by: userData.user.id,
      }).select("id, name, subject, template_key, template_version, status, created_at").single();
      if (campaignError || !campaign) throw new Error("Brouillon non enregistré.");
      await recordAction(client, { campaign_id: campaign.id, actor_id: userData.user.id, action: "create_draft", from_status: null, to_status: campaign.status });
      return json({ campaign });
    }

    if (!validId(payload.campaign_id)) return json({ error: "Campagne invalide." }, 400);
    const campaign = await loadCampaign(client, String(payload.campaign_id));

    if (action === "preview") {
      const { data: template, error } = await client.from("email_templates")
        .select("subject, text_body, html_body, version")
        .eq("template_key", campaign.template_key)
        .eq("locale", "fr-FR")
        .eq("version", campaign.template_version)
        .maybeSingle();
      if (error || !template) return json({ error: "Aperçu indisponible." }, 404);
      await recordAction(client, { campaign_id: campaign.id, actor_id: userData.user.id, action: "preview", from_status: campaign.status, to_status: campaign.status });
      return json({ campaign, template });
    }

    if (action === "simulate") {
      const { count, error } = await client.from("newsletter_subscribers")
        .select("id", { count: "exact", head: true })
        .eq("consent_status", "subscribed")
        .eq("is_test", false);
      if (error) throw new Error("Audience newsletter indisponible.");
      await recordAction(client, { campaign_id: campaign.id, actor_id: userData.user.id, action: "simulate", from_status: campaign.status, to_status: campaign.status });
      return json({ campaign, simulation: { subscribed: count || 0 } });
    }

    if (!(action === "start" || action === "pause" || action === "resume" || action === "cancel")) return json({ error: "Action de campagne inconnue." }, 400);
    if (action === "start" && Deno.env.get("NEWSLETTER_CAN_SEND") !== "true") {
      return json({ error: "L’envoi newsletter reste désactivé tant que Gmail n’est pas configuré et validé." }, 409);
    }
    const transition = action === "start"
      ? campaignTransition(campaign.status, "start")
      : campaignTransition(campaign.status, action);
    if (!transition.ok) return json({ error: transition.error }, 409);
    const { error: updateError } = await client.from("newsletter_campaigns").update({
      status: transition.next,
      started_at: transition.next === "sending" ? new Date().toISOString() : campaign.started_at,
      updated_at: new Date().toISOString(),
    }).eq("id", campaign.id).eq("status", campaign.status);
    if (updateError?.code === "23505") return json({ error: "Une campagne active utilise déjà cette version du modèle." }, 409);
    if (updateError) throw new Error("État de campagne non mis à jour.");
    await recordAction(client, { campaign_id: campaign.id, actor_id: userData.user.id, action, from_status: campaign.status, to_status: transition.next });
    return json({ campaign: { ...campaign, status: transition.next } });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Action impossible." }, 422);
  }
});
