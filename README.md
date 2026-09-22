# Flowroom

A working onboarding editor built with React 19, TypeScript, Tailwind CSS, Radix UI, and Vinext. Start with Bloom, a three-screen budgeting-app onboarding flow, then refine, review and test it.

## Portfolio

[Project summary](PORTFOLIO.md) · [Portfolio PDF](output/pdf/Woody_Zhao_Portfolio.pdf) · [Detailed case study](CASE_STUDY.md)

## Run locally

Requires Node.js 22.13 or later. Run these commands from the project directory:

```sh
npm run install:ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_safe_tyrannus.sql
npm run dev
```

Apply each local database migration only once. The development URL is printed in the terminal. `npx tsc --noEmit` checks TypeScript; `npm run build` creates the Cloudflare Worker and browser assets.

The local database binding is configured in `vite.config.ts`. The app runs and builds without a `.openai` folder or a Sites project ID. The database ID in the Vite configuration is a local placeholder; a Cloudflare deployment needs its own database binding.

## What works

- Select, add, remove and reorder welcome, profile and preferences screens. Reorder by dragging sidebar items or by using screen arrows.
- Edit copy, accent/background colors, corner radius, content padding and progress indicators. Undo and redo local edits.
- Preview the journey on mobile or desktop; profile inputs and preference selection are validated. Preview form values remain in the browser and are not submitted to a service.
- Generate a structured starting point, review it, and explicitly apply it. Undo restores the previous screens.
- Save screen definitions and contextual comments to D1. Resolve/reopen comments. Data survives reloads.
- See active room members and the screen they are reviewing. Shared edits synchronize every two seconds and room presence every four seconds. Optimistic version checks prevent silent overwrites. A conflict keeps the local draft and lets the user retry explicitly.
- Export definitions as JSON. Keyboard shortcuts, focus indicators, accessible Radix dialogs, reduced-motion support and responsive navigation are included.
- WebMCP tools `read_flow` and `start_flow_preview` expose the same flow state and preview UI.

## AI generation

Without credentials, generation uses **clearly labeled template mode**. It supports curated budgeting, fitness, travel and learning starting points, with Bloom's reusable components. Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` server-side to use the Responses API with a strict JSON schema. Copy `.env.example` to `.env` for local configuration; use hosted environment secrets for deployment. The default model is `gpt-4o-mini`. No keys are exposed to client code. The API response is validated with Zod before it can replace a flow.

The structured-output implementation follows the [official OpenAI guide](https://developers.openai.com/api/docs/guides/structured-outputs). Live provider generation has not been tested because no API key was supplied. Template mode is functional without one.

## Collaboration scope

This version uses D1 and short polling, not Liveblocks. It provides shared edits, comments and screen-level presence; the cursor marker indicates which screen another session is viewing, not continuous pointer tracking. It is a single shared room, with access controlled by the hosting platform. The local preview has development-only access. User-entered display names are labels, not verified identities. Keep hosting private unless all admitted viewers should be able to edit the shared flow.

Liveblocks CRDT editing, pointer streaming, verified teammate identities, granular project permissions and conflict merging are future extensions. Do not describe the existing optimistic-save behavior as a CRDT or zero-latency collaboration.

## Project map

- `app/page.tsx`: editor, component catalog, review panel and preview journey.
- `app/globals.css`: theme, screen templates, responsive behavior and interaction states.
- `lib/flow.ts`: shared structured definition schema and template generator.
- `app/api/`: persistence, comments, presence and structured generation routes.
- `db/schema.ts` / `drizzle/`: durable schema and versioned migrations.
- `CASE_STUDY.md`: portfolio narrative, design choices and a usability study plan.

## Known limits

One room and one project; 20 screens maximum. Screen templates use a fixed component structure; unrestricted canvas layout and arbitrary generated code are intentionally outside this MVP. Template mode customizes only predefined variants. Some component copy (for example preference goals) remains part of the Bloom template rather than being independently editable. Live model output can change screen-level copy and appearance but cannot insert executable code. Presence is approximate and expires after inactivity. No usability-study results are claimed.
