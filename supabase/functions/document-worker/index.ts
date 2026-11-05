import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { buildDocumentModel } from "./data.mjs";

const PDF_BUCKET = "order-documents";
const DOCUMENT_KINDS = new Set(["order_confirmation", "payment_receipt", "invoice"]);

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

const enqueueDocumentNotification = async (client: ReturnType<typeof createClient>, orderId: string, email: string, kind: string) => {
  if (kind !== "payment_receipt" && kind !== "invoice") return null;
  const { error } = await client.from("order_notification_outbox").upsert({
    order_id: orderId,
    notification_kind: "invoice_ready",
    recipient_email: email,
    template_key: kind,
    template_version: 1,
  }, { onConflict: "order_id,notification_kind" });
  if (error) throw new Error("Document notification could not be queued");
  return true;
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

  const payload = await request.json().catch(() => ({}));
  const kind = String(payload.document_kind || "order_confirmation");
  const orderId = String(payload.order_id || "");
  if (!DOCUMENT_KINDS.has(kind) || !/^[0-9a-f-]{36}$/i.test(orderId)) {
    return json({ error: "Document invalide." }, 400);
  }

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: order, error: orderError } = await client.from("orders")
    .select("id, order_number, customer_name, customer_email, payment_status, total_cents, delivery_address")
    .eq("id", orderId)
    .single();
  if (orderError || !order) return json({ error: "Commande introuvable." }, 404);
  if (kind === "payment_receipt" && order.payment_status !== "paid") return json({ error: "Le paiement doit être confirmé avant le reçu." }, 422);
  const { data: items, error: itemError } = await client.from("order_items")
    .select("product_name, quantity, grams, unit_price_cents, line_total_cents")
    .eq("order_id", orderId)
    .order("id", { ascending: true });
  if (itemError || !items?.length) return json({ error: "Articles introuvables." }, 422);

  const legal = kind === "invoice" ? {
    name: Deno.env.get("LEGAL_ENTITY_NAME"),
    address: Deno.env.get("LEGAL_ENTITY_ADDRESS"),
  } : null;
  let model: ReturnType<typeof buildDocumentModel>;
  try {
    model = buildDocumentModel({ order, items, kind, legal });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Document invalide." }, 422);
  }
  const number = documentNumber(order.order_number, kind);
  const { data: existing } = await client.from("invoice_documents")
    .select("id, storage_path, sha256, status, document_number")
    .eq("order_id", orderId)
    .eq("document_kind", kind)
    .maybeSingle();
  if (existing?.status === "ready") {
    try {
      await enqueueDocumentNotification(client, orderId, order.customer_email, kind);
    } catch {
      return json({ error: "Document prêt, mais sa notification doit être relancée." }, 503);
    }
    return json({ document: existing });
  }

  let content: Uint8Array;
  try {
    content = await makePdf({ ...model, documentNumber: number });
  } catch {
    return json({ error: "Document PDF non généré." }, 503);
  }
  const hash = await sha256(content);
  const path = `orders/${orderId}/${number}.pdf`;
  const { error: uploadError } = await client.storage.from(PDF_BUCKET).upload(path, content, {
    contentType: "application/pdf",
    cacheControl: "3600",
    upsert: true,
  });
  if (uploadError) return json({ error: "Document non enregistré." }, 503);

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
  }, { onConflict: "order_id,document_kind" }).select().single();
  if (documentError) return json({ error: "Document non enregistré." }, 503);

  try {
    await enqueueDocumentNotification(client, orderId, order.customer_email, kind);
  } catch {
    return json({ error: "Document prêt, mais sa notification doit être relancée." }, 503);
  }
  return json({ document });
});
