import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";

const PDF_BUCKET = "order-documents";
const LINK_TTL_SECONDS = 300;

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const bearerToken = (request: Request) => {
  const header = request.headers.get("Authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
};

Deno.serve(async (request) => {
  if (request.method !== "GET") return json({ error: "Méthode non autorisée." }, 405);

  const documentId = new URL(request.url).searchParams.get("document_id") || "";
  if (!/^[0-9a-f-]{36}$/i.test(documentId)) return json({ error: "Document invalide." }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const accessToken = bearerToken(request);
  if (!supabaseUrl || !serviceRoleKey || !accessToken) return json({ error: "Non autorisé." }, 401);

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return json({ error: "Session invalide." }, 401);

  const { data: document, error: documentError } = await client
    .from("invoice_documents")
    .select("id, order_id, storage_path, document_number, status")
    .eq("id", documentId)
    .eq("status", "ready")
    .maybeSingle();
  if (documentError || !document) return json({ error: "Document introuvable." }, 404);

  const { data: owner } = await client
    .from("owner_users")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (!owner) {
    const { data: order } = await client
      .from("orders")
      .select("id")
      .eq("id", document.order_id)
      .eq("customer_id", userData.user.id)
      .maybeSingle();
    if (!order) return json({ error: "Non autorisé." }, 403);
  }

  const { data: signed, error: signedError } = await client.storage
    .from(PDF_BUCKET)
    .createSignedUrl(document.storage_path, LINK_TTL_SECONDS);
  if (signedError || !signed?.signedUrl) return json({ error: "Téléchargement indisponible." }, 503);
  return json({
    document_id: document.id,
    document_number: document.document_number,
    url: signed.signedUrl,
    expires_in: LINK_TTL_SECONDS,
  });
});
