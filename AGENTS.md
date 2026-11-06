# CBD WOOD — agent instructions

## Mission
Improve the independent **CBD WOOD demonstration website** at https://rapt0r06300.github.io/CBD-WOOD/demo/ while preserving the true WOOD brand and existing site features. Do not claim an official TealerLab partnership or reuse its proprietary assets, copy, or brand styling.

## Cloudflare / D1 — STRICT FREE ONLY
- For experimental WOOD backend work, prefer Cloudflare Workers Free + D1 Free, with documented quotas and fail-closed behavior on exhaustion.
- Never upgrade, enable a paid subscription, add billable products, buy domains, or accept unexpected charges. Ask the user before any operation with potential cost.
- Keep the existing Supabase environment untouched until a tested, explicitly approved migration is available.
- Use a dedicated test D1 database and read-only catalog endpoints first; do not migrate accounts, real customer details, actual orders, or payment information to D1 during demo preparation.
- The public demo must not record real orders, send real emails, trigger paid payment services, or invent reviews/prices/stock.
- No service_role secrets, tokens, credentials, Cloudflare API tokens, private keys, or personal information in Git.
- Cloudflare OAuth login needs the account owner's approval; never claim authentication or deployment occurred without verifying it.

## Engineering workflow
- Audit existing implementation and any published tests before making changes; do not repeat completed work.
- Run `npm run check` for changes affecting the site and preserve deterministic local test fixtures.
- Keep the existing GitHub Pages demo functional; use feature flags and verify rollback for all backend integrations.
- Respect the existing deferred-task register: `docs/superpowers/plans/2026-11-06-wood-attente-identifiants-validations.md`.
- Progress reports must distinguish implemented, verified, blocked, and awaiting owner validation.

## Canonical Codex roadmaps
- **Visual / brand:** `docs/superpowers/plans/2026-11-06-wood-signature-edition-120-taches.md` (TXW-001…TXW-120).
- **Cloudflare Free autonomous execution:** `docs/superpowers/plans/2026-11-06-wood-cloudflare-d1-free-autonome.md` (D1-001…D1-025).
- **Existing visual implementation roadmap:** `docs/superpowers/plans/2026-11-05-wood-tealerlab-visual-rebuild-roadmap.md` includes the integrations.
- Read these files before work. Work autonomously on every feasible code/test task; only Cloudflare account-holder OAuth consent, ownership approvals, and potentially cost-changing operations can require the user. Never claim these have been completed automatically.
- Generate any missing D1 kit source and tests **inside this GitHub repository**, not from the user's downloaded ZIP, so no manual file copying is required. Do not assume that conversation sandbox files are mounted in Codex.
