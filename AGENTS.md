# AGENTS.md — repo instructions for coding agents

This repository is a SvelteKit (Svelte 5) landing site built with Vite + TypeScript (strict) and Tailwind CSS.

If you are an agent making changes here: keep patches small, match existing style in the file you touch, and prefer `npm run check` before handing off.

## Repo layout

- `src/routes/` — SvelteKit routes (`+layout.svelte`, `+page.svelte`, etc.)
- `src/lib/components/` — page/feature components
- `src/lib/components/ui/` — reusable UI components with barrel `index.ts` exports
- `src/lib/stores/` — Svelte stores (persisted state, i18n, etc.)
- `src/lib/data/` — typed data objects used by the UI
- `static/` — static assets served as-is
- Generated/ignored: `node_modules/`, `.svelte-kit/`, `build/` (do not edit/commit)

## Tooling (Node / package manager)

- Package manager: **npm** (repo contains `package-lock.json`)
- Node: use **Node 18+** (SvelteKit 2 baseline). No `.nvmrc`/`.node-version` is present.
- `.npmrc` sets `engine-strict=true` (respect `engines` if added later).

## Build / dev / check commands

Run commands from the repo root.

### Install

- `npm ci` (preferred in CI / clean installs)
- `npm install` (local development)

### Development

- `npm run dev`
- `npm run dev -- --open` (opens a browser)

### Typecheck / “lint” (current repo)

There is no ESLint/Prettier configured. The closest thing to linting is SvelteKit sync + `svelte-check`:

- `npm run check`
- `npm run check:watch`

Notes:
- `npm run check` runs `svelte-kit sync` first to generate types.
- `tsconfig.json` enables `strict` and also `checkJs: true`, so JS files are type-checked too.

### Build / preview

- `npm run build`
- `npm run preview`

## Tests

No unit/e2e test runner is currently configured (no `vitest`, `jest`, `playwright`, etc.).

If you add tests in the future, prefer these conventions:

### Suggested: Vitest (unit tests)

- Run all tests: `npx vitest run`
- Run a single file: `npx vitest run src/path/to/file.test.ts`
- Run a single test by name: `npx vitest run -t "test name"`
- Watch mode: `npx vitest`

### Suggested: Playwright (e2e)

- Run all: `npx playwright test`
- Run one file: `npx playwright test tests/foo.spec.ts`
- Run one test by name: `npx playwright test -g "test name"`

(Only document/add these tools if the repository actually adopts them.)

## Cursor / Copilot rules

- No Cursor rules found (`.cursor/rules/` and `.cursorrules` are absent).
- No GitHub Copilot instructions found (`.github/copilot-instructions.md` is absent).

If these files get added later, they override/augment this document.

---

# Code style and conventions

## General principles

- Prefer minimal, targeted changes; avoid drive-by refactors.
- Preserve existing style in the file you touch (indentation is not perfectly consistent across the repo).
- Don’t edit generated directories (`.svelte-kit/`) or vendored code (`node_modules/`).

## Formatting

- Indentation: many files use tabs; some data files use 2 spaces. **Match the file’s existing indentation.**
- Quotes: prefer single quotes in TS/JS.
- Semicolons: existing TS/JS generally uses semicolons; match the surrounding file.
- Long Tailwind class strings are common; keep them readable (wrap attributes across lines as needed).

## Imports

- Prefer path aliases (`$lib/...`) over deep relative imports.
- Use type-only imports when appropriate, e.g. `import { foo, type Bar } from '...';`.
- Keep import groups visually separated when it improves readability.
- Avoid importing from `.svelte-kit` directly; use SvelteKit public APIs and `$lib`.

## Svelte / SvelteKit conventions

- Use `<script lang="ts">` for components with logic.
- Prefer SvelteKit conventions for routes: `src/routes/+layout.svelte`, `src/routes/+page.svelte`.
- Svelte 5 is used (see `src/routes/+layout.svelte` using `$props()` and `{@render ...}`).
  - When editing an existing component, keep the component’s current style (classic `export let` vs runes).
  - Avoid rewriting a file solely to “modernize” it.
- Browser-only APIs (`window`, `document`, `localStorage`, `matchMedia`) must be guarded for SSR:
  - Use `if (typeof window !== 'undefined') { ... }`.
- Use `onMount` for client-only initialization.

## State management (stores)

- Stores live in `src/lib/stores/` and follow a “factory + exported instance” pattern:
  - Example: `createDarkMode()` returning `{ subscribe, toggle, set, init }`.
- Keep store methods small and predictable; avoid side effects outside guarded browser blocks.

## Types and data

- TypeScript is `strict: true`.
- Prefer explicit union types for small finite sets (e.g. `type Language = 'en' | 'es'`).
- Avoid `any` unless there’s no reasonable alternative; if used, keep it localized and documented by context.
- Shared typed datasets live in `src/lib/data/`.

## Components

- Component file naming: `PascalCase.svelte` for components.
- UI components under `src/lib/components/ui/` typically expose:
  - a Svelte component file (e.g. `button.svelte`)
  - variants/types in `.ts` (e.g. `variants.ts`)
  - a barrel export `index.ts` (e.g. `export { default as Button } from './button.svelte';`)
- When adding UI components, follow the folder + `index.ts` export pattern.

## Tailwind CSS

- Tailwind is integrated via `@tailwindcss/vite` and imported in `src/app.css`.
- Prefer using the existing `cn()` helper (`src/lib/utils.ts`) to merge class names.
- For complex variant logic, prefer `tailwind-variants` (see `src/lib/components/ui/button/variants.ts`).

## Accessibility and UX

- Keep accessible names/labels (`aria-label`, `role`, `aria-selected`, etc.) in interactive components.
- Maintain keyboard interaction patterns (see `src/lib/components/SectionTabs.svelte`).

## Error handling

- In UI-only code, prefer defensive checks over try/catch (e.g., null checks, type guards).
- If adding async flows later (fetching, form actions, loads):
  - Surface failures with clear UI states.
  - Prefer SvelteKit’s `error(...)` / `redirect(...)` helpers in route `load` functions.

## What to run before handing off

- `npm run check` (typecheck + SvelteKit sync)
- `npm run build` (ensures production build works)

If you add tests later, include the minimal test command(s) relevant to your change in your PR/hand-off notes.
