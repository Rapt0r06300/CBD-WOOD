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
