# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Register

product

## Users

People managing their own household finances: privacy-minded budgeters, self-hosters, and families who want full control of their money data. They use Actual regularly (often daily or weekly check-ins) on desktop and mobile, mid-workflow: reconciling accounts, categorizing transactions, adjusting envelope budgets, reviewing reports. Many migrated from other budgeting apps and value that Actual is local-first, free, and open-source.

## Product Purpose

Actual Budget is a local-first personal finance tool built around envelope budgeting. It exists so people can track and plan their money without handing data to a third party — everything runs on their own device or server, with optional sync. Success looks like users trusting the numbers, completing routine money tasks quickly, and sticking with their budget over months and years.

## Positioning

The difference is mechanical, not promotional: the budget lives in a local database the user owns, and multi-device sync is an optional CRDT layer (`@actual-app/crdt`) they self-host or skip entirely. A hosted competitor cannot truthfully make the same claim while keeping account data on its own servers. Two consequences follow — the app works fully offline with no vendor account, and envelope (zero-based) budgeting is the native data model rather than a reporting view bolted onto transaction import.

Actual is MIT-licensed and community-driven. There is no paid tier, no upsell surface, and no growth funnel to design around; the only "conversion" is a user choosing to keep using it next month.

## Operating Context

- **Recurring, long-horizon use.** The core loop is a weekly-to-daily check-in: import or enter transactions, categorize, reconcile against the bank, move money between envelopes, then review. People run this for years on the same file, so familiarity and muscle memory outrank first-impression appeal.
- **Table-driven work.** The dominant surfaces are dense financial tables and the budget grid (`components/accounts`, `components/budget`, `components/transactions`). Most interaction is scanning, editing in place, and keyboard navigation — not browsing.
- **One codebase, three shells.** `packages/desktop-client` (`@actual-app/web`, Vite + PWA) is the only UI. `packages/desktop-electron` wraps it for Windows/macOS/Linux, and `packages/mobile-client` wraps the same build with Capacitor for iOS/Android. Mobile has its own layouts inside the web app (`components/mobile`, `components/responsive`, `*.mobile.test.ts`) rather than a separate native design language — which is why Platform is `web`.
- **Deployment is the user's problem to choose.** PikaPods, Fly.io, self-hosted Docker, or local-only desktop apps. The UI cannot assume a server exists, that it is reachable, or that anyone else shares the file.
- **Optional bank connections.** `packages/sync-server` offers GoCardless and SimpleFIN integrations plus OpenID auth, all opt-in. Sync and bank import are enhancements layered on a product that must stay whole without them.

## Capabilities and Constraints

**Confirmed capabilities.** Accounts and reconciliation, transactions with rules and schedules, payees, tags, filters, envelope budgeting, reports, a command bar, a privacy filter for screen-sharing, an onboarding tour, admin/user management, and custom themes.

**Design-relevant constraints.**

- **Three built-in themes plus user-authored ones.** `light`, `dark`, and `midnight` (`BASE_THEME_OPTIONS`), with custom themes on top. Nothing may be styled against a single palette; color must go through `theme.*` semantic tokens.
- **Shared primitives are the substrate.** `packages/component-library` (`@actual-app/components`) owns Button, Input, Menu, Popover, Card, Select and the icon set, documented in Storybook. New UI composes these before inventing anything.
- **Financial typography is enforced, not advisory.** Standalone amounts are wrapped in `FinancialText` (or `styles.tnum`); a custom lint rule backs this.
- **Everything user-facing is translated.** i18next with the `Trans` component; `no-untranslated-strings` and `prefer-trans-over-t` are lint errors. Copy must survive translation and the length changes that come with it.
- **Screenshots are a test surface.** Playwright VRT snapshots exist per test file under `packages/desktop-client/e2e/*-snapshots/`, generated only in the Linux Docker image. Visual changes are load-bearing on tests, not free.
- **React Compiler is on.** Manual `useMemo`/`useCallback`/`React.memo` are usually unnecessary in app packages.
- **Toolchain floor.** Node >= 22, Yarn 4 workspaces, all commands run from the repository root.

**Scope of this checkout.** This is a personal fork (`ThomBian/actual-budget`) built and run for the owner, not a queue of upstream pull requests. Visual work may diverge from `actualbudget/actual` and is not gated on maintainer review. The repo's own conventions (`[AI]` prefixes, release notes, lint and type gates) still apply, because they keep the fork mergeable with upstream and the tests green — but they are hygiene, not an approval process.

## Brand Commitments

Calm, trustworthy, practical. The interface should feel like a dependable tool that stays out of the way: quiet confidence, no flash, no urgency theatrics. Money is stressful enough — the UI's job is to make it feel manageable and under control.

The name, the wordmark, and Actual's purple identity carry over from upstream and are treated as fixed unless deliberately changed.

## Anti-references

- Fintech-startup gloss: gradient heroes, glassmorphism, crypto-dashboard neon.
- Corporate banking UI: navy-and-gold, enterprise-portal density, legalese energy.

## Evidence on Hand

- **A real dataset to design against.** "View demo" on the setup screen (after choosing "Don't use a server") generates a budget with realistic accounts, transactions, categories, and budgeted amounts. Use it rather than inventing screenshots or numbers.
- **`demo.png`** at the repository root — the product shot used in the README.
- **`DESIGN.md`** — the documented incumbent visual system (palette, type scale, elevation, component rules, do's and don'ts).
- **VRT baselines** under `packages/desktop-client/e2e/*-snapshots/` — the current appearance of most screens, captured.
- **Storybook** for `@actual-app/components`, with the a11y addon installed.
- **`packages/docs`** — the full Docusaurus documentation site published at actualbudget.org/docs.

**Absences future work must not paper over.** There are no testimonials, customer names, usage statistics, benchmarks, or analytics in this repository, and no pricing of any kind — the hosting figures in the README are third-party providers' listed prices, not Actual's. None of these may be invented for a UI.

## Product Principles

- **The numbers are the interface.** Financial figures are the primary content; typography, alignment, and tabular numerals serve legibility of amounts above all decoration.
- **Trust through restraint.** No visual tricks that could make users doubt what they're seeing. Boring and correct beats clever.
- **Fast routine, gentle depth.** Everyday tasks (categorize, reconcile, budget) must be frictionless; power features reveal themselves progressively without cluttering the default view.
- **Local-first honesty.** The UI reflects the product's values: no dark patterns, no upsells, no attention-grabbing — the user owns the tool, not the other way around.
- **Consistent across surfaces.** Desktop, web, and mobile share one design language via the shared component library; new work reuses existing components and theme tokens.

## Accessibility & Inclusion

Target WCAG 2.1 AA: sufficient contrast in all themes (light, dark, midnight), full keyboard navigation, respect for reduced-motion preferences, and color-blind-safe use of color (never color alone to convey positive/negative amounts).
