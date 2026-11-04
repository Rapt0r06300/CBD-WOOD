# Hostinger Preparation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Prepare the existing WOOD static site locally for a future Hostinger upload without deploying or changing the storefront.

**Architecture:** Keep the existing HTML/CSS/JavaScript frontend and Supabase backend. Add Apache-only deployment defaults at the repository root and a deterministic release-folder generator that copies only public storefront files.

**Tech Stack:** Static HTML/CSS/JavaScript, Apache `.htaccess`, Node.js 20+ scripts, existing Node test suite.

**Spec:** `docs/superpowers/specs/2026-11-04-hostinger-preparation-design.md`

## Global Constraints

- Do not publish, upload, or modify external accounts.
- Do not change storefront appearance or customer/payment behavior.
- Never copy Supabase migrations, tests, documentation, `.git`, or server secrets into the Hostinger release folder.
- Keep CSP in report-only mode until all production dependencies are confirmed.

## Review Focus

- HTTPS redirect must not run in the local test environment; it only lives in `.htaccess` for Apache deployment.
- The release folder must contain `index.html`, `404.html`, `.htaccess`, scripts, styles, and assets.
- The release folder must exclude `supabase/`, `test/`, `docs/`, `.git`, `package.json`, and `netlify.toml`.
- Existing tests and static audit must remain green.
- The future Supabase/Viva settings must remain external and uncommitted.

### Task 1: Hostinger Apache defaults

**Files:**
- Create: `.htaccess`
- Modify: `scripts/static-audit.mjs`

- [x] Add directory listing protection, `index.html` as directory index, `/404.html` as the 404 document, HTTPS redirection, and report-only security headers.
- [x] Make the static audit require and inspect those rules.
- [x] Run `npm run audit` after the file exists.

### Task 2: Deterministic Hostinger release folder

**Files:**
- Create: `scripts/prepare-hostinger.mjs`
- Modify: `package.json`
- Modify: `.gitignore`

- [x] Add `npm run prepare:hostinger`.
- [x] Add `npm run hostinger:preflight` to run the full local gate in one command.
- [x] Copy root HTML/CSS/JS, `.htaccess`, and `assets/` into `dist-hostinger/`.
- [x] Exclude repository and backend development files by construction.
- [x] Ignore generated output.
- [x] Refuse unexpected files and validate the final package before replacement.
- [x] Run the script and inspect the resulting file list.

### Task 3: Deployment handoff documentation

**Files:**
- Create: `docs/ops/hostinger-deploy.md`
- Modify: `README.md`
- Modify: `docs/ops/production-checklist.md`

- [x] Document the local preparation command and the exact `public_html` upload rule.
- [x] Document the DNS/SSL, Supabase URL, CORS, e-mail, Turnstile and Viva steps that cannot be completed locally.
- [x] State explicitly that no deployment is performed by this task.

### Task 4: Full verification

**Files:**
- No source changes.

- [x] Run `npm run check`.
- [x] Run `npm run prepare:hostinger`.
- [x] Inspect `dist-hostinger` for required and forbidden paths.
- [x] Confirm `git status` contains only the intended files.
