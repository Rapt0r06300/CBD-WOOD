import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import {
  isAllowedOrigin,
  normalizeIdempotencyKey,
  validateOrderPayload,
} from "./validation.mjs";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://woodcbd.fr",
  "https://www.woodcbd.fr",
  "https://rapt0r06300.github.io",
  "http://localhost:3000",
];
const MAX_BODY_BYTES = 64 * 1024;

const allowedOrigins = () => {
  const configured = Deno.env.get("ALLOWED_ORIGINS")
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return configured?.length ? configured : DEFAULT_ALLOWED_ORIGINS;
};

const corsHeadersFor = (request: Request) => {
  const origin = request.headers.get("Origin") || "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-idempotency-key, x-turnstile-token",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
  if (origin && isAllowedOrigin(origin, allowedOrigins())) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
};

const response = (request: Request, body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeadersFor(request),
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

const isRecord = (value: unknown): value is Record<string, unknown> => (
  value !== null && typeof value === "object" && !Array.isArray(value)
);

const verifyTurnstile = async (secret: string, token: string, remoteIp: string | null) => {
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);
  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!verification.ok) return false;
  const result = await verification.json().catch(() => ({}));
  return result.success === true;
};

Deno.serve(async (request) => {
  const origin = request.headers.get("Origin") || "";
  if (origin && !isAllowedOrigin(origin, allowedOrigins())) {
    return response(request, { error: "Origine non autorisée." }, 403);
  }
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeadersFor(request) });
  if (request.method !== "POST") return response(request, { error: "Méthode non autorisée." }, 405);

  const requestId = crypto.randomUUID();
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response(request, { error: "La commande est trop volumineuse." }, 413);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const publicKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  if (!supabaseUrl || !serviceRoleKey || !publicKey) {
    console.error(`[${requestId}] Missing server configuration.`);
    return response(request, { error: "Le service est momentanément indisponible." }, 503);
  }

  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return response(request, { error: "Le contenu de la commande est invalide." }, 400);
  }
  if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
    return response(request, { error: "La commande est trop volumineuse." }, 413);
  }

  let rawPayload: unknown;
  try {
    rawPayload = JSON.parse(bodyText);
  } catch {
    return response(request, { error: "Le contenu de la commande est invalide." }, 400);
  }

  const headerIdempotencyKey = normalizeIdempotencyKey(request.headers.get("X-Idempotency-Key"));
  const bodyIdempotencyKey = isRecord(rawPayload)
    ? normalizeIdempotencyKey(rawPayload.idempotency_key)
    : null;
  if (headerIdempotencyKey && bodyIdempotencyKey && headerIdempotencyKey !== bodyIdempotencyKey) {
    return response(request, { error: "La référence de commande est incohérente." }, 400);
  }
  const idempotencyKey = headerIdempotencyKey || bodyIdempotencyKey;
  const candidatePayload = isRecord(rawPayload)
    ? { ...rawPayload, idempotency_key: idempotencyKey }
    : rawPayload;
  const validation = validateOrderPayload(candidatePayload);
  if (!validation.ok) return response(request, { error: validation.error }, 400);

  const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
  const requiresTurnstile = Deno.env.get("REQUIRE_TURNSTILE") === "true";
  if (requiresTurnstile && !turnstileSecret) {
    console.error(`[${requestId}] Turnstile is required but not configured.`);
    return response(request, { error: "Le service est momentanément indisponible." }, 503);
  }
  if (turnstileSecret) {
    const token = request.headers.get("X-Turnstile-Token")
      || (isRecord(rawPayload) && typeof rawPayload.turnstile_token === "string" ? rawPayload.turnstile_token : "");
    if (!token || !(await verifyTurnstile(turnstileSecret, token, request.headers.get("CF-Connecting-IP")))) {
      return response(request, { error: "La vérification anti-robot a échoué." }, 400);
    }
  }

  let customerId: string | null = null;
  const authorization = request.headers.get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const authClient = createClient(supabaseUrl, publicKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await authClient.auth.getUser();
    if (error || !data.user) return response(request, { error: "La session client n’est plus valide." }, 401);
    customerId = data.user.id;
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await adminClient.rpc("create_pending_order", {
    payload: { ...validation.payload, customer_id: customerId },
  });
  if (error) {
    console.error(`[${requestId}] create_pending_order failed`, error);
    return response(request, { error: "Impossible d’enregistrer la commande pour le moment." }, 400);
  }
  return response(request, { order: data });
});
