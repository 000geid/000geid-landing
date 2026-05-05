---
name: project-screenshots
description: >-
  Captures production UI screenshots for portfolio project pages in this repo via Playwright scripts,
  wires them into `src/lib/data/projects.ts`, and documents the repeatable workflow for new projects.
  Use when the user asks for project images, screenshot automation, capturing a live demo, regenerating
  gallery assets, or adding `static/images/<project>/` shots for `/projects/[id]`.
---

# Portfolio project screenshots (000geid-landing)

## Goal

Ship four consistent PNGs per project (`openfeed-N.png`) for the carousel on `/projects/[id]` without manual cropping drift: **mobile-ish viewport**, **Spanish locale by default**, **same output paths** every run.

## Conventions

| Piece | Location / rule |
|--------|----------------|
| Capture script | `scripts/capture-<projectId>.mjs` (ESM, top-level `await` OK) |
| Output directory | `static/images/<projectId>/` (create with `fs.mkdirSync(..., { recursive: true })`) |
| Filenames | `<projectId>-1.png` … `<projectId>-4.png` (match existing `filo`, `plandeck`, `openfeed`) |
| Data | `ProjectEntry.screenshots` in `src/lib/data/projects.ts` — `src: '/images/...'`, bilingual `alt.en` / `alt.es` |
| npm script | `package.json` → `"capture:<projectId>": "node scripts/capture-<projectId>.mjs"` |

## Playwright checklist

1. Depends on **`playwright`** (already in this repo).
2. One-time binaries: **`npx playwright install chromium`** (once per machine/CI image).
3. Default context: **`viewport`** `390×844`, **`deviceScaleFactor: 2`**, **`locale`** `es-*`, mobile Safari **userAgent** (match `capture-filo.mjs`).
4. Use **`animations: 'disabled'`** on `page.screenshot` to reduce flaky gradients.
5. Prefer **`waitUntil: 'domcontentloaded'`** + **`page.waitForTimeout(...)`** for async UI; tighten selectors per app when stable.
6. Document **env overrides** in the script header (e.g. `OPENFEED_CAPTURE_BASE_URL`, `FILO_CAPTURE_MENU_PATH`, `PLAN_DECK_CAPTURE_*`).

## Adding a new project

1. Duplicate the smallest similar script (`scripts/capture-openfeed.mjs` for feed-like UIs, `capture-plandeck.mjs` for marketing+auth, `capture-filo.mjs` for multi-route flows).
2. Set `LIVE_URL`, `outDir`, and a **`capturePublicFlow`** (or named steps) that writes exactly four PNGs.
3. Add **`capture:<id>`** to `package.json` `scripts`.
4. Add **`screenshots[]`** to the `ProjectEntry` with accurate `alt` copy (EN marketing tone, ES natural).
5. Run **`npm run capture:<id>`**, spot-check PNGs, then **`npm run check`**.

## After capture

- Commit PNGs under `static/images/<id>/`.
- If UI copy or layout shifts, re-run the same npm script; avoid hand-renaming files so `projects.ts` stays stable.

## Reference scripts

- `scripts/capture-filo.mjs` — multi-page public flow + optional menu path env.
- `scripts/capture-plandeck.mjs` — marketing default; optional credentials for authenticated board.
- `scripts/capture-openfeed.mjs` — single-origin feed + optional first article link.
