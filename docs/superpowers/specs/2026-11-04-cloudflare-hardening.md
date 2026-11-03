# WOOD Cloudflare Pages Hardening Specification

## Goal

Prepare the existing WOOD static storefront and Supabase backend for a safe Cloudflare Pages deployment without changing the visual identity or customer-facing catalog experience.

## Non-negotiable constraints

- Keep the current WOOD colors, typography, layout, product cards, animations and mobile/desktop behavior.
- Keep Supabase as the backend; do not rewrite the project in Python or introduce a framework without necessity.
- Never place service-role, Viva Wallet or other private secrets in public files.
- Do not change Google/Search Console settings as part of this work.
- Do not enable real Viva payments until the owner's professional credentials and provider approval exist.
- Do not publish unknown or legally unverified molecular/boosted cannabinoid products.
- Preserve delivery-only checkout; do not reintroduce store pickup.
- Work on `main` because the user explicitly chose that branch; make each change reviewable and test it before continuing.

## Completion boundary

Repository changes, tests, migration files and deployment documentation can be completed here. Purchasing a `.fr` domain, creating the Cloudflare project, changing Cloudflare account settings, obtaining Cloudflare/Viva approval, and activating Viva credentials require the owner's external accounts and are documented as handoff steps rather than falsely marked complete.
