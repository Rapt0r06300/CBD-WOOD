import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { buildDocumentModel } from "./data.mjs";

const PDF_BUCKET = "order-documents";
const DOCUMENT_KINDS = new Set(["order_confirmation", "payment_receipt", "invoice"]);
const MAX_ATTEMPTS = 5;

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const money = (cents: number) => new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format(cents / 100);

const makePdf = async (model: ReturnType<typeof buildDocumentModel>) => {
  const { PDFDocument, StandardFonts, rgb } = await import("https://esm.sh/pdf-lib@1.17.1");
  const document = await PDFDocument.create();
  const page = document.addPage([595.28, 841.89]);
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.06, 0.11, 0.08);
  const lime = rgb(0.72, 0.94, 0.43);
  page.drawRectangle({ x: 0, y: 760, width: 595.28, height: 81.89, color: ink });
  page.drawText("WOOD.", { x: 42, y: 795, size: 25, font: bold, color: lime });
  page.drawText("CBD / NICE", { x: 43, y: 778, size: 9, font: bold, color: rgb(0.9, 0.96, 0.84) });
  page.drawText(model.title, { x: 42, y: 710, size: 19, font: bold, color: ink });
  page.drawText(`Document : ${model.documentNumber}`, { x: 42, y: 687, size: 10, font: regular, color: ink });
  page.drawText(`Client : ${model.customerName}`, { x: 42, y: 670, size: 10, font: regular, color: ink });
  page.drawText(`E-mail : ${model.customerEmail}`, { x: 42, y: 653, size: 10, font: regular, color: ink });
  page.drawText(`Livraison : ${model.deliveryAddress}`, { x: 42, y: 636, size: 10, font: regular, color: ink, maxWidth: 510 });
  let y = 590;
  page.drawText("Article", { x: 42, y, size: 10, font: bold, color: ink });
  page.drawText("Grammage", { x: 330, y, size: 10, font: bold, color: ink });
  page.drawText("Total", { x: 480, y, size: 10, font: bold, color: ink });
  y -= 18;
  for (const line of model.lines) {
    page.drawText(`${line.quantity} × ${line.label}`, { x: 42, y, size: 10, font: regular, color: ink, maxWidth: 270 });
    page.drawText(`${line.grams} g`, { x: 330, y, size: 10, font: regular, color: ink });
    page.drawText(money(line.lineTotalCents), { x: 480, y, size: 10, font: regular, color: ink });
    y -= 20;
  }
  page.drawLine({ start: { x: 42, y: y - 5 }, end: { x: 553, y: y - 5 }, thickness: 0.7, color: ink });
  page.drawText("Total", { x: 390, y: y - 31, size: 12, font: bold, color: ink });
  page.drawText(money(model.totalCents), { x: 480, y: y - 31, size: 12, font: bold, color: ink });
  page.drawText("WOOD — CBD / Nice", { x: 42, y: 54, size: 9, font: regular, color: ink });
  return document.save();
};

const sha256 = async (content: Uint8Array) => {
  const digest = await crypto.subtle.digest("SHA-256", content);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const documentNumber = (orderNumber: string, kind: string) => {
  const suffix = kind === "payment_receipt" ? "-R" : kind === "invoice" ? "-F" : "-C";
  return `${orderNumber}${suffix}`.replace(/[^A-Za-z0-9_-]/g, "-");
};

const enqueueInvoiceNotification = async (
  client: ReturnType<typeof createClient>,
  orderId: string,
  email: string,
) => {
  const { error } = await client.from("order_notification_outbox").upsert({
    order_id: orderId,
    notification_kind: "invoice_ready",
    recipient_email: email,
    template_key: "invoice",
    template_version: 1,
  }, { onConflict: "order_id,notification_kind" });
  if (error) throw new Error("Document notification could not be queued");
};

const generateDocument = async (
  client: ReturnType<typeof createClient>,
  orderId: string,
  kind: string,
) => {
  const { data: order, error: orderError } = await client.from("orders")
    .select("id, order_number, customer_name, customer_email, payment_status, total_cents, delivery_address")
    .eq("id", orderId)
    .single();
  if (orderError || !order) throw new Error("Commande introuvable.");
  if (kind === "payment_receipt" && order.payment_status !== "paid") {
    throw new Error("Le paiement doit être confirmé avant le reçu.");
  }

  const { data: items, error: itemError } = await client.from("order_items")
    .select("product_name, quantity, grams, unit_price_cents, line_total_cents")
    .eq("order_id", orderId)
    .order("id", { ascending: true });
  if (itemError || !items?.length) throw new Error("Articles introuvables.");

  const legal = kind === "invoice" ? {
    name: Deno.env.get("LEGAL_ENTITY_NAME"),
    address: Deno.env.get("LEGAL_ENTITY_ADDRESS"),
  } : null;
  const model = buildDocumentModel({ order, items, kind, legal });
  const number = documentNumber(order.order_number, kind);
  const { data: existing } = await client.from("invoice_documents")
    .select("id, storage_path, sha256, status, document_number")
    .eq("order_id", orderId)
    .eq("document_kind", kind)
    .maybeSingle();
  if (existing?.status === "ready") {
    if (kind === "invoice") await enqueueInvoiceNotification(client, orderId, order.customer_email);
    return existing;
  }

  const content = await makePdf({ ...model, documentNumber: number });
  const hash = await sha256(content);
  const path = `orders/${orderId}/${number}.pdf`;
  const { error: uploadError } = await client.storage.from(PDF_BUCKET).upload(path, content, {
    contentType: "application/pdf",
    cacheControl: "3600",
    upsert: true,
  });
  if (uploadError) throw new Error("Document non enregistré.");

  const now = new Date().toISOString();
  const { data: document, error: documentError } = await client.from("invoice_documents").upsert({
    order_id: orderId,
    document_kind: kind,
    document_number: number,
    storage_path: path,
    sha256: hash,
    status: "ready",
    generated_at: now,
    issued_at: kind === "payment_receipt" || kind === "invoice" ? now : null,
  }, { onConflict: "order_id,document_kind" }).select("id, storage_path, sha256, status, document_number").single();
  if (documentError || !document) throw new Error("Document non enregistré.");

  if (kind === "invoice") await enqueueInvoiceNotification(client, orderId, order.customer_email);
  return document;
};

const markDocumentJob = async (
  client: ReturnType<typeof createClient>,
  jobId: number,
  workerId: string,
  update: Record<string, unknown>,
) => {
  const { error } = await client.from("document_generation_jobs")
    .update({ ...update, processing_by: null, processing_until: null, updated_at: new Date().toISOString() })
    .eq("id", jobId)
    .eq("processing_by", workerId);
  if (error) throw new Error("Document job state could not be updated");
};

const processBatch = async (client: ReturnType<typeof createClient>) => {
  const workerId = crypto.randomUUID();
  const { data: jobs, error } = await client.rpc("claim_document_generation_jobs", {
    p_worker_id: workerId,
    p_limit: 10,
    p_lease_seconds: 300,
  });
  if (error) throw new Error("Impossible de réserver les documents.");

  const results = [];
  for (const job of jobs || []) {
    try {
      await generateDocument(client, job.order_id, job.document_kind);
      await markDocumentJob(client, job.id, workerId, { status: "ready", last_error: null });
      results.push({ id: job.id, status: "ready" });
    } catch (error) {
      const attempts = Number(job.attempts || 0);
      const terminal = attempts >= MAX_ATTEMPTS;
      const message = error instanceof Error ? error.message.slice(0, 500) : "Document non généré.";
      await markDocumentJob(client, job.id, workerId, {
        status: terminal ? "dead_letter" : "pending",
        available_at: terminal ? new Date().toISOString() : new Date(Date.now() + 60_000).toISOString(),
        last_error: message,
      });
      results.push({ id: job.id, status: terminal ? "dead_letter" : "retry" });
    }
  }
  return { worker_id: workerId, processed: results.length, results };
};

Deno.serve(async (request) => {
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  const expectedToken = Deno.env.get("DOCUMENT_WORKER_TOKEN");
  if (!expectedToken || request.headers.get("x-document-worker-token") !== expectedToken) {
    return json({ error: "Non autorisé." }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Service indisponible." }, 503);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const payload = await request.json().catch(() => ({}));
  if (payload.batch === true) {
    try {
      return json(await processBatch(client));
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Service indisponible." }, 503);
    }
  }

  const kind = String(payload.document_kind || "order_confirmation");
  const orderId = String(payload.order_id || "");
  if (!DOCUMENT_KINDS.has(kind) || !/^[0-9a-f-]{36}$/i.test(orderId)) {
    return json({ error: "Document invalide." }, 400);
  }

  try {
    const document = await generateDocument(client, orderId, kind);
    return json({ document });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Document non généré.";
    const status = message.includes("paiement doit") ? 422 : message === "Commande introuvable." ? 404 : 503;
    return json({ error: message }, status);
  }
});
