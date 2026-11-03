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

- [ ] Record the explicit decision to remain on `main` and the external-action boundary.
- [ ] Run the existing tests and JavaScript syntax checks.
- [ ] Record the clean baseline in `.superpowers/sdd/2026-11-04-cloudflare-hardening/progress.md`.

### Task 2: Cloudflare static deployment configuration

**Files:** Create `_headers`, `_redirects`, `404.html`; review `netlify.toml`.

- [ ] Add only safe static security headers and a report-only CSP-compatible baseline.
- [ ] Add conservative redirects and a branded 404 without changing existing valid `.html` links.
- [ ] Verify all current routes and assets remain reachable.

### Task 3: Deployment metadata and documentation

**Files:** Create `package.json`, `.nvmrc`, `README.md` content, `.env.example` if needed.

- [ ] Document Cloudflare Pages root, branch, build and preview settings.
- [ ] Document that Pages hosts the frontend and Supabase hosts the backend.
- [ ] Keep secrets out of the repository and document external setup without real values.

### Task 4: Static asset and dependency safety

**Files:** Review frontend imports and asset references; add a deterministic check.

- [ ] Pin external dependencies already used by the site.
- [ ] Verify every local asset reference is case-correct and reachable.
- [ ] Avoid a framework or bundler migration unless a test proves it is necessary.

### Task 5: Cloudflare branch, preview and rollback runbook

**Files:** Update deployment documentation and add smoke-test scripts.

- [ ] Document `main` production, `staging` preview, protected previews and rollback procedure.
- [ ] Add a post-deploy route/asset/console/overflow smoke test.
- [ ] Record domain `.fr` connection as an external handoff step.

### Task 6: Supabase production URL configuration

**Files:** Update frontend URL handling only where needed; document dashboard settings.

- [ ] Use `window.location.origin` for runtime redirects.
- [ ] Document production Site URL and exact redirect URLs for the future `.fr` domain.
- [ ] Keep local development URLs separate from production.

### Task 7: Supabase CORS hardening

**Files:** Modify the order Edge Function and add tests for allowed origins.

- [ ] Replace unrestricted `Access-Control-Allow-Origin: *` with an allow-list strategy.
- [ ] Preserve OPTIONS preflight and required Supabase headers.
- [ ] Allow the current demo origin only as an explicitly removable development value.

### Task 8: Public-order anti-abuse controls

**Files:** Modify order client/function; add testable validation helpers.

- [ ] Add request validation, bounded payload sizes and safe error messages.
- [ ] Add idempotency support for repeated submissions.
- [ ] Prepare Turnstile token validation with the secret stored only in Supabase.

### Task 9: Inventory and atomic order safety

**Files:** Add migration/function changes; update storefront availability behavior.

- [ ] Reject unavailable products server-side.
- [ ] Validate quantities and pricing server-side.
- [ ] Ensure stock changes cannot race or be bypassed.

### Task 10: Migration history repair

**Files:** Add a reproducible migration/check and document remote migration state.

- [ ] Reconcile the two delivery-only migrations applied remotely outside migration history.
- [ ] Verify migration ordering and function grants without destructive resets.
- [ ] Run a Supabase schema/advisor verification after the change.

### Task 11: Secret and authorization audit

**Files:** Review frontend config, Edge Functions and policies; document required secrets.

- [ ] Confirm only publishable Supabase configuration reaches the browser.
- [ ] Keep service-role/Viva/Turnstile secrets server-side.
- [ ] Verify RLS policies, owner authorization and order ownership remain intact.

### Task 12: Viva-ready payment boundary

**Files:** Prepare server-side payment/webhook interfaces without activating credentials.

- [ ] Keep checkout in payment-pending state until Viva is configured.
- [ ] Define webhook signature verification, idempotency and status transitions.
- [ ] Document the exact credentials and provider approval still required.

### Task 13: Customer email boundary

**Files:** Document transactional email interface; add configuration placeholders only.

- [ ] Send confirmations only after persisted order/payment state.
- [ ] Keep SMTP/API credentials out of GitHub and the browser.
- [ ] Provide SPF/DKIM/DMARC and deliverability handoff notes.

### Task 14: Admin isolation

**Files:** Review `admin.html`/`admin.js`; document separate admin deployment option.

- [ ] Keep owner authorization server-enforced.
- [ ] Do not add an admin link to the public navigation.
- [ ] Document the safest future split into a private admin project/subdomain.

### Task 15: Accessibility and HTML quality

**Files:** Correct non-visual HTML validity/accessibility issues where safe.

- [ ] Add table scopes and correct form semantics without changing layout.
- [ ] Keep labels, focus states and keyboard operation intact.
- [ ] Re-run HTML validation and browser smoke tests.

### Task 16: Automated quality gates

**Files:** Add local test scripts and optional GitHub workflow.

- [ ] Add syntax, unit, route, asset, security-reference and layout checks.
- [ ] Ensure the checks can run without production secrets.
- [ ] Make the workflow fail on broken links, leaked secret patterns or overflow regressions.

### Task 17: Final verification and handoff

**Files:** Update README and ledger.

- [ ] Run the full test suite, static checks, browser checks and Supabase verification.
- [ ] Run a final diff audit for visual files and secret exposure.
- [ ] List completed repository work and external steps still requiring account access.
