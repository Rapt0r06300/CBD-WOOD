import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { buildOrderEmailMessage } from "./message.mjs";
import { refreshGmailAccessToken, sendGmailRawMessage } from "./gmail.mjs";
import { processEmailJob } from "./worker-core.mjs";

const MAX_BATCH_SIZE = 20;
const DOCUMENT_BUCKET = "order-documents";

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const requiredSecrets = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "EMAIL_WORKER_TOKEN",
  "GMAIL_CLIENT_ID",
  "GMAIL_CLIENT_SECRET",
  "GMAIL_REFRESH_TOKEN",
  "GMAIL_FROM",
] as const;

const hasRequiredSecrets = () => requiredSecrets.every((name) => Boolean(Deno.env.get(name)));

const configuredBatchSize = () => Math.max(
  1,
  Math.min(MAX_BATCH_SIZE, Number(Deno.env.get("EMAIL_WORKER_BATCH_SIZE") || 10)),
);

const orderMessage = async (client: ReturnType<typeof createClient>, job: Record<string, unknown>) => {
  const notificationKind = String(job.notification_kind);
  if (!["order_created", "owner_order_alert", "payment_confirmed", "invoice_ready", "delivery_update", "order_cancelled", "refund_confirmed"].includes(notificationKind)) {
    throw new Error("Notification kind is not implemented");
  }

  const { data: order, error: orderError } = await client
    .from("orders")
    .select("order_number, customer_name, customer_email, status, payment_status, total_cents, delivery_address")
    .eq("id", job.order_id)
    .single();
  if (orderError || !order) throw new Error("Order could not be loaded");

  const { data: items, error: itemError } = await client
    .from("order_items")
    .select("product_name, grams, quantity, line_total_cents")
    .eq("order_id", job.order_id)
    .order("id", { ascending: true });
  if (itemError || !items?.length) throw new Error("Order items could not be loaded");

  let deliveryEvent = null;
  if (notificationKind === "delivery_update") {
    const { data: deliveryEvents, error: deliveryError } = await client
      .from("delivery_events")
      .select("status, note, tracking_reference")
      .eq("order_id", job.order_id)
      .order("created_at", { ascending: false })
      .limit(1);
    if (deliveryError || !deliveryEvents?.[0]) throw new Error("Delivery event could not be loaded");
    deliveryEvent = {
      status: deliveryEvents[0].status,
      note: deliveryEvents[0].note || "",
      trackingReference: deliveryEvents[0].tracking_reference || "",
    };
  }

  const message = buildOrderEmailMessage({
    order,
    items,
    kind: notificationKind,
    deliveryEvent,
    from: Deno.env.get("GMAIL_FROM"),
  });

  const documentKind = notificationKind === "order_created"
    ? "order_confirmation"
    : notificationKind === "payment_confirmed"
      ? "payment_receipt"
      : notificationKind === "invoice_ready"
        ? String(job.template_key || "invoice")
        : null;
  if (!documentKind || !["order_confirmation", "payment_receipt", "invoice"].includes(documentKind)) return message;

  const { data: document, error: documentError } = await client
    .from("invoice_documents")
    .select("document_number, storage_path, status")
    .eq("order_id", job.order_id)
    .eq("document_kind", documentKind)
    .eq("status", "ready")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (documentError || !document) throw new Error("Ready order document could not be loaded");

  const { data: pdf, error: downloadError } = await client.storage
    .from(DOCUMENT_BUCKET)
    .download(document.storage_path);
  if (downloadError || !pdf) throw new Error("Order document could not be downloaded");

  return {
    ...message,
    attachment: {
      filename: `${document.document_number}.pdf`,
      contentType: "application/pdf",
      content: new Uint8Array(await pdf.arrayBuffer()),
    },
  };
};

const workerError = (request: Request) => {
  const expected = Deno.env.get("EMAIL_WORKER_TOKEN");
  const received = request.headers.get("x-email-worker-token");
  return !expected || !received || received !== expected;
};

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (workerError(request)) return json({ error: "Unauthorized" }, 401);
  if (!hasRequiredSecrets()) return json({ error: "Worker is not configured" }, 503);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const workerId = crypto.randomUUID();

  let accessToken: string;
  try {
    const token = await refreshGmailAccessToken({
      clientId: Deno.env.get("GMAIL_CLIENT_ID")!,
      clientSecret: Deno.env.get("GMAIL_CLIENT_SECRET")!,
      refreshToken: Deno.env.get("GMAIL_REFRESH_TOKEN")!,
    });
    accessToken = token.accessToken;
  } catch {
    console.error(`[${workerId}] Could not refresh Gmail token.`);
    return json({ error: "Gmail authorization is unavailable" }, 503);
  }

  const { data: jobs, error: claimError } = await client.rpc("claim_order_notification_jobs", {
    p_worker_id: workerId,
    p_limit: configuredBatchSize(),
    p_lease_seconds: 300,
  });
  if (claimError) {
    console.error(`[${workerId}] Could not claim email jobs.`);
    return json({ error: "Could not claim jobs" }, 503);
  }

  const results = [];
  for (const job of jobs || []) {
    const result = await processEmailJob(job, {
      loadMessage: () => orderMessage(client, job),
      sendMessage: (rawMessage: string) => sendGmailRawMessage({ accessToken, rawMessage }),
      recordAttempt: async (attempt: Record<string, unknown>) => {
        const { error } = await client.from("email_delivery_attempts").insert({
          outbox_id: attempt.outboxId,
          provider: attempt.provider,
          attempt_number: attempt.attemptNumber,
          status: attempt.status,
          provider_message_id: attempt.providerMessageId || null,
          response_code: attempt.responseCode || null,
          error_code: attempt.errorCode || null,
          error_message: attempt.errorMessage || null,
        });
        if (error) throw new Error("Could not record email attempt");
      },
      markSent: async (sent: Record<string, unknown>) => {
        const { error } = await client
          .from("order_notification_outbox")
          .update({
            status: "sent",
            provider_message_id: sent.providerMessageId,
            sent_at: sent.sentAt,
            processing_by: null,
            processing_until: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", sent.outboxId)
          .eq("processing_by", workerId);
        if (error) throw new Error("Could not mark email sent");
      },
      markFailed: async (failed: Record<string, unknown>) => {
        const { error } = await client
          .from("order_notification_outbox")
          .update({
            status: failed.status,
            available_at: failed.availableAt || new Date().toISOString(),
            last_error: failed.lastError,
            processing_by: null,
            processing_until: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", failed.outboxId)
          .eq("processing_by", workerId);
        if (error) throw new Error("Could not mark email failed");
      },
    });
    results.push({ id: job.id, status: result.status });
  }

  return json({ worker_id: workerId, processed: results.length, results });
});
