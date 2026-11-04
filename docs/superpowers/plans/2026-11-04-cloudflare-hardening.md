# Cloudflare Pages Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prepare the existing WOOD storefront and Supabase backend for a safe Cloudflare Pages deployment without changing its visual identity.

**Architecture:** Keep the current static HTML/CSS/JavaScript frontend on Cloudflare Pages and keep Supabase as the managed Auth/Postgres/Edge Functions backend. Add Cloudflare-native deployment files and tests, then harden the public order path and record external account steps separately.

**Tech Stack:** Static HTML/CSS/JavaScript, Cloudflare Pages, Supabase Auth/Postgres/Edge Functions, Node built-in test runner, Playwright smoke tests.

**Spec:** `docs/superpowers/specs/2026-11-04-cloudflare-hardening.md`

## Global Constraints

- Preserve WOOD visual identity and public behavior.
- Keep delivery-only checkout.
- Never expose private keys in browser files.
- Do not touch Google/Search Console settings.
- Do not activate Viva payments without professional credentials and approval.
- Work on `main` as explicitly requested; verify every change before moving on.

## Review Focus

- Cloudflare root deployment must serve the existing top-level `index.html` without a framework build.
- Security headers must not block Supabase, Turnstile or future Viva redirects.
- Supabase auth redirects must stop using localhost in production while retaining safe local development.
- Guest order submission must reject invalid origin/anti-bot/idempotency inputs without breaking legitimate checkout.
- Migration history must remain reproducible after the two delivery-only changes already applied remotely.

### Task 1: Baseline and plan ledger

**Files:** Modify `.gitignore`; create this plan, the spec and ignored ledger.

- [x] Record the explicit decision to remain on `main` and the external-action boundary.
- [x] Run the existing tests and JavaScript syntax checks.
- [x] Record the clean baseline in `.superpowers/sdd/2026-11-04-cloudflare-hardening/progress.md`.

### Task 2: Cloudflare static deployment configuration

**Files:** Create `_headers`, `_redirects`, `404.html`; review `netlify.toml`.

- [x] Add only safe static security headers and a report-only CSP-compatible baseline.
- [x] Add conservative redirects and a branded 404 without changing existing valid `.html` links.
- [x] Verify local route and asset references with the static audit.

### Task 3: Deployment metadata and documentation

**Files:** Create `package.json`, `.nvmrc`, `README.md` content, `.env.example` if needed.

- [x] Document Cloudflare Pages root, branch, build and preview settings.
- [x] Document that Pages hosts the frontend and Supabase hosts the backend.
- [x] Keep secrets out of the repository and document external setup without real values.

### Task 4: Static asset and dependency safety

**Files:** Review frontend imports and asset references; add a deterministic check.

- [x] Pin external dependencies already used by the site.
- [x] Verify every local asset reference is case-correct and reachable.
- [x] Avoid a framework or bundler migration unless a test proves it is necessary.

### Task 5: Cloudflare branch, preview and rollback runbook

**Files:** Update deployment documentation and add smoke-test scripts.

- [x] Document `main` production, Cloudflare previews/Access and rollback procedure without introducing a working branch.
- [ ] Add a post-deploy route/asset/console/overflow smoke test after the Cloudflare URL exists.
- [x] Record domain `.fr` connection as an external handoff step.

### Task 6: Supabase production URL configuration

**Files:** Update frontend URL handling only where needed; document dashboard settings.

- [x] Use `window.location.origin` for runtime redirects.
- [x] Document production Site URL and exact redirect URLs for the future `.fr` domain.
- [x] Keep local development URLs separate from production.

### Task 7: Supabase CORS hardening

**Files:** Modify the order Edge Function and add tests for allowed origins.

- [x] Replace unrestricted `Access-Control-Allow-Origin: *` with an allow-list strategy.
- [x] Preserve OPTIONS preflight and required Supabase headers.
- [x] Allow the current demo origin only as an explicitly removable development value.

### Task 8: Public-order anti-abuse controls

**Files:** Modify order client/function; add testable validation helpers.

- [x] Add request validation, bounded payload sizes and safe error messages.
- [x] Add idempotency support for repeated submissions.
- [x] Prepare Turnstile token validation with the secret stored only in Supabase.

### Task 9: Inventory and atomic order safety

**Files:** Add migration/function changes; update storefront availability behavior.

- [x] Reject unavailable products server-side.
- [x] Validate quantities and pricing server-side.
- [x] Ensure stock changes cannot race or be bypassed.

### Task 10: Migration history repair

**Files:** Add a reproducible migration/check and document remote migration state.

- [ ] Reconcile the two delivery-only migrations applied remotely outside migration history without a destructive reset.
- [x] Add a reproducible additive migration and verify function grants.
- [x] Run a Supabase schema/advisor verification after the change.

### Task 11: Secret and authorization audit

**Files:** Review frontend config, Edge Functions and policies; document required secrets.

- [x] Confirm only publishable Supabase configuration reaches the browser.
- [x] Keep service-role/Viva/Turnstile secrets server-side.
- [x] Verify RLS is enabled and the owner/order policies remain in place.

### Task 12: Viva-ready payment boundary

**Files:** Prepare server-side payment/webhook interfaces without activating credentials.

- [x] Keep checkout in payment-pending state until Viva is configured.
- [x] Document webhook signature verification, idempotency and status transitions.
- [ ] Document the exact credentials and provider approval still required.

### Task 13: Customer email boundary

**Files:** Document transactional email interface; add configuration placeholders only.

- [ ] Send confirmations only after persisted order/payment state.
- [ ] Keep SMTP/API credentials out of GitHub and the browser.
- [ ] Provide SPF/DKIM/DMARC and deliverability handoff notes.

### Task 14: Admin isolation

**Files:** Review `admin.html`/`admin.js`; document separate admin deployment option.

- [x] Keep owner authorization server-enforced.
- [x] Do not add an admin link to the public navigation.
- [x] Document the safest future split into a private admin project/subdomain.

### Task 15: Accessibility and HTML quality

**Files:** Correct non-visual HTML validity/accessibility issues where safe.

- [x] Add table scopes and correct form semantics without changing layout.
- [ ] Keep labels, focus states and keyboard operation intact.
- [ ] Re-run HTML validation and browser smoke tests.

### Task 16: Automated quality gates

**Files:** Add local test scripts and optional GitHub workflow.

- [x] Add syntax, unit, route, asset and security-reference checks.
- [x] Ensure the checks can run without production secrets.
- [x] Make the workflow fail on broken links and leaked secret patterns; browser overflow remains a post-deploy check.

### Task 17: Final verification and handoff

**Files:** Update README and ledger.

- [ ] Run the full test suite, static checks, browser checks and Supabase verification.
- [ ] Run a final diff audit for visual files and secret exposure.
- [ ] List completed repository work and external steps still requiring account access.
